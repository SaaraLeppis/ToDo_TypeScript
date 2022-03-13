"use strict";
// get handle to input element
var inputText = document.querySelector("#task-input");
// get handle to input add button 
var addTask = document.querySelector("#adding-btn");
// get handle to alert message 
var infoAlert = document.querySelector(".alert");
// get handle to 'remove tasks' button
var removeItems = document.querySelector("#clear-list");
// get handle to list area
var listItem = document.querySelector("#ul-of-todos");
// * = = alert message  ==
function alertMessage(message) {
    infoAlert.innerHTML = "".concat(message);
    setTimeout(function () {
        infoAlert.style.display = "none";
    }, 2000);
    infoAlert.style.display = "inline-block";
}
// * = = input text trim ==
function formInput(textInput) {
    var trimmedInput = textInput.toString().toLowerCase().trim();
    var trimmedOutput = trimmedInput[0].toUpperCase() + trimmedInput.slice(1);
    console.log("trimmed", trimmedOutput);
    return trimmedOutput;
}
// * = = Add button ==
addTask.addEventListener("click", function (e) {
    e.preventDefault();
    // if empty do nothing
    if (inputText.value === "") {
        alertMessage("Dont be lazy, add something to do!");
        // if content then create tasks
    }
    else {
        var textToPrint = formInput(inputText.value);
        createList(textToPrint);
    }
});
// * = = tasks creation and putting on display ==
function createList(whatToDo) {
    var lineContent = "\n  <li class=\"tobedone-task\">\n  <i class= \"far fa-square\" task=\"markDone\" title=\"Mark task done\" tabindex=\"0\"></i>\n  <span id=\"text\">".concat(whatToDo, "</span>\n  <i class=\"far fa-trash-alt\" task = \"trashIt\" title=\"Remove task\" tabindex=\"0\"></i>\n  </li>");
    listItem.insertAdjacentHTML("beforeend", lineContent);
    inputText.value = "";
    alertMessage("New task added!");
}
// * = = event for task done and task delete when symbols clicked  ==
listItem.addEventListener("click", function (event) {
    event.preventDefault();
    var element = event.target;
    if (element.attributes.task.value === "markDone") {
        element.classList.replace("fa-square", "fa-check-square");
        element.parentNode.classList.replace("tobedone-task", "overline");
        alertMessage("Task is done!");
    }
    else if (element.attributes.task.value === "trashIt") {
        element.parentNode.parentNode.removeChild(element.parentNode);
        alertMessage("Task is deleted!");
    }
});
// * = = clearing all items ==
removeItems.addEventListener("click", function (event) {
    event.preventDefault();
    var ulOfList = document.getElementById("ul-of-todos");
    while (ulOfList.firstChild) {
        ulOfList.removeChild(ulOfList.firstChild);
    }
    alertMessage("All ToDos deleted!");
});
