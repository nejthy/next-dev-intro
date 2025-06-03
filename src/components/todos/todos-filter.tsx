"use client";
import { FC } from "react";

type TodosFilterProps = {
  filter: string;
  setFilter: (value: string) => void;
};

export const TodosFilter: FC<TodosFilterProps> = ({ filter, setFilter }) => {
  return (
    <div className="mt-4">
      <input
        type="text"
        placeholder="Filtrovat podle názvu..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border px-2 py-1 rounded w-full"
      />
    </div>
  );
};
