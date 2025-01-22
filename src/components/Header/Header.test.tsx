import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import Header from "./Header";

describe("Header Component", () => {
  test("renders the header with title", () => {
    render(<Header onSubmitInput={() => {}} />);
    const titleElement = screen.getByText(/todos/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("allows user to type in input field", () => {
    render(<Header onSubmitInput={() => {}} />);

    const inputElement = screen.getByPlaceholderText(
      /What needs to be done?/i
    ) as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: "New Task" } });

    expect(inputElement.value).toBe("New Task");
  });

  test("calls onSubmitInput with the correct value when Enter is pressed", () => {
    const mockOnSubmitInput = jest.fn();
    render(<Header onSubmitInput={mockOnSubmitInput} />);

    const inputElement = screen.getByPlaceholderText(
      /What needs to be done?/i
    ) as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: "New Task" } });

    fireEvent.keyDown(inputElement, {
      key: "Enter",
      preventDefault: jest.fn(),
    });

    expect(mockOnSubmitInput).toHaveBeenCalledWith("New Task");
    expect(inputElement.value).toBe(""); // Проверяем, что поле ввода очищается
  });

  test("does not call onSubmitInput when Enter is pressed and input is empty", () => {
    const mockOnSubmitInput = jest.fn();
    render(<Header onSubmitInput={mockOnSubmitInput} />);

    const inputElement = screen.getByPlaceholderText(
      /What needs to be done?/i
    ) as HTMLInputElement;

    fireEvent.keyDown(inputElement, {
      key: "Enter",
      preventDefault: jest.fn(),
    });

    expect(mockOnSubmitInput).not.toHaveBeenCalled();
  });
});
