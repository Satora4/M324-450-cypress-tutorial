import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import PropTypes from "prop-types";

const InputTodo = ({ setNewTaskTitle, openPopup }) => {
  const [inputText, setInputText] = useState("");

  const onChange = (e) => {
    setInputText(e.target.value);
    setNewTaskTitle(e.target.value); // Setze den neuen Titel
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      openPopup(); // Öffnet das Popup zur Prioritätsauswahl
      setInputText(""); // Leere das Eingabefeld
    } else {
      alert("Bitte einen Aufgabentitel eingeben");
    }
  };

  return (
      <form
          data-set="todo-form"
          onSubmit={handleSubmit}
          className="form-container"
      >
        <input
            type="text"
            className="input-text"
            placeholder="Add Task..."
            value={inputText}
            name="title"
            onChange={onChange}
        />
        <button data-set="add-todo-btn" className="input-submit">
          <FaPlusCircle />
        </button>
      </form>
  );
};

// PropTypes-Validierung
InputTodo.propTypes = {
  setNewTaskTitle: PropTypes.func.isRequired,
  openPopup: PropTypes.func.isRequired,
};

export default InputTodo;
