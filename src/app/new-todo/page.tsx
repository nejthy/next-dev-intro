// app/todos/new/page.jsx
import TodoForm from "@/components/todos/todo-form";
import Link from "next/link";

export default function TodoNewPage() {
  return (
    <main>
      <Link href="/" className="todo-back-link">
        <span className="arrow">←</span>
        Zpět na seznam úkolů
      </Link>
      <TodoForm />
    </main>
  );
}
