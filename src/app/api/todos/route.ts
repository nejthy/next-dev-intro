import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, description, priority, category } = await req.json();

  if (!name || !priority || !category) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const todo = await prisma.todo.create({
    data: { name, description, priority, category },
  });

  return NextResponse.json(todo, { status: 201 });
}
