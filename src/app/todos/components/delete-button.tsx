"use client";

import { Todo } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

interface Props {
  todo: Todo;
}

export const DeleteButton = ({ todo }: Props) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    startTransition(async () => {
      await fetch(`/api/todos/${todo.id}`, { method: "DELETE" });
      router.push("/");
    });
  };

  return (
    <button onClick={handleDelete} disabled={pending} className="delete-button">
      Delete
      {pending && <span className="ml-2">…</span>}
    </button>
  );
};
