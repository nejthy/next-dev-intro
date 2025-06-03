import { createTodo } from "@/actions/todo-actions";

export const TodoForm = () => (
  <form
    action={createTodo}
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
        placeholder="Název"
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
        placeholder="Popis úkolu"
        className="input"
        style={{ resize: "vertical", minHeight: "70px", maxHeight: "200px" }}
      />
    </div>
    <div className="todo-form-group">
      <label className="todo-form-label" htmlFor="priority">
        Priorita
      </label>
      <select
        id="priority"
        name="priority"
        className="input todo-form-priority"
        defaultValue="low"
        required
      >
        <option value="low">Nízká</option>
        <option value="medium">Střední</option>
        <option value="high">Vysoká</option>
      </select>
    </div>

    <button type="submit" className="todo-form-btn">
      Přidat
    </button>
  </form>
);
