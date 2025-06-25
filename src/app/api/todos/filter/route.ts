import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { text, categories } = await req.json();

  const todos = await prisma.todo.findMany({
    where: {
      name: {
        contains: text,
      },
      category: categories.length > 0 ? { in: categories } : undefined,
    },
  });

  return NextResponse.json(todos);
}
