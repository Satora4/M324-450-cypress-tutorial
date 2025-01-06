import PropTypes from "prop-types";
import styles from "./PriorityPopup.module.css";

const PriorityPopup = ({ addTodoItem, closePopup }) => {
    const handleSelectPrio = (prio) => {
        addTodoItem(prio);
        closePopup();
    };

    return (
        <div className={styles.popup}>
            <h3>Wähle die Priorität:</h3>
            <button onClick={() => handleSelectPrio("HIGH")}>Hoch</button>
            <button onClick={() => handleSelectPrio("MEDIUM")}>Mittel</button>
            <button onClick={() => handleSelectPrio("LOW")}>Tief</button>
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
