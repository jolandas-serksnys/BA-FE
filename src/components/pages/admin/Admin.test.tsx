import React from 'react';
import { screen, render } from '@testing-library/react';
import { AdminPage as Component } from './Admin';
import { withQueryClient } from '@src/utils/__mocks__/withQueryClient';
import { withMemoryRouter } from '@src/utils/__mocks__/withMemoryRouter';
import api from '@src/utils/api';

jest.mock('@src/utils/api');

describe('Admin', () => {
  (api.get as jest.Mock).mockImplementation(() => undefined);
  it('should render correctly', () => {
    render(withQueryClient(withMemoryRouter(<Component />)));
  });

  it('should render establishment section', () => {
    render(withQueryClient(withMemoryRouter(<Component />)));

    expect(screen.getByText(/establishment/i)).toBeInTheDocument();
  });

  it('should render tables section', () => {
    render(withQueryClient(withMemoryRouter(<Component />)));

    expect(screen.getByText(/tables/i)).toBeInTheDocument();
  });

  it('should render employees section', () => {
    render(withQueryClient(withMemoryRouter(<Component />)));

    expect(screen.getByText(/employees/i)).toBeInTheDocument();
  });

  it('should render dish categories section', () => {
    render(withQueryClient(withMemoryRouter(<Component />)));

    expect(screen.getByText(/dish categories/i)).toBeInTheDocument();
  });
});