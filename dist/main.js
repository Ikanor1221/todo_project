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
    let today = new Date();


    const addTask = (title, description, date, importance, project) => {
        let task = CreateTask(title, description, date, importance, project);
        collectionOfTasks.push(task);
        collectionOfTasks.sort((a, b) => a.date - b.date);
        return;
    }

    const returnTasksAll = () => {
        return collectionOfTasks;
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

    return {
        addTask,
        returnTasksAll,
        returnTasksToday,
        returnTasksNextWeek,
        returnTasksImportant
    }
}


let taskCollection = CreateTaskCollection();
taskCollection.addTask("1", "123", "2122-01-21", false, "project1");
taskCollection.addTask("2", "231", "2029-03-25", true, "project2");
taskCollection.addTask("2", "231", "2132-09-19", true, "project1");
taskCollection.addTask("2", "231", "2023-03-23", false, "project1");
taskCollection.addTask("2", "231", "2023-03-20", true, "project1");

const GBdate = new Intl.DateTimeFormat("en-GB", {});
// task.updateImportance(false);
// console.log((taskCollection.returnTasksAll()[0].date))
// console.log(GBdate.format(taskCollection.returnTasksAll()[0].date))

console.log(taskCollection.returnTasksImportant())

// .initialBookCollection.slice().sort((a, b) => a.published - b.published);
//       for (let number in sortedCollection) {
//         display.insertAdjacentHTML(
//           "beforeend",
//           sortedCollection[number].generateHTML(number)
//         );
//       }