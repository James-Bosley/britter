import { render, screen } from '@testing-library/react';
import UserApp from './UserApp';

test('renders without errors', () => {
  render(<UserApp />);
  const linkElement = screen.getByText(/britter/i);
  expect(linkElement).toBeInTheDocument();
});
