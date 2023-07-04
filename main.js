const GBdate = new Intl.DateTimeFormat("en-GB", {});

const menuControl = document.querySelector("#menu_control");    //Find existing interface and make it dynamic
const mainMenu = document.querySelector("#menu_main_bar");
const mainScreen = document.querySelector("#sorting");

menuControl.addEventListener("click", (e) => {
    mainMenu.classList.toggle("removed");
    mainScreen.classList.toggle("grid_auto");
})



function Model() {
    const collectionOfTasks = [];
    const collectionOfProjects = [];
    let selectedProjectId
    let today = new Date();
    let taskId = 0;
    let projectId = 0;
    let selectedTab = "all_tasks_tab";

    function CreateTask(title, description, date, importance, projectId, id) {

        return {
            title: title,
            description: description,
            date: new Date (date),
            importance: importance,
            projectId: projectId,
            id: id,
            completion: false
        }
    }
    
    function CreateProject(title, id) {
        return {
            title: title,
            id: id,
        }
    }

    const returnTaskById = (taskId) => {
        let task = collectionOfTasks.find(object => {
            return object.id == taskId;
        })
        return task;
    }

    const returnProjectById = (projectId) => {
        let project = collectionOfProjects.find(object => {
            return object.id == projectId;
        })
        return project;
    }

    const returnProjectLast = () => {
        let project = collectionOfProjects[collectionOfProjects.length-1];
        return project;
    }

    const addTask = (title, description, date, importance, projectId) => {
        let task = CreateTask(title, description, date, importance, projectId, taskId);
        taskId++;
        collectionOfTasks.push(task);
        collectionOfTasks.sort((a, b) => a.date - b.date);
        return;
    }

    const addProject = (projectName) => {
        let similiarProject = collectionOfProjects.find(object => {
            return object.title == projectName;
        })
        if (!similiarProject) {
            let newProject = CreateProject(projectName, projectId);
            projectId++;
            collectionOfProjects.push(newProject);
        }
        return;
    }

    const returnTasksAll = () => {
        return collectionOfTasks;
    }

    const returnProjectsAll = () => {
        return collectionOfProjects;
    }

    const returnTasksToday = () => {
        const collectionOfTasksToday = [];
        for (let task in collectionOfTasks)
            {
                if  (collectionOfTasks[task].date.getDate() == today.getDate() & collectionOfTasks[task].date.getMonth() == today.getMonth() & collectionOfTasks[task].date.getFullYear() == today.getFullYear()) {
                    collectionOfTasksToday.push(collectionOfTasks[task]);
                }
            }
        return collectionOfTasksToday;
    }

    const returnTasksNextWeek = () => {
        let nextWeekDate = new Date();
        let today = new Date();
        nextWeekDate.setDate(today.getDate() + 7);
        const collectionOfTasksNextWeek = [];
        for (let task in collectionOfTasks)
            {
                if  (collectionOfTasks[task].date.getTime() <= nextWeekDate.getTime() & collectionOfTasks[task].date.getTime() >= today.getTime()) {
                    collectionOfTasksNextWeek.push(collectionOfTasks[task]);
                }
            }
        return collectionOfTasksNextWeek;
    }

    const returnTasksImportant = () => {
        const collectionOfTasksImportant = [];
        for (let task in collectionOfTasks)
            {
                if  (collectionOfTasks[task].importance == true) {
                    collectionOfTasksImportant.push(collectionOfTasks[task]);
                }
            }
        return collectionOfTasksImportant;
    }

    const returnTasksProject = (projectId) => {
        const collectionOfTasksProject= [];
        for (let task in collectionOfTasks)
            {
                if  (collectionOfTasks[task].projectId == projectId) {
                    collectionOfTasksProject.push(collectionOfTasks[task]);
                }
            }
        return collectionOfTasksProject;
    }

    const returnTasksCurrentTab = () => {

        if (selectedTab=="all_tasks_tab") return returnTasksAll();
        if (selectedTab=="today_tab") return returnTasksToday();
        if (selectedTab=="next_week_tab") return returnTasksNextWeek();
        if (selectedTab=="important_tab") return returnTasksImportant();
        else return returnTasksProject(selectedProjectId);

        return
    }

    const removeTaskByID = (taskId) => {
        let task = collectionOfTasks.find(object => {
            return object.id == taskId;
        })
        collectionOfTasks.splice(collectionOfTasks.indexOf(task),1);
        return;
    }

    const removeProjectByID = (projectId) => {

        for (let task=0; task < collectionOfTasks.length; task++) {

            if (collectionOfTasks[task].projectId == projectId) {      
                removeTaskByID(collectionOfTasks[task].id);
                task--;
            }
        }

        let project = collectionOfProjects.find(object => {
            return object.id == projectId;
        })

        collectionOfProjects.splice(collectionOfProjects.indexOf(project),1);

        return;
    }

    return {
        addTask,
        addProject,
        returnProjectsAll,
        returnTaskById,
        returnProjectById,
        removeTaskByID,
        removeProjectByID,
        returnTasksCurrentTab,
        returnProjectLast,

        get selectedTab() {
            return selectedTab
        },

        set selectedTab(value) {
             selectedTab = value;
        },

        get selectedProjectId() {
            return selectedProjectId;
        },

        set selectedProjectId(value) {
            selectedProjectId = value;
        }

    }
}


