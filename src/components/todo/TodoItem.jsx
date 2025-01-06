/* eslint react/prop-types: 0 */
import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import styles from "./TodoItem.module.css";

const TodoItem = (props) => {
  const priority = {
    LOW: "Tief",
    MEDIUM: "Mittel",
    HIGH: "Hoch",
  };
  const [editing, setEditing] = useState(false);
  const { completed, id, title, prio } = props.todo;
  const editMode = {};
  const viewMode = {};

  const handleEditing = () => {
    setEditing(true);
  };

  const handleUpdatedDone = (event) => {
    if (event.key === "Enter") {
      setEditing(false);
    }
  };

  const completedStyle = {
    fontStyle: "italic",
    color: "#595959",
    opacity: 0.4,
    textDecoration: "line-through",
  };

  if (editing) {
    viewMode.display = "none";
  } else {
    editMode.display = "none";
  }

  useEffect(
    () => () => {
      console.log("Cleaning up...");
    },
    []
  );

  return (
      <li className={styles.item} data-type="todo-item">
        <div onDoubleClick={handleEditing} style={viewMode}>
          <input
              type="checkbox"
              className={styles.checkbox}
              checked={completed}
              onChange={() => props.handleChangeProps(id)}
              name="checkbox"
          />
          <button
              data-set="delete-todo-btn"
              onClick={() => props.deleteTodoProps(id)}
          >
            <FaTrash style={{color: "orangered", fontSize: "16px"}}/>
          </button>
          <span style={completed ? completedStyle : null}>{title}</span>
          <span style={completed ? completedStyle : null}>{prio}</span>
        </div>
        <input
            type="text"
            style={editMode}
            className={styles.textInput}
            value={title}
            onChange={(e) => {
              props.setTitle(e.target.value, id);
            }}
            onKeyDown={handleUpdatedDone}
        />
        <select
            style={editMode}
            value={prio}
            onChange={(e) => props.setPrio(e.target.value, id)}
        >
          <option value="HIGH">Hoch</option>
          <option value="MEDIUM">Mittel</option>
          <option value="LOW">Tief</option>
        </select>

      </li>
  );
};

export default TodoItem;
