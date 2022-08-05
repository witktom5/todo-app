import TodoCard from '../../components/TodoCard/TodoCard';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TodoI } from '../../features/types';

import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';

import styles from './ViewTodo.module.css';
import { setEditedTodo } from '../../features/todos/todoSlice';
import { todoApi } from '../../services/todos';

function ViewTodo() {
  const todos = todoApi.endpoints.fetchAllTodos.useQueryState();
  const dispatch = useAppDispatch();
  const todoState = useAppSelector((state) => state.todoReducer);
  const { todoId } = useParams();
  const [todo, setTodo] = useState<TodoI | null | undefined>(null);

  // If no Todo data (for example on refresh page)
  useEffect(() => {
    if (todos.data) {
      setTodo(todos.data.find((el: TodoI) => el.id === todoId));
      window.scrollTo(0, 0); // scroll to the top of the page
    }
    if (todoState.editedTodo !== todo) {
      dispatch(setEditedTodo(null));
    }
  }, [todoState.editedTodo, todoId, todo, dispatch, todos.data]);

  return (
    <>
      <div className={styles['link-container']}>
        <Link className={styles.link} to='/todos'>
          {/*arrow sign*/}&#129044; Go back
        </Link>
      </div>
      <h3 className={styles.header}>Selected todo</h3>
      <div className={styles['todo-container']}>
        {todo ? <TodoCard isSelected={true} todo={todo} /> : <></>}
      </div>
    </>
  );
}
export default ViewTodo;
