let tasks =
  JSON.parse(
    localStorage.getItem("tasks")
  ) || [];

const quotes = [

  "Small steps every day 🚀",

  "Discipline beats motivation 💪",

  "Progress over perfection ✨",

  "Focus. Build. Repeat 🔥"
];

document.getElementById("motivation")
  .innerText =
  quotes[
    Math.floor(
      Math.random() * quotes.length
    )
  ];

function toggleTheme() {

  document.body
    .classList
    .toggle("light-mode");

  localStorage.setItem(
    "theme",
    document.body
      .classList
      .contains("light-mode")
  );
}

if(
  localStorage.getItem("theme")
  === "true"
) {

  document.body
    .classList
    .add("light-mode");
}

function detectCategory(text) {

  text = text.toLowerCase();

  if(
    text.includes("exam") ||
    text.includes("study")
  ) {

    return "Study";
  }

  if(
    text.includes("gym") ||
    text.includes("workout")
  ) {

    return "Health";
  }

  if(
    text.includes("project")
  ) {

    return "Work";
  }

  return "Personal";
}

function addTask() {

  const title =
    document.getElementById(
      "taskTitle"
    ).value;

  const desc =
    document.getElementById(
      "taskDesc"
    ).value;

  const date =
    document.getElementById(
      "taskDate"
    ).value;

  if(title === "") {

    alert("Enter task");

    return;
  }

  const text =
    (title + " " + desc)
    .toLowerCase();

  let priority = "Low";

  if(
    text.includes("exam") ||
    text.includes("urgent") ||
    text.includes("deadline")
  ) {

    priority = "High";
  }

  else if(
    text.includes("project") ||
    text.includes("meeting")
  ) {

    priority = "Medium";
  }

  const category =
    detectCategory(text);

  let suggestion = "";

  if(priority === "High") {

    suggestion =
      "⚡ Complete this task early.";
  }

  else if(priority === "Medium") {

    suggestion =
      "📌 Schedule focused time.";
  }

  else {

    suggestion =
      "🌱 Small progress matters.";
  }

  document.getElementById(
    "aiSuggestion"
  ).innerText = suggestion;

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

  notifyUser(
    "New AI task added 🚀"
  );

  displayTasks();

  updateStats();

  updateStreak();

  document.getElementById(
    "taskTitle"
  ).value = "";

  document.getElementById(
    "taskDesc"
  ).value = "";

  document.getElementById(
    "taskDate"
  ).value = "";
}

function displayTasks() {

  const taskList =
    document.getElementById(
      "taskList"
    );

  taskList.innerHTML = "";

  if(tasks.length === 0) {

    taskList.innerHTML =
      `
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

    const today =
      new Date();

    const dueDate =
      new Date(task.date);

    const diffTime =
      dueDate - today;

    const diffDays =
      Math.ceil(
        diffTime /
        (1000 * 60 * 60 * 24)
      );

    let dueText = "";

    if(!task.date) {

      dueText = "No deadline";
    }

    else if(diffDays < 0) {

      dueText = "❌ Overdue";
    }

    else if(diffDays === 0) {

      dueText = "⚠️ Due Today";
    }

    else {

      dueText =
        `⏳ ${diffDays} day(s) left`;
    }

    taskList.innerHTML += `

      <div class="
        task
        ${task.priority.toLowerCase()}
        ${task.completed ? 'done' : ''}
      ">

        <h3>${task.title}</h3>

        <p>${task.desc}</p>

        <p>📅 ${task.date || 'No Date'}</p>

        <p>${dueText}</p>

        <p>🔥 Priority:
          ${task.priority}
        </p>

        <p>📂 Category:
          ${task.category}
        </p>

        <div class="progress-bar">

          <div
            class="progress-fill"
            style="
              width:
              ${task.completed ? '100%' : '45%'}
            "
          ></div>

        </div>

        <button
          onclick="completeTask(${index})"
        >
          ${task.completed
            ? "Undo"
            : "Complete"}
        </button>

        <button
          onclick="deleteTask(${index})"
        >
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

  confetti();

  displayTasks();

  updateStats();

  updateStreak();
}

function deleteTask(index) {

  tasks.splice(index, 1);

  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
  );

  displayTasks();

  updateStats();

  updateStreak();
}

