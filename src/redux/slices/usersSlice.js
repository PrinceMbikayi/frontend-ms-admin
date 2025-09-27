import { createSlice } from '@reduxjs/toolkit';

// Mock users data
const mockUsers = [
  {
    id: 1,
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@email.com',
    phone: '+33 6 12 34 56 78',
    userType: 'professional',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    createdAt: '2024-01-15T10:30:00Z',
    lastLogin: '2024-01-20T14:22:00Z',
    location: 'Paris, France',
    specialties: ['Football', 'Basketball'],
    verified: true,
    totalMissions: 15,
    rating: 4.8,
  },
  {
    id: 2,
    firstName: 'Marie',
    lastName: 'Martin',
    email: 'marie.martin@email.com',
    phone: '+33 6 98 76 54 32',
    userType: 'organization',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    createdAt: '2024-01-10T09:15:00Z',
    lastLogin: '2024-01-19T16:45:00Z',
    location: 'Lyon, France',
    organizationName: 'Club Sportif Lyon',
    verified: true,
    totalMissions: 8,
    rating: 4.6,
  },
  {
    id: 3,
    firstName: 'Pierre',
    lastName: 'Durand',
    email: 'pierre.durand@email.com',
    phone: '+33 6 11 22 33 44',
    userType: 'professional',
    status: 'pending',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    createdAt: '2024-01-18T11:20:00Z',
    lastLogin: '2024-01-18T11:20:00Z',
    location: 'Marseille, France',
    specialties: ['Tennis', 'Natation'],
    verified: false,
    totalMissions: 0,
    rating: 0,
  },
  {
    id: 4,
    firstName: 'Sophie',
    lastName: 'Bernard',
    email: 'sophie.bernard@email.com',
    phone: '+33 6 55 44 33 22',
    userType: 'organization',
    status: 'suspended',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    createdAt: '2024-01-05T14:30:00Z',
    lastLogin: '2024-01-15T10:15:00Z',
    location: 'Toulouse, France',
    organizationName: 'Association Sportive Toulouse',
    verified: true,
    totalMissions: 3,
    rating: 3.2,
  },
  {
    id: 5,
    firstName: 'Thomas',
    lastName: 'Petit',
    email: 'thomas.petit@email.com',
    phone: '+33 6 77 88 99 00',
    userType: 'professional',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    createdAt: '2024-01-12T16:45:00Z',
    lastLogin: '2024-01-20T09:30:00Z',
    location: 'Nice, France',
    specialties: ['Volleyball', 'Handball'],
    verified: true,
    totalMissions: 22,
    rating: 4.9,
  },
];

const initialState = {
  users: mockUsers,
  filteredUsers: mockUsers,
  selectedUser: null,
  loading: false,
  error: null,
  filters: {
    search: '',
    userType: 'all',
    status: 'all',
    verified: 'all',
  },
  pagination: {
    page: 0,
    rowsPerPage: 10,
    total: mockUsers.length,
  },
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
      state.filteredUsers = action.payload;
      state.pagination.total = action.payload.length;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    updateUser: (state, action) => {
      const { id, updates } = action.payload;
      const userIndex = state.users.findIndex(user => user.id === id);
      if (userIndex !== -1) {
        state.users[userIndex] = { ...state.users[userIndex], ...updates };
        state.filteredUsers = state.users;
      }
    },
    deleteUser: (state, action) => {
      const userId = action.payload;
      state.users = state.users.filter(user => user.id !== userId);
      state.filteredUsers = state.users;
      state.pagination.total = state.users.length;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      
      // Apply filters
      let filtered = state.users;
      
      if (state.filters.search) {
        const searchTerm = state.filters.search.toLowerCase();
        filtered = filtered.filter(user => 
          user.firstName.toLowerCase().includes(searchTerm) ||
          user.lastName.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm)
        );
      }
      
      if (state.filters.userType !== 'all') {
        filtered = filtered.filter(user => user.userType === state.filters.userType);
      }
      
      if (state.filters.status !== 'all') {
        filtered = filtered.filter(user => user.status === state.filters.status);
      }
      
      if (state.filters.verified !== 'all') {
        const isVerified = state.filters.verified === 'verified';
        filtered = filtered.filter(user => user.verified === isVerified);
      }
      
      state.filteredUsers = filtered;
      state.pagination.total = filtered.length;
      state.pagination.page = 0; // Reset to first page
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        search: '',
        userType: 'all',
        status: 'all',
        verified: 'all',
      };
      state.filteredUsers = state.users;
      state.pagination.total = state.users.length;
      state.pagination.page = 0;
    },
  },
});

export const {
  setLoading,
  setError,
  setUsers,
  setSelectedUser,
  updateUser,
  deleteUser,
  setFilters,
  setPagination,
  clearFilters,
} = usersSlice.actions;

// Async actions
export const fetchUsers = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    dispatch(setUsers(mockUsers));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateUserStatus = (userId, status) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    dispatch(updateUser({ id: userId, updates: { status } }));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const verifyUser = (userId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    dispatch(updateUser({ id: userId, updates: { verified: true } }));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export default usersSlice.reducer;