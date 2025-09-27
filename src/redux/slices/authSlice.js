import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  clearError,
} = authSlice.actions;

// Mock login function
export const loginAdmin = (credentials) => async (dispatch) => {
  dispatch(loginStart());
  
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock admin credentials
    const { email, password } = credentials;
    
    if (email === 'admin@missionsport.com' && password === '123456') {
      const adminUser = {
        id: 1,
        email: 'admin@missionsport.com',
        firstName: 'Admin',
        lastName: 'Mission Sport',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        permissions: ['all'],
        lastLogin: new Date().toISOString(),
      };
      
      // Store in localStorage for persistence
      localStorage.setItem('adminToken', 'mock-admin-token');
      localStorage.setItem('adminUser', JSON.stringify(adminUser));
      
      dispatch(loginSuccess(adminUser));
    } else {
      throw new Error('Identifiants invalides');
    }
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

// Check if user is already logged in
export const checkAuthStatus = () => (dispatch) => {
  const token = localStorage.getItem('adminToken');
  const user = localStorage.getItem('adminUser');
  
  if (token && user) {
    try {
      const parsedUser = JSON.parse(user);
      dispatch(loginSuccess(parsedUser));
    } catch (error) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
    }
  }
};

// Logout function
export const logoutAdmin = () => (dispatch) => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminUser');
  dispatch(logout());
};

export default authSlice.reducer;