import { render/* , screen */ } from '@testing-library/react';
import App from './App';

// TODO
// Note: after error related to 'canvas' I added `yarn add canvas`, and the this test is executing very long!
// TODO

test('renders main container', () => {
  const { container } = render(<App />);
  const el = container.querySelector('.react-experiments');
  expect(el).toBeInTheDocument();
});
