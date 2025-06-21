"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TodoForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const [category, setCategory] = useState("work");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    setError("");
    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, priority, category }),
    });

    if (!res.ok) {
      setError("Chyba při ukládání!");
    } else {
      setName("");
      setDescription("");
      setPriority("low");
      setCategory("work");
      router.push("/");
    }
    setIsPending(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="todo-container"
      style={{ maxWidth: 420, margin: "0 auto" }}
    >
      <h2>Přidat nový úkol</h2>
      <div className="todo-form-group">
        <label className="todo-form-label" htmlFor="name">
          Název úkolu
        </label>
        <input
          id="name"
          type="text"
          name="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
          autoFocus
        />
      </div>
      <div className="todo-form-group">
        <label className="todo-form-label" htmlFor="description">
          Popis
        </label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input"
          style={{ resize: "vertical", minHeight: "70px", maxHeight: "200px" }}
        />
      </div>
      <div className="todo-form-group">
        <label className="todo-form-label" htmlFor="category">
          Category
        </label>
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input todo-form-label"
          required
        >
          <option value="work">Práce</option>
          <option value="home">Domov</option>
          <option value="hobby">Hobby</option>
          <option value="school">Škola</option>
        </select>
      </div>
      <div className="todo-form-group">
        <label className="todo-form-label" htmlFor="priority">
          Priorita
        </label>
        <select
          id="priority"
          name="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="input todo-form-label"
          required
        >
          <option value="low">Nízká</option>
          <option value="medium">Střední</option>
          <option value="high">Vysoká</option>
        </select>
      </div>
      <button type="submit" className="todo-form-btn" disabled={isPending}>
        {isPending ? "Přidávám..." : "Přidat"}
      </button>
      {error && <div style={{ color: "red", marginTop: "1em" }}>{error}</div>}
    </form>
  );
}
