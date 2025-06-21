"use client";

import React from "react";

type Props = {
  selected: string[];
  onChange: (cats: string[]) => void;
};

const OPTIONS = [
  { value: "work", label: "work" },
  { value: "home", label: "home" },
  { value: "hobby", label: "hobby" },
  { value: "school", label: "school" },
];

export const TodosCategoryFilter = ({ selected, onChange }: Props) => {
  const toggle = (val: string) => {
    if (selected.includes(val)) {
      onChange(selected.filter((c) => c !== val));
    } else {
      onChange([...selected, val]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {OPTIONS.map((opt) => {
        const isActive = selected.includes(opt.value);
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => toggle(opt.value)}
            aria-pressed={isActive}
            className={`chip ${isActive ? "chip--active" : "chip--inactive"}`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};
