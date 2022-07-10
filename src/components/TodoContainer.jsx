import TodoCard from "./TodoCard";

function TodoContainer({
  todos,
  onCompleteTodo,
  editedTodo,
  setEditedTodo,
  setTodoFormData,
}) {
  return (
    <section className="todo-list-container">
      {todos.length > 0 ? (
        todos.map((el, i) => (
          <TodoCard
            key={i}
            todo={el}
            editedTodo={editedTodo}
            onCompleteTodo={onCompleteTodo}
            setEditedTodo={setEditedTodo}
            setTodoFormData={setTodoFormData}
          />
        ))
      ) : (
        <div className="no-todos-text">
          There are no Todos yet! Please add your first Todo.
        </div>
      )}
    </section>
  );
}
export default TodoContainer;
