function addTask() {
  const text = document.getElementById("taskText").value.trim();
  if (!text) return;

  const task = document.createElement("div");
  task.className = "task";
  task.textContent = text;
  task.draggable = true;
  task.ondragstart = drag;

  document.getElementById("todo").appendChild(task);
  document.getElementById("taskText").value = "";
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.textContent);
  ev.dataTransfer.setData("id", ev.target.id);
  ev.dataTransfer.setData("html", ev.target.outerHTML);
  ev.target.remove();
}

function drop(ev) {
  ev.preventDefault();
  const html = ev.dataTransfer.getData("html");
  ev.target.closest(".task-list").innerHTML += html;

  // إعادة تعيين الأحداث
  const tasks = document.querySelectorAll(".task");
  tasks.forEach(task => {
    task.ondragstart = drag;
    task.draggable = true;
  });
}
