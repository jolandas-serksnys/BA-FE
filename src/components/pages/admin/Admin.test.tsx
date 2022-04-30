import React from 'react';
import { screen, render } from '@testing-library/react';
import { AdminPage } from './Admin';

describe('Admin', () => {
  it('should render correctly', () => {
    render(<AdminPage />);

    expect(screen.getByText(/establishment/i)).toBeInTheDocument();
  });
});