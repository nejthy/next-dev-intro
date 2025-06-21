import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  await prisma.todo.delete({
    where: { id },
  });

  return NextResponse.json({ ok: true });
}


export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id =  Number(params.id);

  const todo = await prisma.todo.findUnique({ where: { id } });
  if (!todo) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.todo.update({
    where: { id },
    data: { completed: !todo.completed },
  });

  return NextResponse.json({ ok: true });
}
