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