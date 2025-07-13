document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("taskForm");
  const taskList = document.getElementById("taskList");
  const error = document.getElementById("error");
  const filterBtn = document.getElementById("filterCompleted");
  const sortBtn = document.getElementById("sortPriority");

  let tasks = [];

  taskForm.addEventListener("submit", function (e) {
    e.preventDefault();
    error.textContent = "";

    try {
      const title = document.getElementById("title").value.trim();
      const description = document.getElementById("description").value.trim();
      const priority = document.querySelector('input[name="priority"]:checked');

      if (!title) {
        error.textContent = "Başlık boş bırakılamaz.";
        return;
      }

      if (!priority) {
        error.textContent = "Lütfen bir öncelik seçin.";
        return;
      }

      const newTask = {
        id: Date.now(),
        title,
        description,
        priority: priority.value,
        completed: false
      };

      tasks.push(newTask);
      renderTasks(tasks);
      taskForm.reset();
    } catch (err) {
      error.textContent = "Beklenmeyen bir hata oluştu.";
      console.error(err);
    }
  });

  taskList.addEventListener("click", function (e) {
    if (e.target.classList.contains("complete-btn")) {
      const id = parseInt(e.target.dataset.id);
      const task = tasks.find(t => t.id === id);
      if (task) task.completed = !task.completed;
      renderTasks(tasks);
      e.stopPropagation();
    }

    if (e.target.classList.contains("delete-btn")) {
      const id = parseInt(e.target.dataset.id);
      tasks = tasks.filter(t => t.id !== id);
      renderTasks(tasks);
      e.stopPropagation();
    }
  });

  filterBtn.addEventListener("click", () => {
    const filtered = tasks.filter(t => t.completed);
    renderTasks(filtered);
  });

  sortBtn.addEventListener("click", () => {
    const priorityOrder = { "Düşük": 1, "Orta": 2, "Yüksek": 3 };
    const sorted = [...tasks].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    renderTasks(sorted);
  });

  function renderTasks(taskArray) {
    taskList.innerHTML = "";
    taskArray.forEach(task => {
      const li = document.createElement("li");
      li.className = task.completed ? "completed" : "";
      li.innerHTML = `
        <strong>${task.title}</strong><br>
        ${task.description ? `<em>${task.description}</em><br>` : ""}
        <small>Öncelik: ${task.priority}</small>
        <div class="task-buttons">
          <button class="complete-btn" data-id="${task.id}">${task.completed ? "Geri Al" : "Tamamlandı"}</button>
          <button class="delete-btn" data-id="${task.id}">Sil</button>
        </div>
      `;
      taskList.appendChild(li);
    });
  }
});
