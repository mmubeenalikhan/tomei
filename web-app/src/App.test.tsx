import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './redux-store';
import App from './App';

test('renders the signup wizard', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const heading = screen.getByText('CREATE YOUR ACCOUNT');
  expect(heading).toBeInTheDocument();
});
