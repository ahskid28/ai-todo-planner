let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


function addTask() {

  const title = document.getElementById("taskTitle").value;

  const desc = document.getElementById("taskDesc").value;

  const date = document.getElementById("taskDate").value;

  if(title === "") {
    alert("Enter task");
    return;
  }

  let priority = "Low";

const text = (title + " " + desc).toLowerCase();

if(text.includes("exam") || text.includes("urgent")) {
  priority = "High";
}

const task = {
  title,
  desc,
  date,
  priority
};

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  displayTasks();
}

function displayTasks() {

  const taskList = document.getElementById("taskList");

  taskList.innerHTML = "";

  tasks.forEach(task => {

    taskList.innerHTML += `
      <div class="task">
        <h3>${task.title}</h3>
        <p>${task.desc}</p>
        <p>${task.date}</p>
<p>Priority: ${task.priority}</p>
      </div>
    `;
  });
}

displayTasks();