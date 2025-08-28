 const form = document.getElementById("taskForm");
    const input = document.getElementById("taskInput");
    const list = document.getElementById("taskList");
    const themeBtn = document.getElementById("themeBtn");
    const body = document.body;

    // Load from localStorage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let darkMode = localStorage.getItem("dark") === "true";

    if(darkMode) {
      body.classList.add("dark");
      themeBtn.textContent = "🌙";
    }

    function save() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function render() {
      list.innerHTML = "";
      tasks.forEach((task, i) => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = task.text;
        span.className = "task-text" + (task.done ? " completed" : "");
        span.onclick = () => {
          tasks[i].done = !tasks[i].done;
          save();
          render();
        };

        const del = document.createElement("button");
        del.innerHTML = "🗑️";
        del.className = "delete-btn";
        del.onclick = () => {
          tasks.splice(i,1);
          save();
          render();
        };

        li.appendChild(span);
        li.appendChild(del);
        list.appendChild(li);
      });
    }

    form.onsubmit = (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if(text) {
        tasks.push({ text, done: false });
        save();
        render();
        input.value = "";
      }
    };

    themeBtn.onclick = () => {
      body.classList.toggle("dark");
      const dark = body.classList.contains("dark");
      localStorage.setItem("dark", dark);
      themeBtn.textContent = dark ? "🌙" : "🌞";
    };

    render();