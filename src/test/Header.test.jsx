import { render, screen } from '@testing-library/react';
import Header from '../components/Header.jsx';
import '@testing-library/jest-dom';

test('should render the header with the correct title', () => {
    render(<Header />);

    const title = screen.getByText(/Todo App/i); // Adjust the text as per the actual title in your Header component
    expect(title).toBeInTheDocument();
});
