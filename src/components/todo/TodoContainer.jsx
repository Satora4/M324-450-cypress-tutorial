import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Header from "../Header";
import InputTodo from "../InputTodo";
import TodosList from "./TodosList";
import PriorityPopup from "../PriorityPopup";
import styles from "./TodoContainer.module.css";

const TodoContainer = () => {
    const getInitialTodos = () => {
        const temp = localStorage.getItem("todos");
        const savedTodos = JSON.parse(temp);
        return savedTodos || [];
    };

    const [todos, setTodos] = useState(getInitialTodos());
    const [showPopup, setShowPopup] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [filter, setFilter] = useState("NO_FILTER");

    const handleChange = (id) => {
        setTodos((prevState) =>
            prevState.map((todo) => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        completed: !todo.completed,
                    };
                }
                return todo;
            })
        );
    };

    const delTodo = (id) => {
        setTodos([...todos.filter((todo) => todo.id !== id)]);
    };

    const addTodoItem = (prio) => {
        const newTodo = {
            id: uuidv4(),
            title: newTaskTitle,
            completed: false,
            prio,
            cat: "-"
        };
        setTodos((prevTodos) => [...prevTodos, newTodo].sort(sortByPriority));
        setNewTaskTitle("");
    };

    const setTitle = (updatedTitle, id) => {
        setTodos(
            todos.map((todo) => {
                if (todo.id === id) {
                    todo.title = updatedTitle;
                }
                return todo;
            })
        );
    };

    const setPrio = (updatedPrio, id) => {
        setTodos(
            todos.map((todo) => {
                if (todo.id === id) {
                    todo.prio = updatedPrio;
                }
                return todo;
            }).sort(sortByPriority)
        );
    };

    const setCategory = (updatedCat, id) => {
        setTodos(
            todos.map((todo) => {
                if (todo.id === id) {
                    todo.cat = updatedCat;
                }
                return todo;
            }).sort(sortByPriority)
        );
    };

    const handleFilterChange = (e) => {
        const updatedFilter = e.target.value;
        setFilter(updatedFilter); // Zustand korrekt aktualisieren
    };

    const filterByCategory = (prio) => {
        if (prio === "NO_FILTER") {
            return todos;
        } else {
            return todos.filter(todo => todo.cat === prio);
        }
    }

    const sortByPriority = (a, b) => {
        const priorityOrder = { HIGH: 1, MEDIUM: 2, LOW: 3 };
        return priorityOrder[a.prio] - priorityOrder[b.prio];
    };

    useEffect(() => {
        const temp = JSON.stringify(todos);
        localStorage.setItem("todos", temp);
    }, [todos]);

    return (
        <div className={styles.inner}>
            <Header />
            <InputTodo
                setNewTaskTitle={setNewTaskTitle}
                openPopup={() => setShowPopup(true)}
            />
            {showPopup && (
                <PriorityPopup
                    addTodoItem={addTodoItem}
                    closePopup={() => setShowPopup(false)}
                />
            )}
            <select value={filter} onChange={handleFilterChange}>
                <option value="NO_FILTER">Alle Kategorien</option>
                <option value="-">Keine Kategorie</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
            </select>
            <TodosList
                todos={filterByCategory(filter)}
                handleChangeProps={handleChange}
                deleteTodoProps={delTodo}
                setTitle={setTitle}
                setPrio={setPrio}
                setCategory={setCategory}
            />
        </div>
    );
};

export default TodoContainer;
