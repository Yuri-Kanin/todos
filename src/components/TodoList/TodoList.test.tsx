/* eslint-disable testing-library/no-node-access */
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { TypeTodos } from "../../types/TodosTypes";
import TodoList from "./TodoList";

describe("TodoList component", () => {
  const mockOnToggleChange = jest.fn();

  const renderTodoList = (todos: TypeTodos) => {
    render(<TodoList todos={todos} onCheckboxChange={mockOnToggleChange} />);
  };

  test("renders the todo list correctly", () => {
    const todos: TypeTodos = [
      { id: "id1", task: "Task 1", isCompleted: false },
      { id: "id2", task: "Task 2", isCompleted: true },
      { id: "id3", task: "Task 3", isCompleted: false },
    ];

    renderTodoList(todos);

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
    expect(screen.getByText("Task 3")).toBeInTheDocument();

    expect(screen.getByText("Task 1").closest("li")).not.toHaveClass(
      "completed"
    );
    expect(screen.getByText("Task 2").closest("li")).toHaveClass("completed");
    expect(screen.getByText("Task 3").closest("li")).not.toHaveClass(
      "completed"
    );
  });

  test("calls onToggleChange when a checkbox is clicked", () => {
    const todos: TypeTodos = [
      { id: "id1", task: "Task 1", isCompleted: false },
      { id: "id2", task: "Task 2", isCompleted: true },
    ];

    renderTodoList(todos);

    fireEvent.click(screen.getByTestId("id1"));

    expect(mockOnToggleChange).toHaveBeenCalledWith("id1");
  });

  test("checkboxes reflect the correct state", () => {
    const todos: TypeTodos = [
      { id: "id1", task: "Task 1", isCompleted: false },
      { id: "id2", task: "Task 2", isCompleted: true },
    ];

    renderTodoList(todos);

    expect(screen.getByTestId("id1")).not.toBeChecked();
    expect(screen.getByTestId("id2")).toBeChecked();
  });
});
