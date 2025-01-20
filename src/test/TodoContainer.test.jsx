import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TodoContainer from '../components/todo/TodoContainer.jsx';
import '@testing-library/jest-dom';
import { v4 as uuidv4 } from 'uuid';

// Mocking localStorage to avoid actual storage writes
beforeEach(() => {
    Storage.prototype.getItem = jest.fn(() => JSON.stringify([])); // Empty todo list
    Storage.prototype.setItem = jest.fn();
});

test('should add a new todo item and show it in the list', async () => {
    render(<TodoContainer />);

    // Verify initial state (should not have any todo items initially)
    const todoList = screen.getByTestId('todo-list');
    expect(todoList).toBeEmpty();

    // Simulate input for adding a new todo
    const input = screen.getByPlaceholderText('Enter task title'); // Assuming the placeholder text for title input
    fireEvent.change(input, { target: { value: 'New Todo' } });

    // Open the priority popup and choose a priority
    const addButton = screen.getByText('Add Todo'); // Assuming you have a button that triggers popup
    fireEvent.click(addButton);

    const priorityButton = screen.getByText('Priority'); // Assuming a priority button
    fireEvent.click(priorityButton);

    // Simulate the addTodoItem function
    await waitFor(() => {
        const newTodo = screen.getByText('New Todo');
        expect(newTodo).toBeInTheDocument(); // Assert that the new todo appears in the list
    });

    // Verify that the new todo item is added to localStorage
    expect(localStorage.setItem).toHaveBeenCalledWith(
        'todos',
        expect.any(String) // Expect the new todos list to be saved in localStorage
    );
});

test('should filter todos based on category', async () => {
    // Mock data for testing
    const todos = [
        { id: uuidv4(), title: 'Todo 1', cat: 'A' },
        { id: uuidv4(), title: 'Todo 2', cat: 'B' },
        { id: uuidv4(), title: 'Todo 3', cat: 'A' },
    ];

    // Mock the initial todos state to contain some todos
    Storage.prototype.getItem = jest.fn(() => JSON.stringify(todos));

    render(<TodoContainer />);

    // Set category filter to 'A'
    const filterSelect = screen.getByRole('combobox');
    fireEvent.change(filterSelect, { target: { value: 'A' } });

    await waitFor(() => {
        // Verify that only todos with category 'A' are displayed
        expect(screen.getByText('Todo 1')).toBeInTheDocument();
        expect(screen.getByText('Todo 3')).toBeInTheDocument();
        expect(screen.queryByText('Todo 2')).toBeNull();
    });
});

test('should sort todos by priority', async () => {
    const todos = [
        { id: uuidv4(), title: 'Low Priority Todo', prio: 'LOW' },
        { id: uuidv4(), title: 'High Priority Todo', prio: 'HIGH' },
        { id: uuidv4(), title: 'Medium Priority Todo', prio: 'MEDIUM' },
    ];

    // Mock initial todos state
    Storage.prototype.getItem = jest.fn(() => JSON.stringify(todos));

    render(<TodoContainer />);

    // Click the "Sort by Priority" button
    const sortButton = screen.getByText('Priorität');
    fireEvent.click(sortButton);

    await waitFor(() => {
        const todoListItems = screen.getAllByTestId('todo-item'); // Assuming each todo item has this test ID
        const [firstTodo, secondTodo, thirdTodo] = todoListItems.map(item => item.textContent);

        // Check that todos are sorted by priority (High -> Medium -> Low)
        expect(firstTodo).toBe('High Priority Todo');
        expect(secondTodo).toBe('Medium Priority Todo');
        expect(thirdTodo).toBe('Low Priority Todo');
    });
});
