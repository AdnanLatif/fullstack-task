import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import Sidebar from '../components/Sidebar';
import { MemoryRouter } from 'react-router-dom';
import * as useUserHook from '../hooks/UserProvider';

// Mock window.matchMedia for Ant Design components (Sider)
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated but may still be called
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

// Mock the useUser hook
jest.mock('../hooks/UserProvider');

describe('Sidebar', () => {
  it('fetches and displays user details', async () => {
    const mockUser = {
      id: 1,
      name: 'Allie Simon',
      username: 'allie',
      email: 'allie@example.com',
      avatar: '/assets/avatars/user1.png',
    };

    (useUserHook.useUser as jest.Mock).mockReturnValue({
      user: mockUser,
      loading: false,
    });

    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>,
    );

    await waitFor(() => {
      // Flexible text matcher for name (in case it is split)
      expect(
        screen.getByText((content) => content.includes('Allie Simon')),
      ).toBeInTheDocument();

      // Avatar image src check
      const avatar = screen.getByAltText('User avatar');
      expect(avatar).toHaveAttribute('src', mockUser.avatar);
    });
  });

  it('shows loading text when user is loading', () => {
    (useUserHook.useUser as jest.Mock).mockReturnValue({
      user: null,
      loading: true,
    });

    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>,
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
