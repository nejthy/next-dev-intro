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

  const filtered = todos.filter((todo) =>
    todo.name.toLowerCase().includes(filter.toLowerCase())
  );

  const grouped = filtered.reduce<Record<string, Todo[]>>((acc, todo) => {
    const cat = todo.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(todo);
    return acc;
  }, {});

  return (
    <main className="p-4 max-w-md mx-auto">
      <TodosFilter filter={filter} setFilter={setFilter} />

      <div className="mt-4 space-y-8">
        {Object.entries(grouped).map(([category, items]) => (
          <section key={category}>
            <h3 className="text-xl font-semibold mb-2 capitalize">
              {category}
            </h3>
            <ul className="todo-container">
              {items.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </ul>
          </section>
        ))}

        {filtered.length === 0 && (
          <p className="text-gray-500 mt-2">Žádné úkoly neodpovídají filtru.</p>
        )}
      </div>
    </main>
  );
};
