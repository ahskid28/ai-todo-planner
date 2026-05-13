let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const quotes = [

  "Small steps every day 🚀",

  "Discipline beats motivation 💪",

  "Progress over perfection ✨",

  "Focus. Build. Repeat 🔥"
];

document.getElementById("motivation").innerText =
  quotes[Math.floor(Math.random() * quotes.length)];

function detectCategory(text) {

  text = text.toLowerCase();

  if(text.includes("exam") || text.includes("study")) {
    return "Study";
  }

  if(text.includes("gym") || text.includes("workout")) {
    return "Health";
  }

  if(text.includes("project") || text.includes("office")) {
    return "Work";
  }

  return "Personal";
}

function addTask() {

  const title =
    document.getElementById("taskTitle").value;

  const desc =
    document.getElementById("taskDesc").value;

  const date =
    document.getElementById("taskDate").value;

  if(title === "") {

    alert("Please enter a task");

    return;
  }

  let priority = "Low";

  const text =
    (title + " " + desc).toLowerCase();

  if(
    text.includes("exam") ||
    text.includes("urgent") ||
    text.includes("deadline")
  ) {

    priority = "High";
  }

  else if(
    text.includes("project") ||
    text.includes("assignment") ||
    text.includes("meeting")
  ) {

    priority = "Medium";
  }

  const category = detectCategory(text);

  const task = {

    title,
    desc,
    date,
    category,
    priority,
    completed: false
  };

  tasks.push(task);

  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
  );

  displayTasks();

  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDesc").value = "";
  document.getElementById("taskDate").value = "";
}

function displayTasks() {

  const taskList =
    document.getElementById("taskList");

  taskList.innerHTML = "";

  if(tasks.length === 0) {

    taskList.innerHTML = `
      <p style="
        color:white;
        text-align:center;
        margin-top:20px;
      ">
        No tasks yet ✨
      </p>
    `;

    return;
  }

  tasks.forEach((task, index) => {

    taskList.innerHTML += `

      <div class="
        task
        ${task.priority.toLowerCase()}
        ${task.completed ? 'done' : ''}
      ">

        <h3>${task.title}</h3>

        <p>${task.desc}</p>

        <p>📅 ${task.date || "No Date"}</p>

        <p>🔥 Priority: ${task.priority}</p>

        <p>📂 Category: ${task.category}</p>

        <button onclick="completeTask(${index})">
          ${task.completed ? "Undo" : "Complete"}
        </button>

        <button onclick="deleteTask(${index})">
          Delete
        </button>

      </div>
    `;
  });
}

function completeTask(index) {

  tasks[index].completed =
    !tasks[index].completed;

  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
  );

  displayTasks();
}

function deleteTask(index) {

  tasks.splice(index, 1);

  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
  );

  displayTasks();
}

function searchTasks() {

  const value =
    document.getElementById("search")
    .value
    .toLowerCase();

  const taskDivs =
    document.querySelectorAll(".task");

  taskDivs.forEach(task => {

    if(
      task.innerText
      .toLowerCase()
      .includes(value)
    ) {

      task.style.display = "block";
    }

    else {

      task.style.display = "none";
    }
  });
}

displayTasks();