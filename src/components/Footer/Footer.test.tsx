import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { ITask } from "../../types/TodosTypes";
import Footer from "./Footer";

describe("Footer component", () => {
  const mockOnFilterChange = jest.fn();
  const mockOnClearCompleted = jest.fn();

  const renderFooter = (filter: string, todos: ITask[]) => {
    render(
      <Footer
        filter={filter}
        todos={todos}
        onFilterChange={mockOnFilterChange}
        onClearCompleted={mockOnClearCompleted}
      />
    );
  };

  test("displays the correct count of items left", () => {
    const todos: ITask[] = [
      { id: "id1", task: "Task 1", isCompleted: false },
      { id: "id2", task: "Task 2", isCompleted: true },
      { id: "id3", task: "Task 3", isCompleted: false },
    ];

    renderFooter("All", todos);

    expect(screen.getByText("2 items left")).toBeInTheDocument();
  });

  test("renders filter buttons correctly", () => {
    const todos: ITask[] = [];

    renderFooter("All", todos);

    const allButton = screen.getByText("All");
    const activeButton = screen.getByText("Active");
    const completedButton = screen.getByText("Completed");

    expect(allButton).toHaveClass("selected");
    expect(activeButton).not.toHaveClass("selected");
    expect(completedButton).not.toHaveClass("selected");
  });

  test("calls onFilterChange when a filter button is clicked", () => {
    const todos: ITask[] = [];

    renderFooter("All", todos);

    fireEvent.click(screen.getByText("Active"));

    expect(mockOnFilterChange).toHaveBeenCalledWith("Active");
  });

  test("calls onClearCompleted when the clear button is clicked", () => {
    const todos: ITask[] = [];

    renderFooter("All", todos);

    fireEvent.click(screen.getByText("Clear completed"));

    expect(mockOnClearCompleted).toHaveBeenCalled();
  });
});
