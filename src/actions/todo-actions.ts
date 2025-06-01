"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createTodo(formData: FormData) {
  const todoName = formData.get("todo-text") as string;
  const newTodo = {
    name: todoName,
  };

  await prisma.todo.create({
    data: newTodo,
  });

  revalidatePath("/");
}

export async function toggleTodo(id: number) {
  if (!id) {
    throw new Error("Todo ID is required");
  }

  const todo = await prisma.todo.findUnique({
    where: {
      id,
    },
  });

  if (!todo) {
    throw new Error("Todo not found!");
  }

  await prisma.todo.update({
    where: {
      id,
    },
    data: {
      completed: !todo.completed,
    },
  });
  revalidatePath("/");
  revalidatePath(`/todos/${id}`);
}

export async function deleteTodo(id: number) {
  if (!id) {
    throw new Error("Todo ID is required");
  }
  const todo = await prisma.todo.findUnique({
    where: {
      id,
    },
  });
  if (!todo) {
    throw new Error("Todo not found!");
  }
  await prisma.todo.delete({
    where: {
      id,
    },
  });

  revalidatePath("/");
}