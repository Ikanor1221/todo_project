const taskModify = document.querySelector("#buttonModify1");
const taskMenu = document.querySelector("#taskMenu1");

taskModify.addEventListener("click", (e) => {
    taskMenu.classList.toggle("hidden");
})

const menuModify = document.querySelector("#buttonProjectMenu1");
const projectMenu = document.querySelector("#projectMenu1");

menuModify.addEventListener("click", (e) => {
    projectMenu.classList.toggle("hidden");
})

const menuControl = document.querySelector("#menu_control");
const mainMenu = document.querySelector("#menu_main_bar");
const mainScreen = document.querySelector("#sorting");

menuControl.addEventListener("click", (e) => {
    mainMenu.classList.toggle("removed");
    mainScreen.classList.toggle("grid_auto");
})

