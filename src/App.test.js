import { render, screen } from '@testing-library/react';
import App from './App';

test('Sin Token', () => {
  render(<App />);
  const signInForm = screen.getByText('Please sign in');
  expect(signInForm).toBeInTheDocument();

});
