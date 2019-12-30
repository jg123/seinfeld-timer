import React from 'react';
import { render } from '@testing-library/react';
import Quote from './Quote';

test('renders learn react link', () => {
  const { getByText } = render(<Quote />);
  const headerText = getByText(/Quote/i);
  expect(headerText).toBeInTheDocument();
});
