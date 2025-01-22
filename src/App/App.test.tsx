import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import App from "./App";

describe("App Component", () => {
  test("renders header, todo list and footer", () => {
    render(<App />);

    const headerElement = screen.getByPlaceholderText(
      /What needs to be done?/i
    );
    expect(headerElement).toBeInTheDocument();

    const footerElement = screen.getByText(/All/i);
    expect(footerElement).toBeInTheDocument();
  });

  test("allows user to add a new todo", () => {
    render(<App />);

    const inputElement = screen.getByPlaceholderText(/What needs to be done?/i);
    fireEvent.change(inputElement, { target: { value: "New Task" } });
    fireEvent.keyDown(inputElement, {
      key: "Enter",
      preventDefault: jest.fn(),
    });

    const todoItem = screen.getByText(/New Task/i);
    expect(todoItem).toBeInTheDocument();
  });

  test("allows user to toggle todo completion status", () => {
    render(<App />);

    const inputElement = screen.getByPlaceholderText(/What needs to be done?/i);
    fireEvent.change(inputElement, { target: { value: "New Task" } });
    fireEvent.keyDown(inputElement, {
      key: "Enter",
      preventDefault: jest.fn(),
    });

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  test("filters todos by active and completed status", () => {
    render(<App />);

    const inputElement = screen.getByPlaceholderText(/What needs to be done?/i);
    fireEvent.change(inputElement, { target: { value: "Task 1" } });
    fireEvent.keyDown(inputElement, {
      key: "Enter",
      preventDefault: jest.fn(),
    });

    fireEvent.change(inputElement, { target: { value: "Task 2" } });
    fireEvent.keyDown(inputElement, {
      key: "Enter",
      preventDefault: jest.fn(),
    });

    const checkbox1 = screen.getAllByRole("checkbox")[0];
    fireEvent.click(checkbox1);

    const filterCompletedButton = screen.getByText("Completed");
    fireEvent.click(filterCompletedButton);

    expect(screen.getByText(/Task 1/i)).toBeInTheDocument();
    expect(screen.queryByText(/Task 2/i)).not.toBeInTheDocument();
  });

  test("clears completed todos", () => {
    render(<App />);

    const inputElement = screen.getByPlaceholderText(/What needs to be done?/i);
    fireEvent.change(inputElement, { target: { value: "Task to be cleared" } });
    fireEvent.keyDown(inputElement, {
      key: "Enter",
      preventDefault: jest.fn(),
    });

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    const clearCompletedButton = screen.getByText(/Clear completed/i);
    fireEvent.click(clearCompletedButton);

    expect(screen.queryByText(/Task to be cleared/i)).not.toBeInTheDocument();
  });
});
