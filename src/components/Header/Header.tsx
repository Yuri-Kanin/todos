import React, { useState } from "react";

function Header({ onSubmitInput }) {
  const [input, setInput] = useState("");

  const onInputChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInput(event.target.value);
  };

  const handleKeyDown = (event: {
    key: string;
    preventDefault: () => void;
  }) => {
    if (event.key === "Enter" && input) {
      event.preventDefault();
      onSubmitInput(input);
      setInput("");
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={input}
        onChange={onInputChange}
        onKeyDown={handleKeyDown}
      />
    </header>
  );
}

export default Header;
