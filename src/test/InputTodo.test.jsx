import { render, screen, fireEvent } from '@testing-library/react';
import InputTodo from '../components/InputTodo.jsx';
import '@testing-library/jest-dom';

test('should update input value when typing', () => {
    render(<InputTodo setNewTaskTitle={() => {}} openPopup={() => {}} />);

    const input = screen.getByPlaceholderText('Enter task title'); // Adjust placeholder as needed
    fireEvent.change(input, { target: { value: 'New Task' } });

    expect(input.value).toBe('New Task');
});

test('should open popup when add button is clicked', () => {
    render(<InputTodo setNewTaskTitle={() => {}} openPopup={() => {}} />);

    const addButton = screen.getByText('Add Todo'); // Adjust text as needed
    fireEvent.click(addButton);

    // Ensure the popup is triggered (this is assuming the `openPopup` function triggers some visual change)
    // You may need to test that the popup actually appears based on your component's behavior
    const popup = screen.getByText('Priority'); // Adjust this based on your popup content
    expect(popup).toBeInTheDocument();
});
