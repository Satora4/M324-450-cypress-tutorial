/* eslint react/prop-types: 0 */
import TodoItem from "./TodoItem";

const TodosList = (props) => (
    <ul data-set="todo-list">
      {props.todos.map((todo) => (
          <TodoItem
              key={todo.id}
              todo={todo}
              handleChangeProps={props.handleChangeProps}
              deleteTodoProps={props.deleteTodoProps}
              setTitle={props.setTitle}
              setPrio={props.setPrio}
              setCategory={props.setCategory}
              setDueDate={props.setDueDate} // Hinzugefügt
          />
      ))}
    </ul>
);
export default TodosList;
