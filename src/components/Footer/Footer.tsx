import React from "react";
import { ITask } from "../../types/TodosTypes";

function Footer({ filter, todos, onFilterChange, onClearCompleted }) {
  const taskLeftCount = todos.filter((task: ITask) => !task.isCompleted).length;

  const filters = ["All", "Active", "Completed"];

  const getFilterButtons = (array: string[]) => {
    return array.map(switcher => {
      if (filter === switcher) {
        return (
          <li key={switcher}>
            <button className="selected">{switcher}</button>
          </li>
        );
      } else {
        return (
          <li key={switcher}>
            <button onClick={_ => onFilterChange(switcher)}>{switcher}</button>
          </li>
        );
      }
    });
  };

  return (
    <footer className="footer">
      <span className="todo-count">
        {taskLeftCount > 1
          ? `${taskLeftCount} items left`
          : `${taskLeftCount} item left`}
      </span>
      <ul className="filters">{getFilterButtons(filters)}</ul>
      <button className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

export default Footer;
