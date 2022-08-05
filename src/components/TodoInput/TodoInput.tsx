import { TodoInputProps } from '../../types/todoInput';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';

import { updateFormData } from '../../features/todos/todoSlice';

import styles from './TodoInput.module.css';

function TodoInput({ placeholder, propName }: TodoInputProps) {
  const dispatch = useAppDispatch();
  const todoFormState = useAppSelector((state) => state.todoReducer.todoForm);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    propName === 'todoTitle'
      ? dispatch(
          updateFormData({ body: todoFormState.body, title: e.target.value })
        )
      : dispatch(
          updateFormData({ title: todoFormState.title, body: e.target.value })
        );
  };
  return (
    <input
      className={styles['form-input']}
      type='text'
      placeholder={placeholder}
      onChange={onChange}
      value={
        propName === 'todoTitle' ? todoFormState.title : todoFormState.body
      }
    ></input>
  );
}
export default TodoInput;
