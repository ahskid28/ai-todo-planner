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

  localStorage.setItem("tasks", JSON.stringify(tasks));

  displayTasks();
}

function displayTasks() {

  const taskList = document.getElementById("taskList");

  taskList.innerHTML = "";

  tasks.forEach((task, index) => {

    taskList.innerHTML += `
     <div class="task ${task.priority.toLowerCase()} ${task.completed ? 'done' : ''}"> 
        <h3>${task.title}</h3>
        <p>${task.desc}</p>
        <p>${task.date}</p>
<p>Priority: ${task.priority}</p>

<p>Category: ${task.category}</p>

<button onclick="completeTask(${index})">
  Complete
</button>

<button onclick="deleteTask(${index})">
  Delete
</button>
      </div>
    `;
  });
}

displayTasks();

function completeTask(index) {

  tasks[index].completed = !tasks[index].completed;

  localStorage.setItem("tasks", JSON.stringify(tasks));

  displayTasks();
}

function deleteTask(index) {

  tasks.splice(index, 1);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  displayTasks();
}

function detectCategory(text) {

  text = text.toLowerCase();

  if(text.includes("exam") || text.includes("study")) {
    return "Study";
  }

  if(text.includes("gym")) {
    return "Health";
  }

  if(text.includes("project")) {
    return "Work";
  }

  return "Personal";
}