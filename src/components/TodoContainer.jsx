import TodoCard from "./TodoCard";

function TodoContainer({
  todos,
  onCompleteTodo,
  todoToEdit,
  setTodoToEdit,
  setTodoFormData,
  onRemoveTodo,
}) {
  return (
    <section className="todo-list-container">
      {todos.length > 0 ? (
        todos.map((el, i) => (
          <TodoCard
            key={i}
            todo={el}
            todoToEdit={todoToEdit}
            onCompleteTodo={onCompleteTodo}
            setTodoToEdit={setTodoToEdit}
            setTodoFormData={setTodoFormData}
            onRemoveTodo={onRemoveTodo}
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
