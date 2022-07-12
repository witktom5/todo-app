function TodoCard({
  todo,
  onCompleteTodo,
  onRemoveTodo,
  todoToEdit,
  setTodoToEdit,
  setTodoFormData,
}) {
  const selectTodo = (todo) => {
    if (todoToEdit && todo.id === todoToEdit.id) {
      setTodoToEdit(null);
    } else {
      setTodoToEdit(todo);
      setTodoFormData({ todoTitle: todo.title, todoText: todo.text });
    }
  };

  return (
    <div className={`todo-card ${todo.completed ? "todo-completed" : ""}`}>
      <div className="row">
        <h3 className="todo-title">{todo.title}</h3>
        <div className="todo-btn-group">
          <button
            onClick={() => selectTodo(todo)}
            className="todo-btn btn-edit"
          >
            ✎
          </button>
          <button
            onClick={() => onCompleteTodo(todo)}
            className="todo-btn btn-complete"
          >
            ✓
          </button>
          <button
            onClick={() => onRemoveTodo(todo)}
            className="todo-btn btn-remove"
          >
            X
          </button>
        </div>
      </div>
      <div className="todo-text">{todo.text}</div>
    </div>
  );
}
export default TodoCard;
