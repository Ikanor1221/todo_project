const taskModify = document.querySelector("#buttonModify1");
const taskMenu = document.querySelector("#taskMenu1");

const menuModify = document.querySelector("#buttonProjectMenu1");
const projectMenu = document.querySelector("#projectMenu1");

const bodyElement = document.querySelector("body");

bodyElement.addEventListener("click", (e) => {
    console.log(e.target)
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

