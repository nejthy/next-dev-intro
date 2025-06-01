import { Header } from "@/components/header";
import prisma from "@/lib/prisma";
import { ToggleButton } from "./components/toggle-button";
import { HomeButton } from "./components/home-button";
import { Metadata } from "next";

async function getTodo(id: number) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return await prisma.todo.findUnique({
    where: {
      id: id,
    },
  });
}

export const metadata: Metadata = {
  title: "...",
  description: "...",
};

const TodoDetailPage = async ({ params }: { params: { id: string } }) => {
  // Simulating fetching a todo item based on the ID from params
  const queryParams = await params;
  const todo = await getTodo(Number(queryParams.id));

  if (!todo) {
    return <div>Not found</div>;
  }

  return (
    <>
      <Header title="Todo Detail" subtitle="Here is detail of todo" />
      <div className="todo-detail">
        <div className="todo-detail-card">
          <h2>{todo.name}</h2>
          <div className="todo-detail-status">
            Status:{" "}
            <span className={todo.completed ? "completed" : "active"}>
              {todo.completed ? "Completed" : "Active"}
            </span>
          </div>
          <div className="todo-detail-status">
            Priority: <span className={"completed"}>{todo.priority}</span>
          </div>

          {todo.description && (
            <div className="todo-detail-description">
              <p>{todo.description}</p>
            </div>
          )}
        </div>

        <div>
          <HomeButton />
          <ToggleButton todo={todo} />
        </div>
      </div>
    </>
  );
};

export default TodoDetailPage;
