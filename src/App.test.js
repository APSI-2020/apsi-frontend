import React from 'react';

import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { store } from './store';

let mock = () => {};
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: mock, // deprecated
      removeListener: mock, // deprecated
      addEventListener: mock,
      removeEventListener: mock,
      dispatchEvent: mock,
    };
  },
});

test('renders learn react link', () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>,
  );
  const linkElement = screen.getByText(/Zaloguj/i);
  expect(linkElement).toBeInTheDocument();
});
