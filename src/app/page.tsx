import { Header } from "@/components/header";
import { TodosSection } from "@/components/todos/todos-section";
import prisma from "@/lib/prisma";
import Link from "next/link";

const fetchTodos = async () => {
  return await prisma.todo.findMany({
    orderBy: {
      category: "asc",
    },
  });
};

export default async function Home() {
  const todos = await fetchTodos();

  return (
    <>
      <Header title="My Todo List" subtitle="Add your tasks" />
      <Link href="/new-todo" className="add-todo-btn">
        Přidat nový úkol
      </Link>

      <TodosSection todos={todos} />
      <footer>
        <p>Add your todos</p>
      </footer>
    </>
  );
}
