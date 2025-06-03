"use server";

import prisma from "@/lib/prisma";
import { Priority } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export async function createTodo(formData: FormData) {
  const todoName = formData.get("name") as string;
  const description = formData.get("description") as string;
  const priority = formData.get("priority") as Priority;

  const newTodo = {
    name: todoName,
    description: description,
    priority: priority
  };

  await prisma.todo.create({
    data: newTodo,
  });

  revalidatePath("/");
  redirect("/");

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