function searchTasks() {

  const value =
    document.getElementById(
      "search"
    )
    .value
    .toLowerCase();

  const taskDivs =
    document.querySelectorAll(
      ".task"
    );

  taskDivs.forEach(task => {

    if(
      task.innerText
      .toLowerCase()
      .includes(value)
    ) {

      task.style.display =
        "block";
    }

    else {

      task.style.display =
        "none";
    }
  });
}

function filterTasks(type) {

  const taskDivs =
    document.querySelectorAll(
      ".task"
    );

  taskDivs.forEach(task => {

    if(type === "all") {

      task.style.display =
        "block";
    }

    else if(
      type === "completed" &&
      task.classList.contains("done")
    ) {

      task.style.display =
        "block";
    }

    else if(
      type === "pending" &&
      !task.classList.contains("done")
    ) {

      task.style.display =
        "block";
    }

    else {

      task.style.display =
        "none";
    }
  });
}

let time = 1500;

let interval;

function startTimer() {

  clearInterval(interval);

  interval =
    setInterval(() => {

      let minutes =
        Math.floor(time / 60);

      let seconds =
        time % 60;

      document.getElementById(
        "timer"
      ).innerText =
        `${minutes}:${
          seconds < 10
          ? '0'
          : ''
        }${seconds}`;

      time--;

      if(time < 0) {

        clearInterval(interval);

        alert(
          "Focus session complete 🎉"
        );

        time = 1500;
      }

    }, 1000);
}

let streak =
  Number(
    localStorage.getItem("streak")
  ) || 0;

function updateStreak() {

  const completed =
    tasks.filter(
      task => task.completed
    );

  streak = completed.length;

  localStorage.setItem(
    "streak",
    streak
  );

  document.getElementById(
    "streak"
  ).innerText =
    `🔥 Productivity Streak:
    ${streak}`;
}

function updateStats() {

  document.getElementById(
    "totalTasks"
  ).innerText =
    tasks.length;

  document.getElementById(
    "completedTasks"
  ).innerText =
    tasks.filter(
      task => task.completed
    ).length;
}

Notification.requestPermission();

function notifyUser(message) {

  if(
    Notification.permission
    === "granted"
  ) {

    new Notification(message);
  }
}

function addMessage(
  text,
  sender
) {

  const chatMessages =
    document.getElementById(
      "chatMessages"
    );

  const div =
    document.createElement("div");

  div.classList.add(
    "message",
    sender
  );

  div.innerText = text;

  chatMessages.appendChild(div);

  chatMessages.scrollTop =
    chatMessages.scrollHeight;
}

function sendMessage() {

  const input =
    document.getElementById(
      "chatInput"
    );

  const text =
    input.value.trim();

  if(text === "") return;

  addMessage(text, "user");

  input.value = "";

  setTimeout(() => {

    const response =
      generateAIResponse(text);

    addMessage(response, "bot");

  }, 800);
}

function generateAIResponse(message) {

  message =
    message.toLowerCase();

  if(
    message.includes("hello")
  ) {

    return `
Hello 👋
Ready to crush your goals?
`;
  }

  if(
    message.includes("motivate")
  ) {

    return `
🔥 Discipline creates success.
Keep going.
`;
  }

  if(
    message.includes("tasks")
  ) {

    return `
📋 You currently have
${tasks.length} tasks.
`;
  }

  if(
    message.includes("completed")
  ) {

    const completed =
      tasks.filter(
        task => task.completed
      ).length;

    return `
✅ Completed:
${completed} task(s).
`;
  }

  if(
    message.includes("priority")
  ) {

    const high =
      tasks.filter(
        task =>
          task.priority === "High"
      ).length;

    return `
⚠️ High-priority tasks:
${high}
`;
  }

  return `
🤖 AI Suggestion:

Break large tasks into
smaller steps and focus
on one thing at a time.
`;
}

document
  .getElementById("chatInput")
  .addEventListener(
    "keypress",
    function(e) {

      if(e.key === "Enter") {

        sendMessage();
      }
});

displayTasks();

updateStats();

updateStreak();