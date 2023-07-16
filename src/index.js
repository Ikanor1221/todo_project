
import {Model} from "./model.js"
import {View} from "./view.js"
import {Controller} from "./controller.js"

let toDoModel = Model();
let toDoView = View();
let toDoController = Controller(toDoModel, toDoView);

if (!localStorage.getItem("projects")) {
    toDoController.populateStorage();
  } else {
    toDoController.receiveFromStorage();
  }
