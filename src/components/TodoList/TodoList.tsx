import React from "react";
import { TypeTodos } from "../../types/TodosTypes";

function TodoList({ todos, onCheckboxChange }) {
  const getList = (array: TypeTodos) => {
    return array.map(({ id, isCompleted, task }) => {
      return (
        <li className={isCompleted ? "completed" : ""} key={id}>
          <div className="view">
            <input
              data-testid={id}
              className="toggle"
              type="checkbox"
              checked={isCompleted}
              onChange={_ => onCheckboxChange(id)}
            />
            <label>
              <span className="description">{task}</span>
            </label>
          </div>
        </li>
      );
    });
  };

  return (
    <section className="main">
      <ul className="todo-list">{getList(todos)}</ul>
    </section>
  );
}

export default TodoList;
