"use client";

import { useState, useTransition, useEffect } from "react";
import { Todo } from "@prisma/client";
import { TodoItem } from "./todo-item";
import { TodosFilter } from "./todos-filter";
import { TodosCategoryFilter } from "./todos-filter-category";
import { useRouter, useSearchParams } from "next/navigation";

export const TodosSection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const textFilter = searchParams.get("text") || "";
  const categoryFilter = searchParams.getAll("category");

  const [todos, setTodos] = useState<Todo[]>([]);
  const [isPending, startTransition] = useTransition();

  const updateUrl = (text: string, categories: string[]) => {
    const params = new URLSearchParams();
    if (text) params.set("text", text);
    for (const cat of categories) {
      params.append("category", cat);
    }

    router.replace(`?${params.toString()}`);
  };

  const handleTextChange = (text: string) => {
    startTransition(() => {
      updateUrl(text, categoryFilter);
    });
  };
  const handleCategoryChange = (categories: string[]) => {
    startTransition(() => {
      updateUrl(textFilter, categories);
    });
  };

  const handleFilterClick = () => {
    startTransition(async () => {
      const res = await fetch("/api/todos/filter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: textFilter,
          categories: categoryFilter,
        }),
      });
      const data = await res.json();
      setTodos(data);
    });
  };

  const grouped = todos.reduce<Record<string, Todo[]>>((acc, todo) => {
    const cat = todo.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(todo);
    return acc;
  }, {});

  return (
    <main className="p-4 max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row sm:gap-4">
        <TodosFilter filter={textFilter} setFilter={handleTextChange} />
        <TodosCategoryFilter
          selected={categoryFilter}
          onChange={handleCategoryChange}
        />
      </div>

      {isPending && (
        <p className="text-sm text-gray-500 mt-2">Načítám úkoly...</p>
      )}

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

        {todos.length === 0 && !isPending && (
          <p className="text-gray-500 mt-2">
            Žádné úkoly neodpovídají zvolenému filtru.
          </p>
        )}
      </div>
    </main>
  );
};
