import React from 'react';
import { screen, render } from '@testing-library/react';
import { AdminPage } from './Admin';
import { withQueryClient } from '@src/utils/__mocks__/withQueryClient';
import { withMemoryRouter } from '@src/utils/__mocks__/withMemoryRouter';
import api from '@src/utils/api';

jest.mock('@src/utils/api');

describe('Admin', () => {
  (api.get as jest.Mock).mockImplementation(() => undefined);
  it('should render correctly', () => {
    render(withQueryClient(withMemoryRouter(<AdminPage />)));

    expect(screen.getByText(/establishment/i)).toBeInTheDocument();
  });
});