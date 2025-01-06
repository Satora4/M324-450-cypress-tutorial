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
            <TodosList
                todos={todos}
                handleChangeProps={handleChange}
                deleteTodoProps={delTodo}
                setTitle={setTitle}
                setPrio={setPrio}
            />
        </div>
    );
};

export default TodoContainer;
