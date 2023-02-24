import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import UserActionButton from './UserActionButton';
import { UserDocument } from '../../types';
import { useAuthContext } from '../../hooks/firebase-hooks/useAuthContext';
import { useThemeContext } from '../../hooks/view-hooks/useThemeContext';
import { useFirestore } from '../../hooks/firebase-hooks/useFirestore';
import axios from 'axios';

// Mocking dependencies
vi.mock('../../hooks/firebase-hooks/useAuthContext');
vi.mock('../../hooks/view-hooks/useThemeContext');
vi.mock('../../hooks/firebase-hooks/useFirestore');
vi.mock('axios');

const mockUseAuthContext = useAuthContext as jest.MockedFunction<typeof useAuthContext>;
const mockUseThemeContext = useThemeContext as jest.MockedFunction<typeof useThemeContext>;
const mockUseFirestore = useFirestore as jest.MockedFunction<typeof useFirestore>;
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('UserActionButton', () => {
    let mockUser: UserDocument;
    let mockFriend: UserDocument;
    let mockUpdateDocument: jest.MockedFunction<typeof mockUseFirestore.prototype.updateDocument>;

    beforeEach(() => {
        mockUser = { id: 'user1', displayName: 'User 1', friends: [], sentFriendRequests: [], receivedFriendRequests: [], location: '', photoURL: '', email: 'blabla@gmail.com' };
        mockFriend = { id: 'friend1', displayName: 'Friend 1', friends: [], sentFriendRequests: [], receivedFriendRequests: [], location: '', photoURL: '', email: 'blabla@gmail.com' };
        mockUpdateDocument = vi.fn();

        // Mocking hook implementations
        mockUseAuthContext.mockReturnValue({ user: mockUser, dispatch: vi.fn(), authIsReady: true });
        mockUseThemeContext.mockReturnValue({ theme: 'dark', toggleTheme: () => null });
        mockUseFirestore.mockReturnValue({
            updateDocument: mockUpdateDocument,
            response: { success: false, isPending: false, error: null }, deleteDocument: vi.fn(), addDocument: vi.fn()
        });
    });

    it('renders the "Add Friend" button when the friend is not in the user friends, sentFriendRequests or receivedFriendRequests', () => {
        render(<UserActionButton friend={mockFriend} />);

        const addButton = screen.getByRole('button', { name: 'Add Friend' });
        expect(addButton).toBeInTheDocument();
    });

    it('renders the "Cancel Request" button when the user sent a friend request to the friend', () => {
        mockUser.sentFriendRequests = ['friend1'];
        render(<UserActionButton friend={mockFriend} />);

        const cancelButton = screen.getByRole('button', { name: 'Cancel Request' });
        expect(cancelButton).toBeInTheDocument();
    });

    it('renders the "Accept" and "Deny" buttons when the friend sent a friend request to the user', () => {
        mockUser.receivedFriendRequests = ['friend1']
        render(<UserActionButton friend={mockFriend} />);

        const acceptButton = screen.queryByAltText(/accept request icon'/i);
        const denyButton = screen.queryByAltText(/'deny request icon'/i);
        waitFor(() => {
            expect(acceptButton).toBeInTheDocument();
            expect(denyButton).toBeInTheDocument();
        })

    });

    it('renders the "Remove Friend" button when the user and the friend are already friends', () => {
        mockUser.friends = ['friend1'];
        render(<UserActionButton friend={mockFriend} />);

        const removeButton = screen.getByRole('img', { name: 'friends icon' });
        expect(removeButton).toBeInTheDocument()
    })
})