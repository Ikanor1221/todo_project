const taskModify = document.querySelector("#buttonModify1");
const taskMenu = document.querySelector("#taskMenu1");

const menuModify = document.querySelector("#buttonProjectMenu1");
const projectMenu = document.querySelector("#projectMenu1");

const bodyElement = document.querySelector("body");

bodyElement.addEventListener("click", (e) => {

    if (!e.target.closest("#buttonModify1") || !taskMenu.classList.contains("hidden")) {
        taskMenu.classList.add("hidden");
    } else {
         taskMenu.classList.remove("hidden");
    }

    if (!e.target.closest("#buttonProjectMenu1") || !projectMenu.classList.contains("hidden")) {
        projectMenu.classList.add("hidden");
    }  else {
        projectMenu.classList.remove("hidden");
    }
})

const menuControl = document.querySelector("#menu_control");
const mainMenu = document.querySelector("#menu_main_bar");
const mainScreen = document.querySelector("#sorting");

menuControl.addEventListener("click", (e) => {
    mainMenu.classList.toggle("removed");
    mainScreen.classList.toggle("grid_auto");
})

function CreateTask(title, description, date, importance, project) {

    return {
        title: title,
        description: description,
        date: new Date (date),
        importance: importance,
        project: project
    }
}

function CreateTaskCollection() {
    const collectionOfTasks = [];
    const collectionOfProjects = [];
    let today = new Date();


    const addTask = (title, description, date, importance, project) => {
        let task = CreateTask(title, description, date, importance, project);
        collectionOfTasks.push(task);
        collectionOfTasks.sort((a, b) => a.date - b.date);
        return;
    }

    const addProject = (projectName) => {
        if (!collectionOfProjects.includes(projectName)) {
            collectionOfProjects.push(projectName);
        }
        // else console.log("No!")
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
        nextWeekDate.setDate(today.getDate() + 7);
        const collectionOfTasksNextWeek = [];
        for (let task in collectionOfTasks)
            {
                if  (collectionOfTasks[task].date.getTime() <= nextWeekDate.getTime()) {
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

    const returnTasksProject = (projectName) => {
        const collectionOfTasksProject= [];
        for (let task in collectionOfTasks)
            {
                if  (collectionOfTasks[task].project == projectName) {
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
        returnTasksProject
    }
}

function createScreenRenderer () {
    const tasksScreen = document.querySelector("#tasks");

    function generateTaskElement(task, number) {
        const checked = (task.importance ? "checked" : "")
        let taskElement = `                
        <div id="task${number}" class="task">
        <label class="checkbox" for="checkboxMain1">
            <input class="main_checkbox" id="checkboxMain1" type="checkbox">
            <span class="control"></span>
        </label>
        <div class="description">
            <h4>${task.title}</h4>
            <p>${task.description}</p>
        </div>
        <p class="date">${task.date}</p>
        <label class="favorite" for="checkboxFav1">
            <input class="fav_checkbox" id="checkboxFav1" type="checkbox" ${checked}>
            <span class="material-icons-outlined"></span>
        </label>
        <div class="menuHolder">
            <button class="modify_button" id="buttonModify1">
                <!-- <input class="modify_button" id="buttonModify1" type="button"> -->
                <span class="material-icons-outlined">more_vert</span>
            </button>
            <menu class="emergingMenu hidden" id="taskMenu1">
                <li><button>Edit</button></li>
                <li><button>Delete</button></li>
            </menu>
        </div>
        </div>`
        return taskElement
    }

    return {
        generateTaskElement
    }
}


let taskCollection = CreateTaskCollection();

taskCollection.addProject("Daily Tasks");
taskCollection.addProject("Global Tasks");
taskCollection.addProject("Global Tasks");


taskCollection.addTask("Wash dishes", "Wash all the dishes at your home", "2023-03-21", false, taskCollection.returnProjectsAll()[0]);
taskCollection.addTask("Fix Bike", "The tire must be changed", "2023-03-25", true, taskCollection.returnProjectsAll()[0]);
taskCollection.addTask("Finish the Odin project", "The last project is left", "2023-09-19", true, taskCollection.returnProjectsAll()[1]);
taskCollection.addTask("Get a job", "Get a job as a Web Developer", "2023-03-23", true, taskCollection.returnProjectsAll()[1]);
taskCollection.addTask("Build a house", "Find a suitable location and for the good price", "2030-03-20", false, taskCollection.returnProjectsAll()[1]);


// console.log(taskCollection.returnTasksProject("Daily Tasks"))

let screenRenderer = createScreenRenderer();
0
// console.log(taskCollection.returnTasksProject("Daily Tasks")[0])

console.log(screenRenderer.generateTaskElement(taskCollection.returnTasksProject("Daily Tasks")[0], 1));
