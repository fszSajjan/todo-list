// Load tasks on page load
window.onload = () => {
  loadTasks();
  document.getElementById("darkModeToggle").onclick = toggleDarkMode;
  document.getElementById("clearAllBtn").onclick = clearAllTasks;
};

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  if (taskText) {
    const task = {
      text: taskText,
      done: false
    };
    saveTask(task);
    input.value = "";
    renderTasks();
  }
}

function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  renderTasks();
  const isDark = localStorage.getItem("darkMode") === "true";
  if (isDark) document.body.classList.add("dark");
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    if (task.done) li.classList.add("done");
    li.onclick = () => toggleDone(index);
    taskList.appendChild(li);
  });
}

function toggleDone(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks[index].done = !tasks[index].done;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function clearAllTasks() {
  if (confirm("Are you sure you want to clear all tasks?")) {
    localStorage.removeItem("tasks");
    renderTasks();
  }
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("darkMode", isDark);
}
