"use client";

import { deleteTodo, toggleTodo } from "@/actions/todo-actions";
import { Todo } from "@prisma/client";
import { useRouter } from "next/navigation";

type TodoItemProps = {
  todo: Todo;
};
export const TodoItem = ({ todo }: TodoItemProps) => {
  const router = useRouter();

  const handleDeleteTodo = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteTodo(todo.id);
  };

  const handleToggleTodo = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleTodo(todo.id);
  };

  const handleGoToDetail = () => {
    router.push(`/todos/${todo.id}`);
  };

  return (
    <li
      className={`flex justify-between items-center border rounded p-2 ${
        todo.completed ? "completed" : ""
      } cursor-pointer`}
      onClick={handleGoToDetail}
    >
      <span>{todo.name}</span>
      <button onClick={handleDeleteTodo}>Delete</button>
      <button onClick={handleToggleTodo} className="toggle">
        {todo.completed ? "Undo" : "Completed"}
      </button>
    </li>
  );
};
