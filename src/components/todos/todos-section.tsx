"use client";

import { Todo } from "@prisma/client";
import { TodoItem } from "./todo-item";
import { TodosFilter } from "./todos-filter";
import { TodosCategoryFilter } from "./todos-filter-category";
import { useState } from "react";

type Props = {
  todos: Todo[];
};

export const TodosSection = ({ todos }: Props) => {
  const [textFilter, setTextFilter] = useState<string>("");

  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);

  const filtered = todos.filter((todo) => {
    const matchesText = todo.name
      .toLowerCase()
      .includes(textFilter.toLowerCase());

    const matchesCat =
      categoryFilter.length === 0 || categoryFilter.includes(todo.category);

    return matchesText && matchesCat;
  });

  const grouped = filtered.reduce<Record<string, Todo[]>>((acc, todo) => {
    const cat = todo.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(todo);
    return acc;
  }, {});

  return (
    <main className="p-4 max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row sm:gap-4">
        {/* textový filtr */}
        <TodosFilter filter={textFilter} setFilter={setTextFilter} />

        {/* multi‐checkbox filtr kategorií */}
        <TodosCategoryFilter
          selected={categoryFilter}
          onChange={setCategoryFilter}
        />
      </div>

      <div className="mt-4 space-y-8">
        {Object.entries(grouped).map(([cat, items]) => (
          <section key={cat}>
            <h3 className="text-xl font-semibold mb-2 capitalize">{cat}</h3>
            <ul className="todo-container">
              {items.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </ul>
          </section>
        ))}

        {filtered.length === 0 && (
          <p className="text-gray-500 mt-2">
            Žádné úkoly neodpovídají zvolenému filtru.
          </p>
        )}
      </div>
    </main>
  );
};
