"use client";

import { Todo } from "@prisma/client";
import { TodoItem } from "./todo-item";
import { TodosFilter } from "./todos-filter";
import { useState } from "react";

type Props = {
  todos: Todo[];
};

export const TodosSection = ({ todos }: Props) => {
  const [filter, setFilter] = useState<string>("");
  const filteredTodos = todos.filter((todo) =>
    todo.name.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <main className="p-4 max-w-md mx-auto">
      <TodosFilter filter={filter} setFilter={setFilter} />
      <div className="todo-container mt-4">
        {filteredTodos.length > 0 ? (
          <ul>
            {filteredTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-2">Žádné úkoly neodpovídají filtru.</p>
        )}
      </div>
    </main>
  );
};
