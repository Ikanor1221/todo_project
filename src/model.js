const GBdate = new Intl.DateTimeFormat("en-GB", {});


function Model() {
    const collectionOfTasks = [];
    const collectionOfProjects = [];
    let selectedProjectId
    let today = new Date();
    let selectedTab = "all_tasks_tab";

    let taskId = 0;
    let projectId = 0;

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

    const editTaskById = (taskId, title, description, date) => {
        let task = returnTaskById(taskId);
        task.title = title;
        task.description = description;
        task.date = date;
        collectionOfTasks.sort((a, b) => a.date - b.date);
        return;
    }

    const setCollectionOfTasks = (newCollectionOfTasks) => {
        for (let i in newCollectionOfTasks) {
            newCollectionOfTasks[i].date = new Date(newCollectionOfTasks[i].date.replace("T22:00:00.000Z", ""))
            collectionOfTasks.push(newCollectionOfTasks[i]);
        }
        collectionOfTasks.sort((a, b) => a.date - b.date);
        return
    }

    const setCollectionOfProjects = (newCollectionOfProjects) => {
        for (let i in newCollectionOfProjects) {
            collectionOfProjects.push(newCollectionOfProjects[i]);
        }
        return
    }

    return {
        addTask,
        addProject,
        returnTasksAll,
        returnProjectsAll,
        returnTaskById,
        returnProjectById,
        removeTaskByID,
        removeProjectByID,
        returnTasksCurrentTab,
        returnProjectLast,
        editTaskById,
        setCollectionOfTasks,
        setCollectionOfProjects,

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
        },

        get taskId() {
            return taskId;
        },

        set taskId(value) {
            taskId = new Number(value);
        },

        get projectId() {
            return projectId;
        },

        set projectId(value) {
            projectId = new Number(value);
        },



    }
}

export {Model};