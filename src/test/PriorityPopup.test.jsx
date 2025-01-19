import { render, screen, fireEvent } from '@testing-library/react';
import PriorityPopup from '../components/PriorityPopup.jsx';
import '@testing-library/jest-dom';

test('should render the PriorityPopup with the correct options', () => {
    render(<PriorityPopup addTodoItem={() => {}} closePopup={() => {}} />);

    const prioritySelect = screen.getByLabelText('Priority'); // Assuming there's a label for the priority select
    expect(prioritySelect).toBeInTheDocument();

    fireEvent.change(prioritySelect, { target: { value: 'HIGH' } });
    expect(prioritySelect.value).toBe('HIGH');
})

test('should call addTodoItem when priority is selected', () => {
    const addTodoItemMock = jest.fn();

    render(<PriorityPopup addTodoItem={addTodoItemMock} closePopup={() => {}} />);

    const prioritySelect = screen.getByLabelText('Priority');
    fireEvent.change(prioritySelect, { target: { value: 'HIGH' } });

    const addButton = screen.getByText('Add Todo'); // Adjust as per the actual button text
    fireEvent.click(addButton);

    expect(addTodoItemMock).toHaveBeenCalledWith('HIGH', '-', undefined); // Assuming the mock parameters match your implementation
});
