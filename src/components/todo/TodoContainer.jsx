import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Header from "../Header";
import InputTodo from "../InputTodo";
import TodosList from "./TodosList";
import styles from "./TodoContainer.module.css";

const TodoContainer = () => {
  const getInitialTodos = () => {
    // getting stored items
    const temp = localStorage.getItem("todos");
    const savedTodos = JSON.parse(temp);
    return savedTodos || [];
  };

  const [todos, setTodos] = useState(getInitialTodos());

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

  const addTodoItem = (title) => {
    const newTodo = {
      id: uuidv4(),
      title,
      completed: false,
    };
    setTodos([...todos, newTodo]);
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

  // componentDidUpdate
  useEffect(() => {
    // storing todos items
    const temp = JSON.stringify(todos);
    localStorage.setItem("todos", temp);
  }, [todos]);

  return (
    <div className={styles.inner}>
      <Header />
      <InputTodo addTodoProps={addTodoItem} />
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
