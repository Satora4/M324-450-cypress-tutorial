/* eslint react/prop-types: 0 */
import {useEffect, useState} from "react";
import {FaCheck, FaTrash} from "react-icons/fa";
import styles from "./TodoItem.module.css";

const TodoItem = (props) => {
    const [editing, setEditing] = useState(false);
    const {completed, id, title, prio, cat, dueDate} = props.todo;
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

    const handleUpdatedConfirm = () => {
        setEditing(false);
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
                <span style={completed ? completedStyle : null}>{cat}</span>
                <span style={completed ? completedStyle : null}>
                    Fällig am: {dueDate ? new Date(dueDate).toLocaleDateString() : "Kein Datum"}
                </span>
            </div>
            <div style={editMode} onKeyDown={handleUpdatedDone}>
                <input
                    type="text"
                    className={styles.textInput}
                    value={title}
                    onChange={(e) => {
                        props.setTitle(e.target.value, id);
                    }}

                />
                <select
                    value={prio}
                    onChange={(e) => props.setPrio(e.target.value, id)}
                >
                    <option value="HIGH">Hoch</option>
                    <option value="MEDIUM">Mittel</option>
                    <option value="LOW">Tief</option>
                </select>
                <select
                    value={cat}
                    onChange={(e) => props.setCategory(e.target.value, id)}
                >
                    <option value="-">Keine Kategorie</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                </select>
                <input
                    type="date"
                    value={dueDate || ""}
                    onChange={(e) => props.setDueDate(e.target.value, id)}
                />
                <button
                    data-set="check-todo-btn"
                    onClick={handleUpdatedConfirm}
                >
                    <FaCheck style={{color: "green", fontSize: "16px"}}/>
                </button>
            </div>
        </li>
    );
};

export default TodoItem;
