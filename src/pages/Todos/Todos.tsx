import { useEffect } from 'react';
import { TodoI } from '../../features/types';

import { useFetchAllTodosQuery } from '../../services/todos';

import { Outlet, useNavigate } from 'react-router-dom';

import styles from './Todos.module.css';

import TodoForm from '../../components/TodoForm/TodoForm';
import TodoCard from '../../components/TodoCard/TodoCard';
import Spinner from '../../layout/Spinner';

function Todos() {
  const { data, isLoading } = useFetchAllTodosQuery();

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) navigate('/login');
  }, [navigate]);

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <Outlet></Outlet>
      <TodoForm />
      <section className={styles['todo-list-container']}>
        {data && data.length ? (
          data.map((el: TodoI, i: number) => (
            <TodoCard isSelected={false} key={i} todo={el} />
          ))
        ) : (
          <div className={styles['no-todos-text']}>
            {!data && 'There are no Todos yet! Please add your first Todo.'}
          </div>
        )}
      </section>
    </>
  );
}
export default Todos;