function View() {
    
    function generateTaskElement(task, number) {
        const checked = (task.importance ? "checked" : "")
        let taskElement = `                
        <div id="task${number}" class="task">
        <label class="checkbox" for="checkboxMain${number}">
            <input class="main_checkbox" id="checkboxMain${number}" type="checkbox">
            <span class="control"></span>
        </label>
        <div class="description">
            <h4>${task.title}</h4>
            <p>${task.description}</p>
        </div>
        <p class="date">${GBdate.format(task.date)}</p>
        <label class="favorite" for="checkboxFav${number}">
            <input class="fav_checkbox" id="checkboxFav${number}" type="checkbox" ${checked}>
            <span class="material-icons-outlined"></span>
        </label>
        <div class="menuHolder">
            <button class="modify_button" id="buttonModify${number}">
                <span class="material-icons-outlined">more_vert</span>
            </button>
            <menu class="emergingMenu hidden" id="taskMenu${number}">
                <li><button id="buttonEdit${number}">Edit</button></li>
                <li><button id="buttonDelete${number}">Delete</button></li>
            </menu>
        </div>
        </div>
        `
        return taskElement
    }

    function generateProjectElement(project, number) {
        let projectElement = `                
        <li>
        <a id="project${number}" class="groupingTab" href="#"><span class="material-symbols-outlined">launch</span>${project.title}</a>
        <button id="buttonProjectMenu${number}" class="menu_modify_button"><span class="material-symbols-outlined">more_horiz</span></button>
        <menu class="emergingMenu moved hidden" id="projectMenu${number}">
            <li><button id="renameProject${number}">Rename</button></li>
            <li><button id="deleteProject${number}">Delete</button></li>
        </menu>
    </li>
    `
        return projectElement
    }

    function generateTaskForm(task) {
        let taskForm
        if (task) {
            taskForm = `                
            <form class="formObject" id="newTaskForm" autocomplete="off">
                <label class="no_margin" for="titleTask">Title: </label>
                <input class="basicField" id="titleTask" type="text" value="${task.title}" required>
                <label for="descriptionTask">Description (optional): </label>
                <textarea class="wideField" id="descriptionTask">${task.description}</textarea>
                <label for="dateForm">Date: </label>
                <input class="basicField" id="dateForm" type="date" value="${task.date.toISOString().substr(0, 10)}" required>
                <div class="formButtons">
                    <button class="buttonFormAdd" id="addTask">Add</button>
                   <button class="buttonFormCancel" id="cancelTask">Cancel</button>
                </div>
            </form>
        `
        }
        else {
            taskForm = `                
            <form class="formObject" id="newTaskForm" autocomplete="off">
                <label class="no_margin" for="titleTask">Title: </label>
                <input class="basicField" id="titleTask" type="text" value="" required>
                <label for="descriptionTask">Description (optional): </label>
                <textarea class="wideField" id="descriptionTask"></textarea>
                <label for="dateForm">Date: </label>
                <input class="basicField" id="dateForm" type="date" value="" required>
                <div class="formButtons">
                    <button class="buttonFormAdd" id="addTask">Add</button>
                   <button class="buttonFormCancel" id="cancelTask">Cancel</button>
                </div>
            </form>
        `
        }

        return taskForm
    }

    function generateProjectForm(project) {

        let projectName;
        if (project) projectName = project.title;
        else projectName = "";

        let projectForm = `                
        <form class="formObject no_padding" id="newProjectForm" autocomplete="off">
        <label for="titleFormProject">New project's name: </label>
        <input id="titleFormProject" class="basicField" type="text" value="${projectName}" required>
        <div class="formButtons">
            <button class="buttonFormAdd" id="addProject">Add</button>
            <button class="buttonFormCancel" id="cancelProject">Cancel</button>
        </div>
    </form>
     `

        return projectForm
    }

    function generateAddTaskButtonElement() {
        return '<button class="addition_button" id="add_task"><span class="material-symbols-outlined">add_circle</span> Add Task</button>'
    }

    function removeHighlightting () {
        const allTabs = document.querySelectorAll(".groupingTab");
        allTabs.forEach(tab => {
            tab.parentElement.classList.remove("selected");
        })
        return
    }

    function highlight (tab) {
        removeHighlightting();
        tab.parentElement.classList.add("selected");
        return
    }

    return {
        generateTaskElement,
        generateProjectElement,
        generateTaskForm,
        generateProjectForm,
        generateAddTaskButtonElement,
        highlight
    }
}

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
            else {
                model.addProject(formTitle.value);
                closeProjectForm();
            }

            model.selectedTab = "#project"+ model.returnProjectLast().id
            model.selectedProjectId = model.returnProjectLast().id;
            renderTasks(model.returnTasksCurrentTab());
            renderProjects(model.returnProjectsAll()); 
            let projectTab = document.querySelector("#project"+ model.returnProjectLast().id); //REMOVE THIS ANNOING MANUAL HIGHLIGHTING
            view.highlight(projectTab);

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
        
        const allTasksTab = document.querySelector("#all_tasks_tab");
        const todayTasksTab = document.querySelector("#today_tab");
        const nextWeekTasksTab = document.querySelector("#next_week_tab");
        const importantTasksTab = document.querySelector("#important_tab");

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

        // if (model.selectedTab != "all_tasks_tab" || model.selectedTab != "today_tab" || model.selectedTab != "next_week_tab" || model.selectedTab != "important_tab") {
            
        // }
        // let projectTab = document.querySelector("#project"+ model.returnProjectLast().id); //REMOVE THIS ANNOING MANUAL HIGHLIGHTING
        // projectTab.parentElement.classList.add("selected");

        //REPLACE ABOVE WITH UNIVERSAL HIGHLIGHTER OF CURRENTLY SELECTED
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

        return
    }               

    function initializeProject (number) {;
        const projectMenu = document.querySelector("#projectMenu"+number);
        const projectTab = document.querySelector("#project"+number);
        const bodyElement = document.querySelector("body");
        

        const deleteButton = document.querySelector("#deleteProject"+number);

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
        })

        deleteButton.addEventListener('click', event => {
        
            if (number==model.selectedProjectId) {
                model.selectedTab = "all_tasks_tab";
                model.selectedProjectId = null;
                model.removeProjectByID(number);
                renderTasks(model.returnTasksCurrentTab());
                renderProjects(model.returnProjectsAll());
                view.highlight(document.querySelector("#all_tasks_tab"));
                // document.querySelector("#all_tasks_tab").parentElement.classList.add("selected");
            }
            else {
                model.removeProjectByID(number);
                renderTasks(model.returnTasksCurrentTab());
                renderProjects(model.returnProjectsAll());
                view.highlight(document.querySelector("#"+model.selectedTab));
            }
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
            let projectTab = document.querySelector("#project"+projectId);
            view.highlight(projectTab);
            model.selectedTab = projectTab.id;
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
            })
          })
        return
    }


    return {
        renderTasks,
        renderProjects,
        initializeTabs,
        renderTaskForm,
        renderProjectForm,
        initializeAddProjectButton
    }
}



let toDoModel = Model();
let toDoView = View();

toDoModel.addProject("Daily Tasks");
toDoModel.addProject("Global Tasks");


toDoModel.addTask("Wash dishes", "Wash all the dishes at your home", "2023-03-26", false, 0);
toDoModel.addTask("Fix Bike", "The tire must be changed", "2023-03-29", true, 0);
toDoModel.addTask("Finish the Odin project", "The last project is left", "2023-09-19", true, 0);
toDoModel.addTask("Get a job", "Get a job as a Web Developer", "2023-03-28", true, 1);
toDoModel.addTask("Build a house", "Find a suitable location and for the good price", "2030-04-20", false, 1);

let toDoController = Controller(toDoModel, toDoView);

toDoController.renderTasks(toDoModel.returnTasksCurrentTab())

toDoModel.addProject("2")
toDoModel.addProject("123")
toDoModel.addProject("2")

toDoController.renderProjects(toDoModel.returnProjectsAll())
toDoController.initializeTabs();
toDoController.initializeAddProjectButton();

// Write model nethod to start up the entire program

