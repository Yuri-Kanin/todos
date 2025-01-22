import React, { useState } from "react";
import uniqid from "uniqid";
import Footer from "../components/Footer/Footer.tsx";
import Header from "../components/Header/Header.tsx";
import TodoList from "../components/TodoList/TodoList.tsx";
import { Filter, TypeTodos } from "../types/TodosTypes.ts";

function App() {
  const [todos, setTodos] = useState<TypeTodos>([]);

  const [filter, setFilter] = useState<Filter>("All");

  const todosFiltered = todos.filter(task => {
    switch (filter) {
      case "Completed":
        return task.isCompleted;
      case "Active":
        return !task.isCompleted;
      default:
        return task;
    }
  });

  const onSubmitInput = (task: string): void => {
    setTodos(prevState => [
      ...prevState,
      { id: uniqid(), isCompleted: false, task: task },
    ]);
  };

  const onCheckboxChange = (id: string): void => {
    const index = todos.findIndex(task => task.id === id);
    const newTodos = [...todos];
    const task = newTodos[index];
    task.isCompleted = !task.isCompleted;
    setTodos(newTodos);
  };

  const onFilterChange = (switcher: string): void => {
    setFilter(switcher as Filter);
  };

  const onClearCompleted = () => {
    setTodos(prevState => prevState.filter(task => !task.isCompleted));
  };

  return (
    <section className="todoapp">
      <Header onSubmitInput={onSubmitInput} />
      <TodoList todos={todosFiltered} onCheckboxChange={onCheckboxChange} />
      <Footer
        filter={filter}
        todos={todos}
        onFilterChange={onFilterChange}
        onClearCompleted={onClearCompleted}
      />
    </section>
  );
}

export default App;
