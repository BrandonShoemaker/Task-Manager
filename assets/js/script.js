var taskIdCounter = 0;
var tasks = [];
var formEl = window.document.querySelector("#task-form");
formEl.addEventListener("submit", taskFormHandler);
var pageContentEl = document.querySelector("#page-content");
pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);
var taskInProgress = document.querySelector("#task-in-progress");
var taskCompleted = document.querySelector("#task-completed");
var tasksToDo = document.querySelector("#tasks");

getTasks();

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

    var isEdit = formEl.hasAttribute("data-task-id");
    if(isEdit){
        var taskId = formEl.getAttribute("data-task-id");
        debugger;
        completedEditTask(taskId, taskNameInput, taskTypeInput);
    }
    else{
        //creates growable object
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput,
            status: "to-do",
            id: 0
        }
        createTaskEl(taskDataObj);        
    }
}

function createTaskEl(taskDataObj){
    var found = false;
    // creates reference to element the new task will be appended too=
    var ulEl = document.querySelector("#tasks");
    // creates a reference to the new element to be appended
    var taskToDo = document.createElement("li");
    // assigns a class name
    taskToDo.className = "task-item";
    taskToDo.setAttribute("data-task-id", taskIdCounter);
    taskDataObj.id = taskIdCounter;
    // creates a container for contents in the task
    var taskInfoEl = document.createElement("div");
    // assigns class name to the container
    taskInfoEl.className = "task-info";
    // adds HTML to the container
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    // appends container to end of reference element
    debugger;
    for(var i = 0; i < tasks.length; i++){
        if(taskDataObj.id === tasks[i].id) found = true;
    }
    if(found === false){
        taskDataObj.id = taskIdCounter;
        tasks.push(taskDataObj);
        setTasks();
    }
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
        statusOptionEl.setAttribute("data-task-id", taskIdCounter);
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

    for(var i = 0; i < tasks.length; i++){
        if(tasks[i].id === parseInt(taskId)){
            tasks.splice(i, 1);
            setTasks();
        }
    }
}

function editTask(taskId){
    formEl.setAttribute("data-task-id", taskId);
    var taskItem = document.querySelector(".task-item[data-task-id='"+taskId+"']");
    var taskName = taskItem.querySelector("h3.task-name").textContent;
    var taskType = taskItem.querySelector("span.task-type").textContent;

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Edit";
}

function completedEditTask(taskId, taskNameInput, taskTypeInput){
    var taskItem = document.querySelector(".task-item[data-task-id='"+taskId+"']");

    taskItem.querySelector("h3.task-name").textContent = taskNameInput;
    taskItem.querySelector("span.task-type").textContent = taskTypeInput;

    for(var i = 0; i < tasks.length; i++){
        if(tasks[i].id === parseInt(taskId)){
            tasks[i].name = taskNameInput;
            task[i].type = taskTypeInput;
            setTasks();
        }
    }

    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
}

function taskStatusChangeHandler(event){
    var taskId = event.target.getAttribute("data-task-id");
    var statusValue = event.target.value.toLowerCase();
    var taskItem = document.querySelector(".task-item[data-task-id='"+taskId+"']");

    if(statusValue === "to-do") tasksToDo.appendChild(taskItem);
    else if(statusValue === "in progress") taskInProgress.appendChild(taskItem);
    else if(statusValue === "completed") taskCompleted.appendChild(taskItem);

    for(var i = 0; i < tasks.length; i++){
        if(tasks[i].id === parseInt(taskId)){
            tasks[i].status = statusValue;
            setTasks();
        }
    }
}

function setTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks(){
    var listItemEl;
    tasks = localStorage.getItem("tasks");
    console.log(tasks);
    if(!tasks){
        tasks = [];
        return;
    }
    tasks = JSON.parse(tasks);
    for(var i = 0; i < tasks.length; i++){
        taskIdCounter = tasks[i].id;
        createTaskEl(tasks[i]);
        listItemEl = document.querySelector(".task-item[data-task-id='"+ tasks[i].id +"']");
        if(tasks[i].status === "to-do") {
            tasksToDo.appendChild(listItemEl);
            listItemEl.querySelector("select[name='status-change']").selectedIndex = 0;
        }
        else if(tasks[i].status === "in progress") {
            taskInProgress.appendChild(listItemEl);
            listItemEl.querySelector("select[name='status-change']").selectedIndex = 1;
        }
        else if(tasks[i].status === "completed") {
            taskCompleted.appendChild(listItemEl);
            listItemEl.querySelector("select[name='status-change']").selectedIndex = 2;
        }
    }
    console.log(taskIdCounter);
    
}