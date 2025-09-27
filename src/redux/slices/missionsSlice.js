import { createSlice } from '@reduxjs/toolkit';

// Mock missions data
const mockMissions = [
  {
    id: 1,
    title: 'Cours de Tennis pour Débutants',
    description: 'Cours de tennis adapté aux débutants, tous âges confondus. Matériel fourni.',
    sport: 'Tennis',
    category: 'Cours',
    location: {
      city: 'Paris',
      address: '15 Avenue des Champs-Élysées, 75008 Paris',
      coordinates: { lat: 48.8566, lng: 2.3522 },
    },
    organizer: {
      id: 2,
      name: 'Marie Martin',
      type: 'organization',
      organizationName: 'Club Sportif Lyon',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    },
    dateTime: {
      start: '2024-02-15T10:00:00Z',
      end: '2024-02-15T12:00:00Z',
      recurring: 'weekly',
    },
    participants: {
      current: 8,
      max: 12,
      waitlist: 3,
    },
    pricing: {
      amount: 25,
      currency: 'EUR',
      type: 'per_session',
    },
    status: 'published',
    moderationStatus: 'approved',
    createdAt: '2024-01-20T09:30:00Z',
    updatedAt: '2024-01-20T09:30:00Z',
    images: [
      'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=600&fit=crop',
    ],
    tags: ['débutant', 'tennis', 'cours', 'paris'],
    requirements: 'Aucune expérience requise',
    equipment: 'Raquettes et balles fournies',
    rating: 4.7,
    reviews: 15,
  },
  {
    id: 2,
    title: 'Match de Football Amateur',
    description: 'Match amical de football entre équipes locales. Niveau intermédiaire.',
    sport: 'Football',
    category: 'Match',
    location: {
      city: 'Lyon',
      address: 'Stade Municipal, 69000 Lyon',
      coordinates: { lat: 45.7640, lng: 4.8357 },
    },
    organizer: {
      id: 1,
      name: 'Jean Dupont',
      type: 'professional',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    },
    dateTime: {
      start: '2024-02-18T14:00:00Z',
      end: '2024-02-18T16:00:00Z',
      recurring: 'none',
    },
    participants: {
      current: 18,
      max: 22,
      waitlist: 0,
    },
    pricing: {
      amount: 10,
      currency: 'EUR',
      type: 'per_person',
    },
    status: 'published',
    moderationStatus: 'approved',
    createdAt: '2024-01-18T14:20:00Z',
    updatedAt: '2024-01-19T10:15:00Z',
    images: [
      'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=600&fit=crop',
    ],
    tags: ['football', 'match', 'amateur', 'lyon'],
    requirements: 'Niveau intermédiaire requis',
    equipment: 'Chaussures de foot obligatoires',
    rating: 4.5,
    reviews: 8,
  },
  {
    id: 3,
    title: 'Séance de Yoga en Plein Air',
    description: 'Séance de yoga relaxante dans un parc. Tous niveaux acceptés.',
    sport: 'Yoga',
    category: 'Bien-être',
    location: {
      city: 'Nice',
      address: 'Parc Phoenix, 06200 Nice',
      coordinates: { lat: 43.7102, lng: 7.2620 },
    },
    organizer: {
      id: 5,
      name: 'Thomas Petit',
      type: 'professional',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    },
    dateTime: {
      start: '2024-02-20T08:00:00Z',
      end: '2024-02-20T09:30:00Z',
      recurring: 'daily',
    },
    participants: {
      current: 15,
      max: 20,
      waitlist: 5,
    },
    pricing: {
      amount: 15,
      currency: 'EUR',
      type: 'per_session',
    },
    status: 'published',
    moderationStatus: 'approved',
    createdAt: '2024-01-16T11:45:00Z',
    updatedAt: '2024-01-17T09:20:00Z',
    images: [
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop',
    ],
    tags: ['yoga', 'bien-être', 'plein-air', 'nice'],
    requirements: 'Tous niveaux',
    equipment: 'Tapis de yoga fourni',
    rating: 4.9,
    reviews: 22,
  },
  {
    id: 4,
    title: 'Tournoi de Basketball 3x3',
    description: 'Tournoi de basketball 3 contre 3. Inscription par équipe.',
    sport: 'Basketball',
    category: 'Tournoi',
    location: {
      city: 'Marseille',
      address: 'Terrain de Basket, 13000 Marseille',
      coordinates: { lat: 43.2965, lng: 5.3698 },
    },
    organizer: {
      id: 3,
      name: 'Pierre Durand',
      type: 'professional',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    },
    dateTime: {
      start: '2024-02-25T13:00:00Z',
      end: '2024-02-25T18:00:00Z',
      recurring: 'none',
    },
    participants: {
      current: 24,
      max: 32,
      waitlist: 8,
    },
    pricing: {
      amount: 20,
      currency: 'EUR',
      type: 'per_team',
    },
    status: 'pending',
    moderationStatus: 'pending',
    createdAt: '2024-01-22T16:30:00Z',
    updatedAt: '2024-01-22T16:30:00Z',
    images: [
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=600&fit=crop',
    ],
    tags: ['basketball', 'tournoi', '3x3', 'marseille'],
    requirements: 'Équipe de 4 joueurs minimum',
    equipment: 'Ballons fournis',
    rating: 0,
    reviews: 0,
  },
  {
    id: 5,
    title: 'Cours de Natation Enfants',
    description: 'Cours de natation pour enfants de 6 à 12 ans. Encadrement professionnel.',
    sport: 'Natation',
    category: 'Cours',
    location: {
      city: 'Toulouse',
      address: 'Piscine Municipale, 31000 Toulouse',
      coordinates: { lat: 43.6047, lng: 1.4442 },
    },
    organizer: {
      id: 4,
      name: 'Sophie Bernard',
      type: 'organization',
      organizationName: 'Association Sportive Toulouse',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    },
    dateTime: {
      start: '2024-02-22T16:00:00Z',
      end: '2024-02-22T17:00:00Z',
      recurring: 'weekly',
    },
    participants: {
      current: 6,
      max: 10,
      waitlist: 2,
    },
    pricing: {
      amount: 30,
      currency: 'EUR',
      type: 'per_session',
    },
    status: 'archived',
    moderationStatus: 'rejected',
    createdAt: '2024-01-10T13:15:00Z',
    updatedAt: '2024-01-15T14:30:00Z',
    images: [
      'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&h=600&fit=crop',
    ],
    tags: ['natation', 'enfants', 'cours', 'toulouse'],
    requirements: 'Âge: 6-12 ans',
    equipment: 'Maillot de bain et bonnet obligatoires',
    rating: 3.2,
    reviews: 5,
    rejectionReason: 'Organisateur suspendu',
  },
];

