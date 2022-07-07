function init() {
    const form = document.querySelector('.add-todo-form')
    const todoContainer = document.querySelector('.todo-list-container')

    form.addEventListener('submit', onAddTodo)
    todoContainer.addEventListener('click', onTodoBtnClick)
}

//  Add a Todo

function onAddTodo(e) {
    e.preventDefault()
    const formTextArea = document.querySelector('#todo-text')
    const formInput = document.querySelector('#todo-title')

    // save todo info, clear the inputs

    const todoTitle = formInput.value;
    const todoText = formTextArea.value;
    formTextArea.value = ''
    formInput.value = ''

    //  save if in edit mode / add todo html
    if (editedTodo) {
        const formBtn = document.querySelector('.btn-add')

        editedTodo.children[0].children[0].innerText = todoTitle;
        editedTodo.children[1].innerText = todoText;
        editedTodo = null;

        formBtn.innerText = 'Create Todo'
    } else {
        const todoContainer = document.querySelector('.todo-list-container')

        todoContainer.innerHTML +=
            `
            <div class="todo-card">
             <div class="row">
                <h3 class="todo-title">${todoTitle}</h3>
                <div class="todo-btn-group">
                  <button class="todo-btn btn-edit">✎</button>
                  <button class="todo-btn btn-complete">✓</button>
                </div>
             </div>
             <div class="todo-text">${todoText}</div>
            </div>
            `
    }
}

// Todo buttons

function onTodoBtnClick(e) {
    const todoElement = e.target.closest('.todo-card')
    if (e.target.classList.contains('btn-complete')) completeTodo(todoElement)
    if (e.target.classList.contains('btn-edit')) editTodo(todoElement)
}

// Complete Todo

function completeTodo(todo) {
    todo.classList.toggle('todo-completed')
}

//  Edit Todo

function editTodo(todo) {

    const formBtn = document.querySelector('.btn-add')
    const formTextArea = document.querySelector('#todo-text')
    const formInput = document.querySelector('#todo-title')

    // if already editing this todo, switch edit mode off
    if (editedTodo && todo === editedTodo) {
        editedTodo = null;
        return formBtn.innerText = 'Create Todo'
    }

    editedTodo = todo

    formBtn.innerText = 'Save Todo'

    //  select title and text html elements, set edited elements

    const todoText = todo.children[0].children[0].innerText
    const todoTitle = todo.children[1].innerText

    formTextArea.value = todoTitle;
    formInput.value = todoText;
}

let editedTodo = null;

init()