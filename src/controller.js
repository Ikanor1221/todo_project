const GBdate = new Intl.DateTimeFormat("en-GB", {});

function Controller(model, view) {
    const tasksScreen = document.querySelector("#tasks"); //Find predefined elements of inverface

    function renderTasks (tasks) {
        tasksScreen.innerHTML = "";
        for (let n in tasks) {
            tasksScreen.innerHTML+=view.generateTaskElement(tasks[n], tasks[n].id);
            // initializeTask(tasks[n].id);
        }
        for (let n in tasks) {
            initializeTask(tasks[n].id);
        }

        renderTaskAddButton();
    }

    function renderProjectForm (project) {
        
        if(document.querySelector("#newProjectForm")) return;

        let newNode = document.createRange().createContextualFragment(view.generateProjectForm(project));
        let projectList = document.querySelector("#projectList");

        projectList.after(newNode);

        initializeProjectForm(project);
    }

    function initializeProjectForm (project) {

        const projectForm = document.querySelector("#newProjectForm");
        const formTitle = document.querySelector("#titleFormProject");
        const addButton = document.querySelector("#addProject");
        const cancelButton = document.querySelector("#cancelProject");
        
        projectForm.addEventListener("submit", (e) => {
            e.preventDefault();
        })

        addButton.addEventListener("click", (e) => {
            if (!(Boolean(formTitle.value))) {
                return
            }
            else if (project) {
                project.title = formTitle.value;
                closeProjectForm();
                renderProjects(model.returnProjectsAll());
                view.highlight(document.querySelector("#"+model.selectedTab));

                if (model.selectedTab.replace("project","") == project.id) view.updateMainHeader(project.title);
            }
            else {
                model.addProject(formTitle.value);
                closeProjectForm();
                model.selectedTab = "#project"+ model.returnProjectLast().id
                model.selectedProjectId = model.returnProjectLast().id;
                renderTasks(model.returnTasksCurrentTab());
                renderProjects(model.returnProjectsAll()); 
                let projectTab = document.querySelector("#project"+ model.returnProjectLast().id);
                view.highlight(projectTab);
                view.updateMainHeader(model.returnProjectLast().title);
            }

        })

        cancelButton.addEventListener("click", (e) => {
            closeProjectForm();
        })

        return
    }   

    function closeProjectForm() {
        let projectForm = document.querySelector("#newProjectForm");
        projectForm.parentNode.removeChild(projectForm);
        return
    }

    function initializeAddProjectButton () {
        const addProject = document.querySelector("#add_project");
        let projectForm = document.querySelector("#newProjectForm");

        
        addProject.addEventListener("click", (e) => {
            if ((projectForm)) return;
            else renderProjectForm();
        });

        return
    }

    function renderTaskAddButton () {
        
        // const allTasksTab = document.querySelector("#all_tasks_tab");
        // const todayTasksTab = document.querySelector("#today_tab");
        // const nextWeekTasksTab = document.querySelector("#next_week_tab");
        // const importantTasksTab = document.querySelector("#important_tab");

        let addTaskButton = document.querySelector("#add_task");
        let taskForm = document.querySelector("#newTaskForm");


        if (model.selectedTab == "all_tasks_tab" || model.selectedTab == "today_tab" || model.selectedTab == "next_week_tab" || model.selectedTab == "important_tab") {
            if (addTaskButton) {
                addTaskButton.parentElement.removeChild(addTaskButton);
            }
        }
        else if (taskForm) {

        }
        else if(!addTaskButton) {
            let newNode = document.createRange().createContextualFragment(view.generateAddTaskButtonElement());
            tasksScreen.after(newNode);

            let addTaskButton = document.querySelector("#add_task");
            addTaskButton.addEventListener("click", (e) => {
            renderTaskForm();
            addTaskButton.parentNode.removeChild(addTaskButton);

        })
        }


    }

    function renderProjects (projects) {
        const projectScreen = document.querySelector("#projectList");
        projectScreen.innerHTML = "";
        
        for (let n in projects) {
            projectScreen.innerHTML+=view.generateProjectElement(projects[n], projects[n].id);
        }
        for (let n in projects) {
            initializeProject(projects[n].id);
        }

    }

    function renderTaskForm (task) {

        let newNode = document.createRange().createContextualFragment(view.generateTaskForm(task));
        tasksScreen.after(newNode);
        initializeTaskForm(task);
    }

    function initializeTask (number) {
        const taskMenu = document.querySelector("#taskMenu"+number);
        const bodyElement = document.querySelector("body");

        bodyElement.addEventListener("click", (e) => {
            if (!e.target.closest("#buttonModify"+number) || !taskMenu.classList.contains("hidden")) {
                taskMenu.classList.add("hidden");
            } else {
                taskMenu.classList.remove("hidden");
            }
        })

        const importanceCheckbox = document.querySelector("#checkboxFav"+number);
        importanceCheckbox.addEventListener("change", (e) => {
            if (e.currentTarget.checked) model.returnTaskById(number).importance = true;
            else model.returnTaskById(number).importance = false;
        })

        const completionCheckbox = document.querySelector("#checkboxMain"+number);
        if (model.returnTaskById(number).completion == true) {
            completionCheckbox.checked=true;
            completionCheckbox.parentElement.parentElement.classList.add("taskCompleted");
        }

        completionCheckbox.addEventListener("change", (e) => {
            if (e.currentTarget.checked) {
                completionCheckbox.parentElement.parentElement.classList.add("taskCompleted");
                model.returnTaskById(number).completion = true;
            }
            else {
                completionCheckbox.parentElement.parentElement.classList.remove("taskCompleted");
                model.returnTaskById(number).completion = false;
            }
        })

        const deleteButton = document.querySelector("#buttonDelete"+number);
        deleteButton.addEventListener("click", (e) => {
            model.removeTaskByID(number);
            renderTasks(model.returnTasksCurrentTab());
        })

        const editButton = document.querySelector("#buttonEdit"+number);
        editButton.addEventListener("click", (e) => {
            renderTaskForm(model.returnTaskById(number));
        })

        return
    }               

    function initializeProject (number) {;
        const projectMenu = document.querySelector("#projectMenu"+number);
        const projectTab = document.querySelector("#project"+number);
        const bodyElement = document.querySelector("body");
        

        const deleteButton = document.querySelector("#deleteProject"+number);
        const renameProject = document.querySelector("#renameProject"+number);

        bodyElement.addEventListener("click", (e) => {
            if (!e.target.closest("#buttonProjectMenu"+number) || !projectMenu.classList.contains("hidden")) {
                projectMenu.classList.add("hidden");
            }  else {
                projectMenu.classList.remove("hidden");
            }
        })

        projectTab.addEventListener('click', event => {
            view.highlight(projectTab);
            model.selectedTab = projectTab.id;
            model.selectedProjectId = number;
            renderTasks(model.returnTasksCurrentTab());
            view.updateMainHeader(model.returnProjectById(number).title);
        })

        deleteButton.addEventListener('click', event => {

            if(document.querySelector("#newProjectForm")) closeProjectForm();
        
            if (number==model.selectedProjectId) {
                model.selectedTab = "all_tasks_tab";
                model.selectedProjectId = null;
                model.removeProjectByID(number);
                renderTasks(model.returnTasksCurrentTab());
                renderProjects(model.returnProjectsAll());
                view.highlight(document.querySelector("#all_tasks_tab"));
            }
            else {
                model.removeProjectByID(number);
                renderTasks(model.returnTasksCurrentTab());
                renderProjects(model.returnProjectsAll());
                view.highlight(document.querySelector("#"+model.selectedTab));
            }
        })

        renameProject.addEventListener('click', event => {
            renderProjectForm(model.returnProjectById(number));
        })

        return
    }
    
    function initializeTaskForm (task) {
        let projectId = model.selectedProjectId

        const taskForm = document.querySelector("#newTaskForm");

        const formTitle = document.querySelector("#titleTask");
        const formDescription = document.querySelector("#descriptionTask");
        const formDate = document.querySelector("#dateForm");

        const addButton = document.querySelector("#addTask");
        const cancelButton = document.querySelector("#cancelTask");

        taskForm.addEventListener("submit", (e) => {
            e.preventDefault();
        })

        addButton.addEventListener("click", (e) => {
            if (!(Boolean(formTitle.value) & Boolean(formDate.value))) {
                return
            }

            if (task) {
                task.title = formTitle.value;
                task.description = formDescription.value;
                task.date =  new Date(formDate.value);
                closeTaskForm();
            }
            else {
                model.addTask(formTitle.value, formDescription.value, formDate.value, false, projectId);
                closeTaskForm();
            }
            renderTasks(model.returnTasksCurrentTab());
        })

        cancelButton.addEventListener("click", (e) => {
            closeTaskForm();
            renderTaskAddButton();
        })

        return
    }        

    function closeTaskForm () {
        let taskForm = document.querySelector("#newTaskForm");
        taskForm.parentNode.removeChild(taskForm);
        return
    }

    function initializeTabs () {    //Maybe all those ID mebtions below are useless
        const allTasksTab = document.querySelector("#all_tasks_tab");
        const todayTasksTab = document.querySelector("#today_tab");
        const nextWeekTasksTab = document.querySelector("#next_week_tab");
        const importantTasksTab = document.querySelector("#important_tab");
        const tabsCollection = [allTasksTab, todayTasksTab, nextWeekTasksTab, importantTasksTab];

        tabsCollection.forEach(tab => {
            tab.addEventListener('click', event => {
                view.highlight(tab);
                model.selectedTab = tab.id;

                renderTasks(model.returnTasksCurrentTab());
                model.selectedProjectId = null;
                if (tab.id=="all_tasks_tab") view.updateMainHeader("All Tasks");
                else if (tab.id=="today_tab") view.updateMainHeader("Today");
                else if (tab.id=="next_week_tab") view.updateMainHeader("Next Week");
                else if (tab.id=="important_tab") view.updateMainHeader("Important");
            })
          })
        return
    }

    function populateStorage () {   
        model.addProject("Daily Tasks");
        model.addProject("Global Tasks");

        model.addTask("Wash dishes", "Wash all the dishes at your home", "2023-03-26", false, 0);
        model.addTask("Fix Bike", "The tire must be changed", "2023-03-29", true, 0);
        model.addTask("Finish the Odin project", "The last project is left", "2023-09-19", true, 0);
        model.addTask("Get a job", "Get a job as a Web Developer", "2023-03-28", true, 1);
        model.addTask("Build a house", "Find a suitable location and for the good price", "2030-04-20", false, 1);


        renderTasks(model.returnTasksCurrentTab())

        model.addProject("2")
        model.addProject("123")
        model.addProject("2")

        renderProjects(model.returnProjectsAll())
        initializeTabs();
        initializeAddProjectButton();

        localStorage.setItem("tasks", JSON.stringify(model.returnTasksAll()));
        localStorage.setItem("projects", JSON.stringify(model.returnProjectsAll()));

        initializeWindows();
        initializeMenu();
        return
    }

    function receiveFromStorage() {

        model.setCollectionOfTasks(JSON.parse(localStorage.getItem("tasks")));
        model.setCollectionOfProjects(JSON.parse(localStorage.getItem("projects")));
        model.taskId = localStorage.getItem("taskId");
        model.projectId = localStorage.getItem("projectId");
    
        renderTasks(model.returnTasksCurrentTab())
    
        renderProjects(model.returnProjectsAll())
        initializeTabs();
        initializeAddProjectButton();
    
        initializeWindows();
        initializeMenu();
        return
    }

    function initializeWindows() {

        window.addEventListener('beforeunload', function (e) {
            localStorage.setItem("tasks", JSON.stringify(model.returnTasksAll()));
            localStorage.setItem("projects", JSON.stringify(model.returnProjectsAll()));
        
            localStorage.setItem("taskId", JSON.stringify(model.taskId));
            localStorage.setItem("projectId", JSON.stringify(model.projectId));
        });
        
        window.addEventListener('beforeupdate', function (e) {
            localStorage.setItem("tasks", JSON.stringify(model.returnTasksAll()));
            localStorage.setItem("projects", JSON.stringify(model.returnProjectsAll()));
        
            localStorage.setItem("taskId", JSON.stringify(model.taskId));
            localStorage.setItem("projectId", JSON.stringify(model.projectId));
        });
    }

    function initializeMenu () {
        const menuControl = document.querySelector("#menu_control");    //Find existing interface and make it dynamic
        const mainMenu = document.querySelector("#menu_main_bar");
        const mainScreen = document.querySelector("#sorting");

        menuControl.addEventListener("click", (e) => {
        mainMenu.classList.toggle("removed");
        mainScreen.classList.toggle("grid_auto");
})
    }


    return {
        renderTasks,
        renderProjects,
        initializeTabs,
        renderTaskForm,
        renderProjectForm,
        initializeAddProjectButton,
        populateStorage,
        receiveFromStorage
    }
}

export {Controller};