import { TodoI } from '../features/types';
export type TodoCardProps = {
  todo: TodoI;
  isSelected: boolean;
};

export type ViewTodoProps = {
  todo: TodoI;
};
