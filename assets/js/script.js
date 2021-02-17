var buttonEl = window.document.querySelector("#save-task");
buttonEl.addEventListener("click", createTaskHandler);

function createTaskHandler(){
    var ulEl = document.querySelector("#tasks");
    var task = document.createElement("li")
    task.textContent = "Added Task";
    task.className = "task-item";
    ulEl.appendChild(task);
}
