import PropTypes from "prop-types";
import styles from "./PriorityPopup.module.css";
import {useState} from "react";

const PriorityPopup = ({ addTodoItem, closePopup }) => {
    const [prio, setPrio] = useState("MEDIUM");
    const [cat, setCat] = useState("-");
    const [dueDate, setDueDate] = useState("");

    const handleAddTodo = () => {
        if (dueDate.trim() === "") {
            setDueDate("Kein Fälligkeitsdatum");
        }
        addTodoItem(prio,cat, dueDate);
        closePopup();
    };

    return (
        <div className={styles.popup}>
            <h3>Wähle die Priorität und das Fälligkeitsdatum aus:</h3>
            <div>
                <label>Priorität:</label>
                <select
                    value={prio}
                    onChange={(e) => setPrio(e.target.value)}
                >
                    <option value="HIGH">Hoch</option>
                    <option value="MEDIUM">Mittel</option>
                    <option value="LOW">Tief</option>
                </select>
            </div>
            <div>
                <label>Kategorie:</label>
                <select
                    value={cat}
                    onChange={(e) => setCat(e.target.value)}
                >
                    <option value="-">Keine Kategorie</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                </select>
            </div>
            <div>
                <label>Fälligkeitsdatum:</label>
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
            </div>
            <button onClick={handleAddTodo} className={styles.addButton}>
                Hinzufügen
            </button>
            <button onClick={closePopup} className={styles.closeButton}>
                Abbrechen
            </button>
        </div>
    );
};

// PropTypes-Validierung
PriorityPopup.propTypes = {
    addTodoItem: PropTypes.func.isRequired,
    closePopup: PropTypes.func.isRequired,
};

export default PriorityPopup;
