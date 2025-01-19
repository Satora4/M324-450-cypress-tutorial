import { render, screen, fireEvent } from '@testing-library/react';
import TodosList from '../components/TodosList.jsx';
import '@testing-library/jest-dom';

test('should render todo items', () => {
    const todos = [
        { id: '1', title: 'First Todo', completed: false },
        { id: '2', title: 'Second Todo', completed: false },
    ];

    render(<TodosList todos={todos} />);

    expect(screen.getByText('First Todo')).toBeInTheDocument();
    expect(screen.getByText('Second Todo')).toBeInTheDocument();
});

test('should delete a todo item when delete button is clicked', () => {
    const todos = [
        { id: '1', title: 'First Todo', completed: false },
    ];
    const deleteTodoMock = jest.fn();

    render(<TodosList todos={todos} deleteTodoProps={deleteTodoMock} />);

    const deleteButton = screen.getByText('Delete'); // Assuming the button text is "Delete"
    fireEvent.click(deleteButton);

    expect(deleteTodoMock).toHaveBeenCalledWith('1'); // Checking that the deleteTodo function is called with the correct ID
});

test('should toggle completion status of a todo when clicked', () => {
    const todos = [
        { id: '1', title: 'First Todo', completed: false },
    ];
    const handleChangeMock = jest.fn();

    render(<TodosList todos={todos} handleChangeProps={handleChangeMock} />);

    const todoItem = screen.getByText('First Todo');
    fireEvent.click(todoItem);

    expect(handleChangeMock).toHaveBeenCalledWith('1'); // Ensure the change handler is called
});
