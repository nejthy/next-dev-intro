"use client"; // Tato komponenta běží na klientovi (potřebujeme interaktivitu)

import React from "react";
import { useRouter, useSearchParams } from "next/navigation"; // hooky z Next.js pro práci s URL

// Statický seznam možných kategorií
const OPTIONS = [
  { value: "work", label: "work" },
  { value: "home", label: "home" },
  { value: "hobby", label: "hobby" },
  { value: "school", label: "school" },
];

// Komponenta pro výběr kategorií
export const TodosCategoryFilter = () => {
  const router = useRouter(); // umožní měnit URL bez reloadu stránky
  const searchParams = useSearchParams(); // aktuální parametry v URL

  // Z URL načteme všechny zvolené kategorie – např. ["work", "home"]
  const selected = searchParams.getAll("category");

  // Funkce, která se spustí po kliknutí na tlačítko (změní výběr kategorie)
  const toggle = (val: string) => {
    // Převod URL parametru do editovatelné formy
    const params = new URLSearchParams(searchParams.toString());

    // Zjistíme, jestli uživatel danou kategorii vybral
    const isSelected = selected.includes(val);

    // Nový seznam kategorií po kliknutí – buď odebereme, nebo přidáme
    const newCategories = isSelected
      ? selected.filter((c) => c !== val) // když už je vybraná → odeber
      : [...selected, val]; // jinak přidej do seznamu

    // Nejdřív smažeme všechny "category" parametry z URL
    params.delete("category");

    // A pak je přidáme znovu podle nového výběru
    for (const cat of newCategories) {
      params.append("category", cat);
    }

    // Nahradíme URL pomocí routeru – neudělá reload, ale URL se změní
    router.replace(`?${params.toString()}`);
  };

  // Vykreslení jednotlivých tlačítek pro každou kategorii
  return (
    <div className="flex flex-wrap gap-2">
      {OPTIONS.map((opt) => {
        // Je tato kategorie momentálně vybraná?
        const isActive = selected.includes(opt.value);

        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => toggle(opt.value)} // kliknutí → přepne výběr
            aria-pressed={isActive} // pro přístupnost – říká, že je aktivní
            className={`chip ${isActive ? "chip--active" : "chip--inactive"}`} // vizuální styl
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};
