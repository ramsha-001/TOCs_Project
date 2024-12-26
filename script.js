const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos");

// Load existing todos from localStorage
const todos = JSON.parse(localStorage.getItem("todos")) || [];

if (todos) {
  todos.forEach((todo) => addTodo(todo));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
});

function addTodo(todo) {
  let todoText = input.value;

  if (todo) {
    todoText = todo.text;
  }

  if (todoText) {
    const todoEl = document.createElement("li");
    todoEl.className = "todo-item";

    if (todo && todo.completed) {
      todoEl.classList.add("completed");
    }

    todoEl.innerHTML = `
      <span>${todoText}</span>
    `;

    // Toggle completion on click
    todoEl.addEventListener("click", () => {
      todoEl.classList.toggle("completed");
      updateLocalStorage();
    });

    // Remove on right-click
    todoEl.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      todoEl.remove();
      updateLocalStorage();
    });

    todosUL.appendChild(todoEl);
    input.value = "";
    updateLocalStorage();
  }
}

function updateLocalStorage() {
  const todos = Array.from(document.querySelectorAll(".todo-item")).map((todo) => {
    return {
      text: todo.innerText,
      completed: todo.classList.contains("completed"),
    };
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}
