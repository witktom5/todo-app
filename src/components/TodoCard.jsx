function TodoCard({
  todo,
  onCompleteTodo,
  editedTodo,
  setEditedTodo,
  setTodoFormData,
}) {
  const selectTodo = (todo) => {
    if (todo.id === editedTodo) {
      setEditedTodo(null);
    } else {
      setEditedTodo(todo.id);
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
        </div>
      </div>
      <div className="todo-text">{todo.text}</div>
    </div>
  );
}
export default TodoCard;
