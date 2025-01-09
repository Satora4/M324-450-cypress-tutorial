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
    const [sortPrio, setSortPrio] = useState(false);
    const [sortDate, setSortDate] = useState(false);

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

    const addTodoItem = (prio,cat, dueDate) => {
        const newTodo = {
            id: uuidv4(),
            title: newTaskTitle,
            completed: false,
            prio,
            cat,
            dueDate
        };
        if (sortPrio) {
            setTodos((prevTodos) => [...prevTodos, newTodo].sort(sortByPriority));
        } else if (sortDate) {
            setTodos((prevTodos) => [...prevTodos, newTodo].sort(sortByDate));
        } else {
            setTodos((prevTodos) => [...prevTodos, newTodo]);
        }
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
            })
        );
    };

    const setCategory = (updatedCat, id) => {
        setTodos(
            todos.map((todo) => {
                if (todo.id === id) {
                    todo.cat = updatedCat;
                }
                return todo;
            })
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

    const sortByDate = (a, b) => {
        return new Date(a.dueDate) - new Date(b.dueDate);
    };

    useEffect(() => {
        const temp = JSON.stringify(todos);
        localStorage.setItem("todos", temp);
    }, [todos]);

    const setDueDate = (updatedDate, id) => {
        setTodos(
            todos.map((todo) => {
                if (todo.id === id) {
                    todo.dueDate = updatedDate;
                }
                return todo;
            })
        );
    };

    const getFilteredAndSortedTodos = () => {
        if (sortPrio) {
            return filterByCategory(filter).sort(sortByPriority);
        } else if (sortDate) {
            return filterByCategory(filter).sort(sortByDate);
        } else {
            return filterByCategory(filter);
        }
    }

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
            <div>
                Sortieren nach:
                <button
                    onClick={() => {
                        setSortPrio((prevSortPrio) => {
                            setSortDate(false);
                            console.log("Priority: " + !prevSortPrio);
                            return !prevSortPrio;
                        });
                    }}
                    className={sortPrio ? styles.buttonActive : styles.buttonInactive}
                >
                    Priorität
                </button>
                <button
                    onClick={() => {
                        setSortDate((prevSortDate) => {
                            setSortPrio(false);
                            console.log("Date: " + !prevSortDate);
                            return !prevSortDate;
                        });
                    }}
                    className={sortDate ? styles.buttonActive : styles.buttonInactive}
                >
                    Datum
                </button>

                <select value={filter} onChange={handleFilterChange} style={{float: "right"}}>
                    <option value="NO_FILTER">Alle Kategorien</option>
                    <option value="-">Keine Kategorie</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                </select>
            </div>
            <TodosList
                todos={getFilteredAndSortedTodos()}
                handleChangeProps={handleChange}
                deleteTodoProps={delTodo}
                setTitle={setTitle}
                setPrio={setPrio}
                setCategory={setCategory}
                setDueDate={setDueDate}
            />
        </div>
    );
};

export default TodoContainer;
