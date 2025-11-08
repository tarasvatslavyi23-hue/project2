const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Завантаження збережених завдань
window.addEventListener("load", loadTasks);

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const li = document.createElement("li");
  li.innerHTML = `
    <span>${taskText}</span>
    <button class="delete">✕</button>
  `;

  li.addEventListener("click", () => {
    li.classList.toggle("done");
    saveTasks();
  });

  li.querySelector(".delete").addEventListener("click", (e) => {
    e.stopPropagation();
    li.remove();
    saveTasks();
  });

  taskList.appendChild(li);
  taskInput.value = "";
  saveTasks();
}

// Збереження у LocalStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach((li) => {
    tasks.push({
      text: li.querySelector("span").textContent,
      done: li.classList.contains("done"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Завантаження з LocalStorage
function loadTasks() {
  const saved = JSON.parse(localStorage.getItem("tasks")) || [];
  saved.forEach((task) => {
    const li = document.createElement("li");
    if (task.done) li.classList.add("done");
    li.innerHTML = `
      <span>${task.text}</span>
      <button class="delete">✕</button>
    `;
    li.addEventListener("click", () => {
      li.classList.toggle("done");
      saveTasks();
    });
    li.querySelector(".delete").addEventListener("click", (e) => {
      e.stopPropagation();
      li.remove();
      saveTasks();
    });
    taskList.appendChild(li);
  });
}
