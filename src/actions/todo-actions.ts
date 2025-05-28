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
