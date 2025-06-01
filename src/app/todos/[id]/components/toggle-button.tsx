"use client";
import { toggleTodo } from "@/actions/todo-actions";
import { Todo } from "@prisma/client";
import { useTransition } from "react";

interface Props {
  todo: Todo;
}
export const ToggleButton = ({ todo }: Props) => {
  const [pending, startTransition] = useTransition();

  function handleToggle() {
    startTransition(async () => {
      await toggleTodo(todo.id);
    });
  }

  return (
    <button
      onClick={handleToggle}
      disabled={pending}
      className="complete-button"
    >
      {todo.completed ? "Undo" : "Complete"}
      {pending && <span>...</span>}
    </button>
  );
};
