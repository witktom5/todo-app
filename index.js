const CLASS_NAMES = {
  todoForm: "add-todo-form",
  todoContainer: "todo-list-container",
  todoText: "todo-text",
  todoTitle: "todo-title",
  todoCard: "todo-card",
  todoCompleted: "todo-completed",
  btnAdd: "btn-add",
  btnComplete: "btn-complete",
  btnEdit: "btn-edit",
  btnTodo: "todo-btn",
  btnTodoGroup: "todo-btn-group",
};

const form = document.querySelector(`.${CLASS_NAMES.todoForm}`);
const formTextArea = document.querySelector("#todo-form-text");
const formInput = document.querySelector("#todo-form-title");
const formBtn = document.querySelector(`.${CLASS_NAMES.btnAdd}`);
const todoContainer = document.querySelector(`.${CLASS_NAMES.todoContainer}`);

let editedTodo = null;

function init() {
  form.addEventListener("submit", onAddTodo);
  todoContainer.addEventListener("click", onTodoBtnClick);
}

//  On add todo button click
function onAddTodo(e) {
  e.preventDefault();

  // save todo info, clear the inputs
  const todoTitle = formInput.value;
  const todoText = formTextArea.value;
  formTextArea.value = "";
  formInput.value = "";

  //  save if in edit mode / add todo html
  if (editedTodo) {
    editedTodo.querySelector(`.${CLASS_NAMES.todoTitle}`).innerText = todoTitle;
    editedTodo.querySelector(`.${CLASS_NAMES.todoText}`).innerText = todoText;
    editedTodo = null;

    formBtn.innerText = "Create Todo";
  } else {
    createTodo(todoTitle, todoText);
  }
}

//  Create Todo
function createTodo(todoTitle, todoText) {
  todoContainer.innerHTML += `
            <div class="${CLASS_NAMES.todoCard}">
             <div class="row">
                <h3 class="${CLASS_NAMES.todoTitle}">${todoTitle}</h3>
                <div class="${CLASS_NAMES.btnTodoGroup}">
                  <button class="${CLASS_NAMES.btnTodo} ${CLASS_NAMES.btnEdit}">✎</button>
                  <button class="${CLASS_NAMES.btnTodo} ${CLASS_NAMES.btnComplete}">✓</button>
                </div>
             </div>
             <div class="${CLASS_NAMES.todoText}">${todoText}</div>
            </div>
            `;
}

// Todo buttons
function onTodoBtnClick(e) {
  const todoElement = e.target.closest(`.${CLASS_NAMES.todoCard}`);
  if (e.target.classList.contains(`${CLASS_NAMES.btnComplete}`))
    completeTodo(todoElement);
  if (e.target.classList.contains(`${CLASS_NAMES.btnEdit}`))
    editTodo(todoElement);
}

// Complete Todo
function completeTodo(todo) {
  todo.classList.toggle(`${CLASS_NAMES.todoCompleted}`);
}

//  Edit Todo
function editTodo(todo) {
  // if already editing this todo, switch edit mode off
  if (editedTodo && todo === editedTodo) {
    editedTodo = null;
    return (formBtn.innerText = "Create Todo");
  }

  editedTodo = todo;
  formBtn.innerText = "Save Todo";

  //  select title and text html elements, set edited elements
  formInput.value = todo.querySelector(`.${CLASS_NAMES.todoTitle}`).innerText;
  formTextArea.value = todo.querySelector(`.${CLASS_NAMES.todoText}`).innerText;
}

init();
