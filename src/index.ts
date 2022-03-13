// get handle to input element
const inputText=document.querySelector("#task-input") as HTMLInputElement; 
// get handle to input add button 
const addTask = document.querySelector("#adding-btn") as HTMLButtonElement;
// get handle to alert message 
const infoAlert = document.querySelector(".alert") as HTMLParagraphElement;
// get handle to 'remove tasks' button
const removeItems = document.querySelector("#clear-list") as HTMLButtonElement;
// get handle to list area
const listItem = document.querySelector("#ul-of-todos") as HTMLUListElement; 

// * = = alert message  ==
function alertMessage(message:string):void {
    infoAlert.innerHTML = `${message}`;
    setTimeout(function () {
      infoAlert.style.display = "none";
    }, 2000);
    infoAlert.style.display = "inline-block";
  }

// * = = input text trim ==
function formInput(textInput:any):string {
    let trimmedInput:string = textInput.toString().toLowerCase().trim();
    let trimmedOutput:string = trimmedInput[0].toUpperCase() + trimmedInput.slice(1);
    console.log("trimmed", trimmedOutput)
    return trimmedOutput;
  }

// * = = Add button ==
addTask.addEventListener("click", (e:Event) => {
    e.preventDefault(); 
    // if empty do nothing
    if (inputText.value === "") {
      alertMessage("Dont be lazy, add something to do!");
    // if content then create tasks
    } else {      
      const textToPrint:string = formInput(inputText.value);
      createList(textToPrint);
    }
  });

// * = = tasks creation and putting on display ==
function createList(whatToDo:string):void {
  const lineContent = `
  <li class="tobedone-task">
  <i class= "far fa-square" task="markDone" title="Mark task done" tabindex="0"></i>
  <span id="text">${whatToDo}</span>
  <i class="far fa-trash-alt" task = "trashIt" title="Remove task" tabindex="0"></i>
  </li>`;
  listItem.insertAdjacentHTML("beforeend", lineContent);
  inputText.value = "";
  alertMessage("New task added!");
}

// * = = event for task done and task delete when symbols clicked  ==
listItem.addEventListener("click", (event:MouseEvent) => {
  event.preventDefault();
  const element:any = event.target as HTMLElement;
 
  if (element.attributes.task.value  === "markDone"){
    element.classList.replace("fa-square", "fa-check-square");
    element.parentNode.classList.replace("tobedone-task", "overline");
    alertMessage("Task is done!");
  } else if (element.attributes.task.value === "trashIt") {
    element.parentNode.parentNode.removeChild(element.parentNode as HTMLElement);
    alertMessage("Task is deleted!");
  }

});

// * = = clearing all items ==
removeItems.addEventListener("click", (event:Event) => {
  event.preventDefault(); 
  const ulOfList = document.getElementById("ul-of-todos") as HTMLUListElement;
  while (ulOfList.firstChild) {
    ulOfList.removeChild(ulOfList.firstChild);
  }

  alertMessage("All ToDos deleted!");
});