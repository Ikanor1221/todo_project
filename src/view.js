const GBdate = new Intl.DateTimeFormat("en-GB", {});

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

    function updateMainHeader (text) {
        const header = document.querySelector("#main_header");
        header.innerHTML = text;
        return
    }

    return {
        generateTaskElement,
        generateProjectElement,
        generateTaskForm,
        generateProjectForm,
        generateAddTaskButtonElement,
        highlight,
        updateMainHeader
    }
}

export {View};