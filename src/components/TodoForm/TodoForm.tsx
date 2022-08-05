import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import { TodoI } from '../../features/types';

import Spinner from '../../layout/Spinner';

import { updateFormData } from '../../features/todos/todoSlice';

import {
  useAddTodoMutation,
  useUpdateTodoMutation,
} from '../../services/todos';

import TodoInput from '../TodoInput/TodoInput';
import styles from './TodoForm.module.css';

function TodoForm() {
  const [addTodo, addTodoResult] = useAddTodoMutation();
  const [updateTodo, updateTodoResult] = useUpdateTodoMutation();

  const dispatch = useAppDispatch();
  const todoState = useAppSelector((state) => state.todoReducer);
  const params = useParams();

  const config = [
    {
      placeholder: 'Enter Todo title',
      propName: 'todoTitle',
    },
    {
      placeholder: 'Enter Todo text',
      propName: 'todoText',
    },
  ];

  // ADD TODO

  const onSubmitAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTodo: TodoI = {
      ...todoState.todoForm,
      isComplete: false,
      createDate: new Date(Date.now()),
    };
    // dispatch(addTodo(newTodo));
    addTodo(newTodo);
    dispatch(updateFormData({ title: '', body: '' }));
  };

  //  EDIT TODO

  const onSubmitEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateTodo({
      ...todoState.editedTodo!,
      title: todoState.todoForm.title,
      body: todoState.todoForm.body,
    });
  };

  // don't show form until edit btn if it's an todos/:id route
  return addTodoResult.isLoading || updateTodoResult.isLoading ? (
    <Spinner />
  ) : !params.todoId || todoState.editedTodo ? (
    <section className={styles['add-todo-container']}>
      <form
        className={styles['add-todo-form']}
        onSubmit={todoState.editedTodo ? onSubmitEdit : onSubmitAdd}
      >
        {config.map((el, i) => (
          <TodoInput
            key={i}
            placeholder={el.placeholder}
            propName={el.propName}
          />
        ))}
        <button type='submit' className={styles['btn-add']}>
          {todoState.editedTodo ? 'Save Todo' : 'Create Todo'}
        </button>
      </form>
    </section>
  ) : (
    <></>
  );
}
export default TodoForm;
