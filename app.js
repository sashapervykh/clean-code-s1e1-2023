//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput=document.querySelector(".list__text-input_width_318px");//Add a new task.
var addButton=document.querySelector(".list__button_add-button");//first button
var incompleteTaskHolder=document.querySelector(".incomplete-tasks-list");//ul of #incompleteTasks
var completedTasksHolder=document.querySelector(".completed-tasks-list");//completed-tasks


//New task list item
var createNewTaskElement=function(taskString){

    var listItem=document.createElement("li");
    //input (checkbox)
    var checkBox=document.createElement("input");//checkbx
    //label
    var label=document.createElement("label");//label
    //input (text)
    var editInput=document.createElement("input");//text
    //button.edit
    var editButton=document.createElement("button");//edit button

    //button.delete
    var deleteButton=document.createElement("button");//delete button
    var deleteButtonImg=document.createElement("img");//delete button image

    listItem.classList = "list__list-item list__list-item_for-included-tasks"

    label.innerText=taskString;
    label.className="list__label list__label_display_inline-block";

    //Each elements, needs appending
    checkBox.type="checkbox";
    checkBox.classList = "list__checkbox-input";
    editInput.type="text";
    editInput.className="task list__text-input list__text-input_for-included-tasks";
    editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.
    editButton.className="list__button list__button_edit-button";

    deleteButton.className="list__button list__button_delete-button";
    deleteButtonImg.src='./remove.svg';
    deleteButtonImg.classList = "delete-icon";
    deleteButton.appendChild(deleteButtonImg);


    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}



var addTask=function(){
    console.log("Add Task...");
    
    if (!taskInput.value) return;
    var listItem=createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value="";

}

//Edit an existing task.

var editTask=function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    var listItem=this.parentNode;

    var editInput=listItem.querySelector(".list__text-input");
    var label=listItem.querySelector(".list__label");
    var editBtn=listItem.querySelector(".list__button_edit-button");
    var containsClass=label.classList.contains("list__label_for-edited-tasks");
    //If class of the parent is .editmode
    if(containsClass){

        //switch to .editmode
        //label becomes the inputs value.
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    }else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }

    //toggle .editmode on the parent.
    label.classList.toggle("list__label_for-edited-tasks");
    editInput.classList.toggle("list__text-input_for-edited-tasks");
    editInput.classList.toggle("list__text-input_for-included-tasks");
    label.classList.toggle("list__label_display_inline-block");

};


//Delete task.
var deleteTask=function(){
    console.log("Delete Task...");

    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted=function(){
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    var listItem=this.parentNode;
    var label=listItem.querySelector(".list__label");
    label.classList.toggle("list__label_for-completed-tasks");
    label.classList.toggle("list__label_display_inline-block");
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
    console.log("Incomplete Task...");
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasks.
    var listItem=this.parentNode;
    var label=listItem.querySelector(".list__label");
    label.classList.toggle("list__label_for-completed-tasks");
    label.classList.toggle("list__label_display_inline-block");
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
//select ListItems children
    var checkBox=taskListItem.querySelector(".list__checkbox-input");
    var editButton=taskListItem.querySelector(".list__button_edit-button");
    var deleteButton=taskListItem.querySelector(".list__button_delete-button");


    //Bind editTask to edit button.
    editButton.onclick=editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick=deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.