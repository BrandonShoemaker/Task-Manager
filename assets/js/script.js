var taskIdCounter = 0;
var formEl = window.document.querySelector("#task-form");
formEl.addEventListener("submit", taskFormHandler);
var pageContentEl = document.querySelector("#page-content");
pageContentEl.addEventListener("click", taskButtonHandler);

function taskFormHandler(event){
    // prevent page reload
    event.preventDefault();
    // grabs inputs values
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    if(!taskNameInput || !taskTypeInput){
        formEl.reset();
        alert("You must enter a valid value!");
        return false;
    }
    //creates growable object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    }
    createTaskEl(taskDataObj);
}

function createTaskEl(taskDataObj){
    // creates reference to element the new task will be appended too=
    var ulEl = document.querySelector("#tasks");
    // creates a reference to the new element to be appended
    var taskToDo = document.createElement("li");
    // assigns a class name
    taskToDo.className = "task-item";
    taskToDo.setAttribute("data-task-id", taskIdCounter);
    // creates a container for contents in the task
    var taskInfoEl = document.createElement("div");
    // assigns class name to the container
    taskInfoEl.className = "task-info";
    // adds HTML to the container
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    // appends container to end of reference element
    taskToDo.appendChild(taskInfoEl);
    taskToDo.appendChild(createTaskActions(taskIdCounter));
    ulEl.appendChild(taskToDo);
    taskIdCounter++;
}

function createTaskActions(){
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    var editButtonEl = document.createElement("button");
    editButtonEl.className = "btn edit-btn";
    editButtonEl.textContent = "Edit";
    editButtonEl.setAttribute("data-task-id", taskIdCounter);
    actionContainerEl.appendChild(editButtonEl);

    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.setAttribute("data-task-id", taskIdCounter);
    actionContainerEl.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskIdCounter);

    var statusChoices = ["To-Do", "In Progress", "Completed"];
    var statusOptionEl;
    for(var i = 0; i < 3; i++){
        statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);
        statusSelectEl.appendChild(statusOptionEl);
    }
    actionContainerEl.appendChild(statusSelectEl);
    return actionContainerEl;
}

function taskButtonHandler(event){
    var taskId;
    if(event.target.matches(".delete-btn")){
        taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    }
    else if(event.target.matches(".edit-btn")){
        taskId = event.target.getAttribute("data-task-id");
        editTask(taskId);
    }
}

function deleteTask(taskId){
    var taskItem = document.querySelector(".task-item[data-task-id='"+taskId+"']");
    taskItem.remove();
}

function editTask(taskId){
    formEl.setAttribute("data-task-id", taskIdCounter);
    var taskItem = document.querySelector(".task-item[data-task-id='"+taskId+"']");
    var taskName = taskItem.querySelector("h3.task-name").textContent;
    var taskType = taskItem.querySelector("span.task-type").textContent;

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Edit";
}