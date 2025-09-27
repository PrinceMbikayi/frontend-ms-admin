import { createSlice } from '@reduxjs/toolkit';

// Mock statistics data
const mockStats = {
  overview: {
    totalUsers: 1247,
    totalMissions: 89,
    totalRevenue: 15420,
    conversionRate: 3.2,
    growthRates: {
      users: 12.5,
      missions: 8.3,
      revenue: 15.7,
      conversion: -2.1,
    },
  },
  userStats: {
    byType: {
      professional: 756,
      organization: 491,
    },
    byStatus: {
      active: 1089,
      pending: 98,
      suspended: 60,
    },
    registrationTrend: [
      { month: 'Jan', users: 89 },
      { month: 'Fév', users: 124 },
      { month: 'Mar', users: 156 },
      { month: 'Avr', users: 178 },
      { month: 'Mai', users: 203 },
      { month: 'Jun', users: 189 },
      { month: 'Jul', users: 234 },
      { month: 'Aoû', users: 267 },
      { month: 'Sep', users: 298 },
      { month: 'Oct', users: 321 },
      { month: 'Nov', users: 356 },
      { month: 'Déc', users: 389 },
    ],
  },
  missionStats: {
    bySport: {
      'Football': 23,
      'Tennis': 18,
      'Basketball': 15,
      'Natation': 12,
      'Yoga': 10,
      'Volleyball': 8,
      'Autres': 3,
    },
    byCategory: {
      'Cours': 45,
      'Match': 28,
      'Tournoi': 12,
      'Bien-être': 4,
    },
    byStatus: {
      published: 67,
      pending: 15,
      archived: 7,
    },
    participationTrend: [
      { month: 'Jan', participants: 456 },
      { month: 'Fév', participants: 523 },
      { month: 'Mar', participants: 612 },
      { month: 'Avr', participants: 689 },
      { month: 'Mai', participants: 734 },
      { month: 'Jun', participants: 798 },
      { month: 'Jul', participants: 856 },
      { month: 'Aoû', participants: 923 },
      { month: 'Sep', participants: 1012 },
      { month: 'Oct', participants: 1089 },
      { month: 'Nov', participants: 1156 },
      { month: 'Déc', participants: 1234 },
    ],
  },
  revenueStats: {
    monthly: [
      { month: 'Jan', revenue: 890 },
      { month: 'Fév', revenue: 1240 },
      { month: 'Mar', revenue: 1560 },
      { month: 'Avr', revenue: 1780 },
      { month: 'Mai', revenue: 2030 },
      { month: 'Jun', revenue: 1890 },
      { month: 'Jul', revenue: 2340 },
      { month: 'Aoû', revenue: 2670 },
      { month: 'Sep', revenue: 2980 },
      { month: 'Oct', revenue: 3210 },
      { month: 'Nov', revenue: 3560 },
      { month: 'Déc', revenue: 3890 },
    ],
    byPaymentMethod: {
      'Carte bancaire': 12450,
      'PayPal': 2340,
      'Virement': 630,
    },
    averageOrderValue: 17.3,
    totalTransactions: 891,
  },
  topMissions: [
    {
      id: 1,
      title: 'Cours de Tennis pour Débutants',
      participants: 45,
      revenue: 1125,
      rating: 4.8,
      organizer: 'Marie Martin',
    },
    {
      id: 3,
      title: 'Séance de Yoga en Plein Air',
      participants: 38,
      revenue: 570,
      rating: 4.9,
      organizer: 'Thomas Petit',
    },
    {
      id: 2,
      title: 'Match de Football Amateur',
      participants: 32,
      revenue: 320,
      rating: 4.5,
      organizer: 'Jean Dupont',
    },
    {
      id: 4,
      title: 'Tournoi de Basketball 3x3',
      participants: 24,
      revenue: 480,
      rating: 4.6,
      organizer: 'Pierre Durand',
    },
  ],
  recentUsers: [
    {
      id: 3,
      name: 'Pierre Durand',
      email: 'pierre.durand@email.com',
      type: 'professional',
      joinedAt: '2024-01-18T11:20:00Z',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    },
    {
      id: 6,
      name: 'Claire Moreau',
      email: 'claire.moreau@email.com',
      type: 'organization',
      joinedAt: '2024-01-17T15:30:00Z',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    },
    {
      id: 7,
      name: 'Lucas Dubois',
      email: 'lucas.dubois@email.com',
      type: 'professional',
      joinedAt: '2024-01-16T09:45:00Z',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    },
  ],
  activityFeed: [
    {
      id: 1,
      type: 'user_registration',
      message: 'Pierre Durand s\'est inscrit',
      timestamp: '2024-01-18T11:20:00Z',
      user: {
        name: 'Pierre Durand',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      },
    },
    {
      id: 2,
      type: 'mission_created',
      message: 'Nouvelle mission "Tournoi de Basketball 3x3" créée',
      timestamp: '2024-01-17T16:30:00Z',
      mission: {
        title: 'Tournoi de Basketball 3x3',
        organizer: 'Pierre Durand',
      },
    },
    {
      id: 3,
      type: 'payment_received',
      message: 'Paiement de 25€ reçu pour "Cours de Tennis"',
      timestamp: '2024-01-17T14:15:00Z',
      amount: 25,
    },
    {
      id: 4,
      type: 'mission_completed',
      message: 'Mission "Séance de Yoga" terminée avec succès',
      timestamp: '2024-01-17T10:30:00Z',
      mission: {
        title: 'Séance de Yoga en Plein Air',
        participants: 15,
      },
    },
  ],
};

