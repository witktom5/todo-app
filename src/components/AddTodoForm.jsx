import AddTodoInput from "./AddTodoInput";

function AddTodoForm({
  editedTodo,
  todoFormData,
  initialStateForm,
  setTodoFormData,
  onAddTodo,
  onEditTodo,
}) {
  const config = [
    {
      placeholder: "Enter Todo title",
      propName: "todoTitle",
    },
    {
      placeholder: "Enter Todo text",
      propName: "todoText",
    },
  ];

  const changeState = (value, prop) => {
    setTodoFormData({ ...todoFormData, [prop]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (editedTodo) {
      onEditTodo(todoFormData.todoTitle, todoFormData.todoText);
    } else {
      onAddTodo(todoFormData.todoTitle, todoFormData.todoText);
    }
    setTodoFormData(initialStateForm);
  };

  return (
    <section className="add-todo-container">
      <form className="add-todo-form" onSubmit={onSubmit}>
        {config.map((e, i) => (
          <AddTodoInput
            key={i}
            placeholder={e.placeholder}
            value={todoFormData[e.propName]}
            propName={e.propName}
            cb={changeState}
          />
        ))}
        <button type="submit" className="btn-add">
          {editedTodo ? "Save Todo" : "Create Todo"}
        </button>
      </form>
    </section>
  );
}
export default AddTodoForm;
