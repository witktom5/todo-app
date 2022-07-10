function AddTodoInput({ placeholder, value, cb, propName }) {
  return (
    <input
      minLength="4"
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => cb(e.target.value, propName)}
    />
  );
}
export default AddTodoInput;
