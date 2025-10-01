function getTasks() {
  const tasks = localStorage.getItem("tasks")
  if (!tasks) return []
  const parsed = JSON.parse(tasks)
  return parsed
} 

function toggleTaskForm() {
  const mainContainer = document.getElementById("main-container")
  const addTaskContainer = document.getElementById("add-task-container")
  mainContainer.classList.toggle("hidden")
  addTaskContainer.classList.toggle("hidden")
}

function handleAddTask() {
  const taskList = getTasks()
  const inputValue = document.getElementById("new-input").value
  const priority = document.getElementById("priority").value
  const newTask = {
    "task": inputValue,
    "priority": priority,
  }
  taskList.push(newTask)
  localStorage.setItem("tasks", JSON.stringify(taskList))
}

function sortTaskList() {
  const taskList = getTasks()
  taskList.sort((a, b) => a.priority - b.priority)
  localStorage.setItem("tasks", JSON.stringify(taskList))
}

function resetTextarea() {
  const inputValue = document.getElementById("new-input")
  inputValue.value = ""
}

function handleDelete() {
  const taskList = getTasks()
  const taskContainer = document.getElementById("task-container")
  const selected = document.querySelector("#task-container div .radio-span:checked")
  const selectedInput = selected.nextElementSibling
  if (selected) {
    selected.parentElement.remove()
    const selectedItem = taskList.filter(task => task.task === selectedInput.id)
    const index = taskList.indexOf(selectedItem)
    taskList.splice(index, 1)
    localStorage.setItem("tasks", JSON.stringify(taskList)) 
  }  
}

function buildTasks() {
  const taskContainer = document.getElementById("task-container")
  taskContainer.innerHTML = ''
  const taskList = getTasks()
  taskList.map(task => {
    taskContainer.innerHTML += `
  <div><input id="${task.task}" type="radio" name="all-tasks" class="radio-span"><span class="text-span">${task.task}</span><span class="num-span">${task.priority}</span></div>
  `})
}

document.addEventListener('DOMContentLoaded', () => {
  sortTaskList()
  buildTasks();
});

document.getElementById("add-btn").addEventListener("click", () => {
  toggleTaskForm()
})

document.getElementById("go-back-btn").addEventListener("click", () => {
  toggleTaskForm()
})

document.getElementById("add-btn-submit").addEventListener("click", () => {
  handleAddTask()
  toggleTaskForm()
  resetTextarea()
  sortTaskList()
  buildTasks()
})

document.getElementById("delete-btn").addEventListener("click", () => {
  handleDelete()
})


