import { Header } from "@/components/header";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { HomeButton } from "../components/home-button";
import { ToggleButton } from "../components/toggle-button";
import { DeleteButton } from "../components/delete-button";

async function getTodo(id: number) {
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
  const queryParams = params;
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
            Priority:{" "}
            <span className={`priority-${todo.priority}`}>{todo.priority}</span>
          </div>
          <div className="todo-detail-status">
            Category:{" "}
            <span className={`category-${todo.category}`}>{todo.category}</span>
          </div>

          {todo.description && (
            <div className="todo-detail-description">
              <p>{todo.description}</p>
            </div>
          )}
        </div>

        <div className="todo-detail-actions">
          <HomeButton />
          <ToggleButton todo={todo} />
          <DeleteButton todo={todo} />
        </div>
      </div>
    </>
  );
};

export default TodoDetailPage;
