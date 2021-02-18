var formEl = window.document.querySelector("#task-form");
formEl.addEventListener("submit", createTaskHandler);

function createTaskHandler(event){
    // prevent page reload
    event.preventDefault();
    // grabs inputs values
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    // creates reference to element the new task will be appended too=
    var ulEl = document.querySelector("#tasks");
    // creates a reference to the new element to be appended
    var task = document.createElement("li")
    // assigns a class name
    task.className = "task-item";
    // creates a container for contents in the task
    var taskInfoEl = document.createElement("div");
    // assigns class name to the container
    taskInfoEl.className = "task-info";
    // adds HTML to the container
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
    // appends container to end of reference element
    task.appendChild(taskInfoEl);
    ulEl.appendChild(task);
}
