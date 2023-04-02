const GBdate = new Intl.DateTimeFormat("en-GB", {});

const menuControl = document.querySelector("#menu_control");
const mainMenu = document.querySelector("#menu_main_bar");
const mainScreen = document.querySelector("#sorting");

menuControl.addEventListener("click", (e) => {
    mainMenu.classList.toggle("removed");
    mainScreen.classList.toggle("grid_auto");
})

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

function CreateTaskCollection() {
    const collectionOfTasks = [];
    const collectionOfProjects = [];
    let selectedProjectId
    let today = new Date();
    let taskId = 0;
    let projectId = 0;

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

    return {
        addTask,
        addProject,
        returnTasksAll,
        returnProjectsAll,
        returnTasksToday,
        returnTasksNextWeek,
        returnTasksImportant,
        returnTasksProject,
        returnTaskById,
        returnProjectById,
        selectedProjectId
    }
}

function createScreenRenderer (taskCollection) {
    const tasksScreen = document.querySelector("#tasks");
    const projectScreen = document.querySelector("#projectList");
    let selectedTab = document.querySelector("#all_tasks_tab");

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
                <li><button>Edit</button></li>
                <li><button>Delete</button></li>
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
            <li><button>Rename</button></li>
            <li><button>Delete</button></li>
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

    function renderTasks (tasks) {
        tasksScreen.innerHTML = "";
        for (let n in tasks) {
            tasksScreen.innerHTML+=generateTaskElement(tasks[n], tasks[n].id);
        }
        for (let n in tasks) {
            initializeTask(tasks[n].id);
        }
        
        const allTasksTab = document.querySelector("#all_tasks_tab");
        const todayTasksTab = document.querySelector("#today_tab");
        const nextWeekTasksTab = document.querySelector("#next_week_tab");
        const importantTasksTab = document.querySelector("#important_tab");

        const addTaskButton = document.querySelector("#add_task");

        if (selectedTab == allTasksTab || selectedTab == todayTasksTab || selectedTab == nextWeekTasksTab || selectedTab == importantTasksTab) {
            addTaskButton.classList.add("hidden");
        }
        else  {
            addTaskButton.classList.remove("hidden");
        }

    }

    function renderProjects (projects) {
        for (let n in projects) {
            projectScreen.innerHTML+=generateProjectElement(projects[n], projects[n].id);
        }
        for (let n in projects) {
            initializeProject(projects[n].id);
        }
    }

    function renderTaskForm (task) {
        let newNode = document.createRange().createContextualFragment(generateTaskForm(task));
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
            if (e.currentTarget.checked) taskCollection.returnTaskById(number).importance = true;
            else taskCollection.returnTaskById(number).importance = false;
        })

        const completionCheckbox = document.querySelector("#checkboxMain"+number);
        if (taskCollection.returnTaskById(number).completion == true) {
            completionCheckbox.checked=true;
            completionCheckbox.parentElement.parentElement.classList.add("taskCompleted");
        }

        completionCheckbox.addEventListener("change", (e) => {
            if (e.currentTarget.checked) {
                completionCheckbox.parentElement.parentElement.classList.add("taskCompleted");
                taskCollection.returnTaskById(number).completion = true;
            }
            else {
                completionCheckbox.parentElement.parentElement.classList.remove("taskCompleted");
                taskCollection.returnTaskById(number).completion = false;
            }
        })
        return
    }               

    function initializeProject (number) {;
        const projectMenu = document.querySelector("#projectMenu"+number);
        const projectTab = document.querySelector("#project"+number);
        const bodyElement = document.querySelector("body");

        bodyElement.addEventListener("click", (e) => {
            if (!e.target.closest("#buttonProjectMenu"+number) || !projectMenu.classList.contains("hidden")) {
                projectMenu.classList.add("hidden");
            }  else {
                projectMenu.classList.remove("hidden");
            }
        })

        projectTab.addEventListener('click', event => {
            removeHighlightting();
            projectTab.parentElement.classList.add("selected");
            // console.log(selectedTab)
            selectedTab = projectTab;

            renderTasks(taskCollection.returnTasksProject(projectTab.id.slice(7)));
            taskCollection.selectedProjectId = Number((projectTab.id.slice(7)));
        })
        return
    }
    
    function initializeTaskForm (task) {
        let projectId = taskCollection.selectedProjectId

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
            }
            else {
                taskCollection.addTask(formTitle.value, formDescription.value, formDate.value, false, projectId);
            }
            let projectTab = document.querySelector("#project"+projectId);
            removeHighlightting();
            projectTab.parentElement.classList.add("selected");
            selectedTab = projectTab;
            renderTasks(taskCollection.returnTasksProject(projectId));
        })

        cancelButton.addEventListener("click", (e) => {
            closeTaskForm();
        })

        return
    }        

    function closeTaskForm () {
        let taskForm = document.querySelector("#newTaskForm");
        taskForm.parentNode.removeChild(taskForm);
        return
    }

    function initializeTabs () {
        const allTasksTab = document.querySelector("#all_tasks_tab");
        const todayTasksTab = document.querySelector("#today_tab");
        const nextWeekTasksTab = document.querySelector("#next_week_tab");
        const importantTasksTab = document.querySelector("#important_tab");
        const tabsCollection = [allTasksTab, todayTasksTab, nextWeekTasksTab, importantTasksTab];

        tabsCollection.forEach(tab => {
            tab.addEventListener('click', event => {
                removeHighlightting();
                tab.parentElement.classList.add("selected");
                // console.log(selectedTab)
                selectedTab = tab;
                if (selectedTab == allTasksTab) renderTasks(taskCollection.returnTasksAll());
                if (selectedTab == todayTasksTab) renderTasks(taskCollection.returnTasksToday());
                if (selectedTab == nextWeekTasksTab) renderTasks(taskCollection.returnTasksNextWeek());
                if (selectedTab == importantTasksTab) renderTasks(taskCollection.returnTasksImportant());
            })
          })
        return
    }

    function removeHighlightting () {
        const allTabs = document.querySelectorAll(".groupingTab");
        allTabs.forEach(tab => {
            tab.parentElement.classList.remove("selected");
        })
        return
    }

    return {
        renderTasks,
        renderProjects,
        initializeTabs,
        renderTaskForm
    }
}



let taskCollection = CreateTaskCollection();

taskCollection.addProject("Daily Tasks");
taskCollection.addProject("Global Tasks");


taskCollection.addTask("Wash dishes", "Wash all the dishes at your home", "2023-03-26", false, 0);
taskCollection.addTask("Fix Bike", "The tire must be changed", "2023-03-29", true, 0);
taskCollection.addTask("Finish the Odin project", "The last project is left", "2023-09-19", true, 0);
taskCollection.addTask("Get a job", "Get a job as a Web Developer", "2023-03-28", true, 1);
taskCollection.addTask("Build a house", "Find a suitable location and for the good price", "2030-04-20", false, 1);

let screenRenderer = createScreenRenderer(taskCollection);

screenRenderer.renderTasks(taskCollection.returnTasksAll())

taskCollection.addProject("2")
taskCollection.addProject("123")
taskCollection.addProject("2")

screenRenderer.renderProjects(taskCollection.returnProjectsAll())
screenRenderer.initializeTabs();

// screenRenderer.renderTaskForm(taskCollection.returnTaskById(0));
// screenRenderer.renderTaskForm();