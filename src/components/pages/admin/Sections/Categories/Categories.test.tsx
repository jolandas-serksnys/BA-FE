import React from 'react';
import { screen, render, waitFor } from '@testing-library/react';
import { Categories as Component } from './Categories';
import { withQueryClient } from '@src/utils/__mocks__/withQueryClient';
import { withMemoryRouter } from '@src/utils/__mocks__/withMemoryRouter';
import api from '@src/utils/api';

jest.mock('@src/utils/api');

describe('Admin', () => {
  const mockData = [
    {
      establishmentId: 1,
      title: 'category 1',
      description: 'description 1',
      isVisible: true,
    },
    {
      establishmentId: 1,
      title: 'category 2',
      description: 'description 2',
      isVisible: false,
    }
  ];

  it('should render correctly', () => {
    render(withQueryClient(withMemoryRouter(<Component />)));

    expect(screen.getByText(/title/i)).toBeInTheDocument();
    expect(screen.getByText(/description/i)).toBeInTheDocument();
    expect(screen.getByText(/actions/i)).toBeInTheDocument();
    expect(screen.getByText(/add new/i)).toBeInTheDocument();
    expect(screen.getByText(/no data available/i)).toBeInTheDocument();
  });

  it('should render call api', async () => {
    (api.get as jest.Mock).mockImplementation(() => ({}));
    render(withQueryClient(withMemoryRouter(<Component />)));

    await waitFor(() => {
      expect(api.get).toBeCalledWith('/establishment/undefined/category');
    });
  });

  it('should render mock data', async () => {
    (api.get as jest.Mock).mockImplementation(() => mockData);
    render(withQueryClient(withMemoryRouter(<Component />)));

    await waitFor(() => {
      expect(screen.getByText(mockData[0].title)).toBeInTheDocument();
      expect(screen.getByText(mockData[1].title)).toBeInTheDocument();
    });
  });
});