"use client";

import { DeleteButton } from "@/app/todos/components/delete-button";
import { ToggleButton } from "@/app/todos/components/toggle-button";
import { Todo } from "@prisma/client";
import { useRouter } from "next/navigation";

type TodoItemProps = {
  todo: Todo;
};
export const TodoItem = ({ todo }: TodoItemProps) => {
  const router = useRouter();

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
      <DeleteButton todo={todo} />
      <ToggleButton todo={todo} />
    </li>
  );
};