const initialState = {
  stats: mockStats,
  loading: false,
  error: null,
  dateRange: {
    start: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0],
  },
  refreshing: false,
};

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setRefreshing: (state, action) => {
      state.refreshing = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setStats: (state, action) => {
      state.stats = action.payload;
    },
    updateOverviewStats: (state, action) => {
      state.stats.overview = { ...state.stats.overview, ...action.payload };
    },
    setDateRange: (state, action) => {
      state.dateRange = action.payload;
    },
    addActivityFeedItem: (state, action) => {
      state.stats.activityFeed.unshift(action.payload);
      // Keep only the last 20 items
      if (state.stats.activityFeed.length > 20) {
        state.stats.activityFeed = state.stats.activityFeed.slice(0, 20);
      }
    },
    updateRecentUsers: (state, action) => {
      state.stats.recentUsers = action.payload;
    },
    updateTopMissions: (state, action) => {
      state.stats.topMissions = action.payload;
    },
  },
});

export const {
  setLoading,
  setRefreshing,
  setError,
  setStats,
  updateOverviewStats,
  setDateRange,
  addActivityFeedItem,
  updateRecentUsers,
  updateTopMissions,
} = statsSlice.actions;

// Async actions
export const fetchStats = (dateRange = null) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // If dateRange is provided, update it
    if (dateRange) {
      dispatch(setDateRange(dateRange));
    }
    
    // In a real app, you would filter the stats based on the date range
    dispatch(setStats(mockStats));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const refreshStats = () => async (dispatch, getState) => {
  dispatch(setRefreshing(true));
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Simulate some updated stats
    const currentStats = getState().stats.stats;
    const updatedOverview = {
      ...currentStats.overview,
      totalUsers: currentStats.overview.totalUsers + Math.floor(Math.random() * 5),
      totalMissions: currentStats.overview.totalMissions + Math.floor(Math.random() * 3),
      totalRevenue: currentStats.overview.totalRevenue + Math.floor(Math.random() * 100),
    };
    
    dispatch(updateOverviewStats(updatedOverview));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setRefreshing(false));
  }
};

export const fetchDashboardData = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    // Simulate fetching all dashboard data
    await new Promise(resolve => setTimeout(resolve, 800));
    dispatch(setStats(mockStats));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Selectors
export const selectOverviewStats = (state) => state.stats.stats.overview;
export const selectUserStats = (state) => state.stats.stats.userStats;
export const selectMissionStats = (state) => state.stats.stats.missionStats;
export const selectRevenueStats = (state) => state.stats.stats.revenueStats;
export const selectTopMissions = (state) => state.stats.stats.topMissions;
export const selectRecentUsers = (state) => state.stats.stats.recentUsers;
export const selectActivityFeed = (state) => state.stats.stats.activityFeed;

export default statsSlice.reducer;