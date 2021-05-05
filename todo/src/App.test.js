import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders Todos in App', () => {
  render(<App />);
  const linkElement = screen.getByText(/Todos/i);
  expect(linkElement).toBeInTheDocument();
});