const initialState = {
  missions: mockMissions,
  filteredMissions: mockMissions,
  selectedMission: null,
  loading: false,
  error: null,
  filters: {
    search: '',
    sport: 'all',
    category: 'all',
    status: 'all',
    moderationStatus: 'all',
    location: '',
    dateRange: { start: null, end: null },
  },
  pagination: {
    page: 0,
    rowsPerPage: 10,
    total: mockMissions.length,
  },
  stats: {
    total: mockMissions.length,
    published: mockMissions.filter(m => m.status === 'published').length,
    pending: mockMissions.filter(m => m.status === 'pending').length,
    archived: mockMissions.filter(m => m.status === 'archived').length,
  },
};

const missionsSlice = createSlice({
  name: 'missions',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setMissions: (state, action) => {
      state.missions = action.payload;
      state.filteredMissions = action.payload;
      state.pagination.total = action.payload.length;
      // Update stats
      state.stats = {
        total: action.payload.length,
        published: action.payload.filter(m => m.status === 'published').length,
        pending: action.payload.filter(m => m.status === 'pending').length,
        archived: action.payload.filter(m => m.status === 'archived').length,
      };
    },
    setSelectedMission: (state, action) => {
      state.selectedMission = action.payload;
    },
    updateMission: (state, action) => {
      const { id, updates } = action.payload;
      const missionIndex = state.missions.findIndex(mission => mission.id === id);
      if (missionIndex !== -1) {
        state.missions[missionIndex] = { ...state.missions[missionIndex], ...updates, updatedAt: new Date().toISOString() };
        state.filteredMissions = state.missions;
      }
    },
    deleteMission: (state, action) => {
      const missionId = action.payload;
      state.missions = state.missions.filter(mission => mission.id !== missionId);
      state.filteredMissions = state.missions;
      state.pagination.total = state.missions.length;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      
      // Apply filters
      let filtered = state.missions;
      
      if (state.filters.search) {
        const searchTerm = state.filters.search.toLowerCase();
        filtered = filtered.filter(mission => 
          mission.title.toLowerCase().includes(searchTerm) ||
          mission.description.toLowerCase().includes(searchTerm) ||
          mission.sport.toLowerCase().includes(searchTerm) ||
          mission.location.city.toLowerCase().includes(searchTerm)
        );
      }
      
      if (state.filters.sport !== 'all') {
        filtered = filtered.filter(mission => mission.sport === state.filters.sport);
      }
      
      if (state.filters.category !== 'all') {
        filtered = filtered.filter(mission => mission.category === state.filters.category);
      }
      
      if (state.filters.status !== 'all') {
        filtered = filtered.filter(mission => mission.status === state.filters.status);
      }
      
      if (state.filters.moderationStatus !== 'all') {
        filtered = filtered.filter(mission => mission.moderationStatus === state.filters.moderationStatus);
      }
      
      if (state.filters.location) {
        const locationTerm = state.filters.location.toLowerCase();
        filtered = filtered.filter(mission => 
          mission.location.city.toLowerCase().includes(locationTerm) ||
          mission.location.address.toLowerCase().includes(locationTerm)
        );
      }
      
      state.filteredMissions = filtered;
      state.pagination.total = filtered.length;
      state.pagination.page = 0; // Reset to first page
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        search: '',
        sport: 'all',
        category: 'all',
        status: 'all',
        moderationStatus: 'all',
        location: '',
        dateRange: { start: null, end: null },
      };
      state.filteredMissions = state.missions;
      state.pagination.total = state.missions.length;
      state.pagination.page = 0;
    },
  },
});

export const {
  setLoading,
  setError,
  setMissions,
  setSelectedMission,
  updateMission,
  deleteMission,
  setFilters,
  setPagination,
  clearFilters,
} = missionsSlice.actions;

// Async actions
export const fetchMissions = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    dispatch(setMissions(mockMissions));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const approveMission = (missionId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    dispatch(updateMission({ 
      id: missionId, 
      updates: { 
        moderationStatus: 'approved',
        status: 'published'
      } 
    }));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const rejectMission = (missionId, reason) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    dispatch(updateMission({ 
      id: missionId, 
      updates: { 
        moderationStatus: 'rejected',
        status: 'archived',
        rejectionReason: reason
      } 
    }));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const archiveMission = (missionId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    dispatch(updateMission({ 
      id: missionId, 
      updates: { status: 'archived' } 
    }));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export default missionsSlice.reducer;