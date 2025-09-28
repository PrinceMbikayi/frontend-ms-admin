import { createSlice } from '@reduxjs/toolkit';

// Mock data pour les organisations (adapté pour l'administration)
const mockOrganisations = [
  {
    id: 1,
    name: 'Club Sportif Paris',
    type: 'Club de Football',
    email: 'contact@csparis.fr',
    phone: '+33 1 42 34 56 78',
    address: '15 Avenue des Champs-Élysées, 75008 Paris',
    city: 'Paris',
    postalCode: '75008',
    country: 'France',
    website: 'www.csparis.fr',
    description: 'Club de football amateur parisien fondé en 1985, spécialisé dans la formation des jeunes talents.',
    disciplines: ['Football', 'Football féminin', 'École de foot'],
    memberCount: 250,
    foundedYear: 1985,
    status: 'active', // active, suspended, pending
    verificationStatus: 'verified', // verified, pending, rejected
    rating: 4.5,
    totalMissions: 12,
    activeMissions: 3,
    completedMissions: 9,
    totalSpent: 15000,
    lastActivity: '2024-01-15T10:30:00Z',
    createdAt: '2023-03-15T09:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    contacts: [
      {
        id: 1,
        name: 'Marie Dubois',
        role: 'Présidente',
        email: 'marie.dubois@csparis.fr',
        phone: '+33 6 12 34 56 78'
      }
    ],
    documents: [
      {
        id: 1,
        name: 'Statuts association',
        type: 'legal',
        url: '/documents/statuts-csparis.pdf',
        uploadedAt: '2023-03-15T09:00:00Z'
      }
    ]
  },
  {
    id: 2,
    name: 'Centre de Rééducation Sportive',
    type: 'Centre médical',
    email: 'info@centre-reeducation.fr',
    phone: '+33 1 45 67 89 01',
    address: '28 Rue de la Santé, 75014 Paris',
    city: 'Paris',
    postalCode: '75014',
    country: 'France',
    website: 'www.centre-reeducation.fr',
    description: 'Centre spécialisé en rééducation sportive et kinésithérapie pour athlètes.',
    disciplines: ['Kinésithérapie', 'Rééducation', 'Préparation physique'],
    memberCount: 45,
    foundedYear: 2010,
    status: 'active',
    verificationStatus: 'verified',
    rating: 4.8,
    totalMissions: 28,
    activeMissions: 5,
    completedMissions: 23,
    totalSpent: 35000,
    lastActivity: '2024-01-14T16:45:00Z',
    createdAt: '2023-01-20T14:30:00Z',
    updatedAt: '2024-01-14T16:45:00Z',
    contacts: [
      {
        id: 1,
        name: 'Dr. Pierre Martin',
        role: 'Directeur médical',
        email: 'p.martin@centre-reeducation.fr',
        phone: '+33 6 23 45 67 89'
      }
    ],
    documents: [
      {
        id: 1,
        name: 'Licence médicale',
        type: 'license',
        url: '/documents/licence-medical.pdf',
        uploadedAt: '2023-01-20T14:30:00Z'
      }
    ]
  },
  {
    id: 3,
    name: 'Académie de Tennis Elite',
    type: 'École de sport',
    email: 'contact@tennis-elite.fr',
    phone: '+33 1 56 78 90 12',
    address: '42 Boulevard Saint-Germain, 75005 Paris',
    city: 'Paris',
    postalCode: '75005',
    country: 'France',
    website: 'www.tennis-elite.fr',
    description: 'Académie de tennis de haut niveau pour la formation de jeunes champions.',
    disciplines: ['Tennis', 'Tennis de table', 'Préparation mentale'],
    memberCount: 120,
    foundedYear: 2005,
    status: 'active',
    verificationStatus: 'pending',
    rating: 4.3,
    totalMissions: 8,
    activeMissions: 2,
    completedMissions: 6,
    totalSpent: 8500,
    lastActivity: '2024-01-13T11:20:00Z',
    createdAt: '2023-06-10T10:15:00Z',
    updatedAt: '2024-01-13T11:20:00Z',
    contacts: [
      {
        id: 1,
        name: 'Sophie Laurent',
        role: 'Directrice',
        email: 's.laurent@tennis-elite.fr',
        phone: '+33 6 34 56 78 90'
      }
    ],
    documents: []
  },
  {
    id: 4,
    name: 'Piscine Municipale Aqua Sport',
    type: 'Équipement public',
    email: 'aquasport@mairie-paris.fr',
    phone: '+33 1 67 89 01 23',
    address: '18 Rue de la Piscine, 75012 Paris',
    city: 'Paris',
    postalCode: '75012',
    country: 'France',
    website: 'www.aquasport-paris.fr',
    description: 'Complexe aquatique municipal proposant cours de natation et aquagym.',
    disciplines: ['Natation', 'Aquagym', 'Water-polo'],
    memberCount: 800,
    foundedYear: 1995,
    status: 'active',
    verificationStatus: 'verified',
    rating: 4.1,
    totalMissions: 15,
    activeMissions: 4,
    completedMissions: 11,
    totalSpent: 22000,
    lastActivity: '2024-01-12T14:30:00Z',
    createdAt: '2023-02-28T08:45:00Z',
    updatedAt: '2024-01-12T14:30:00Z',
    contacts: [
      {
        id: 1,
        name: 'Jean-Luc Moreau',
        role: 'Responsable',
        email: 'jl.moreau@mairie-paris.fr',
        phone: '+33 6 45 67 89 01'
      }
    ],
    documents: [
      {
        id: 1,
        name: 'Autorisation municipale',
        type: 'authorization',
        url: '/documents/autorisation-municipale.pdf',
        uploadedAt: '2023-02-28T08:45:00Z'
      }
    ]
  },
  {
    id: 5,
    name: 'Salle de Fitness Pro',
    type: 'Salle de sport',
    email: 'info@fitnesspro.fr',
    phone: '+33 1 78 90 12 34',
    address: '35 Rue du Commerce, 75015 Paris',
    city: 'Paris',
    postalCode: '75015',
    country: 'France',
    website: 'www.fitnesspro.fr',
    description: 'Salle de fitness moderne avec équipements de pointe et cours collectifs.',
    disciplines: ['Fitness', 'Musculation', 'Crossfit', 'Yoga'],
    memberCount: 450,
    foundedYear: 2018,
    status: 'suspended',
    verificationStatus: 'verified',
    rating: 3.9,
    totalMissions: 6,
    activeMissions: 0,
    completedMissions: 6,
    totalSpent: 4500,
    lastActivity: '2023-12-20T09:15:00Z',
    createdAt: '2023-08-12T16:20:00Z',
    updatedAt: '2023-12-20T09:15:00Z',
    contacts: [
      {
        id: 1,
        name: 'Thomas Bernard',
        role: 'Gérant',
        email: 't.bernard@fitnesspro.fr',
        phone: '+33 6 56 78 90 12'
      }
    ],
    documents: [
      {
        id: 1,
        name: 'Licence commerciale',
        type: 'license',
        url: '/documents/licence-commerciale.pdf',
        uploadedAt: '2023-08-12T16:20:00Z'
      }
    ]
  }
];

const initialState = {
  organisations: mockOrganisations,
  filteredOrganisations: mockOrganisations,
  selectedOrganisation: null,
  loading: false,
  error: null,
  searchQuery: '',
  filters: {
    status: 'all', // all, active, suspended, pending
    verificationStatus: 'all', // all, verified, pending, rejected
    type: 'all',
    city: 'all'
  },
  pagination: {
    page: 0,
    pageSize: 10,
    total: mockOrganisations.length
  },
  sortModel: [{ field: 'name', sort: 'asc' }]
};

const organisationsSlice = createSlice({
  name: 'organisations',
  initialState,
  reducers: {
    setOrganisations: (state, action) => {
      state.organisations = action.payload;
      state.filteredOrganisations = action.payload;
      state.pagination.total = action.payload.length;
    },
    setSelectedOrganisation: (state, action) => {
      state.selectedOrganisation = action.payload;
    },
    addOrganisation: (state, action) => {
      const newOrganisation = {
        ...action.payload,
        id: Math.max(...state.organisations.map(o => o.id)) + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        totalMissions: 0,
        activeMissions: 0,
        completedMissions: 0,
        totalSpent: 0,
        rating: 0
      };
      state.organisations.push(newOrganisation);
      state.filteredOrganisations.push(newOrganisation);
      state.pagination.total += 1;
    },
    updateOrganisation: (state, action) => {
      const { id, ...updates } = action.payload;
      const index = state.organisations.findIndex(org => org.id === id);
      if (index !== -1) {
        state.organisations[index] = {
          ...state.organisations[index],
          ...updates,
          updatedAt: new Date().toISOString()
        };
        const filteredIndex = state.filteredOrganisations.findIndex(org => org.id === id);
        if (filteredIndex !== -1) {
          state.filteredOrganisations[filteredIndex] = state.organisations[index];
        }
      }
    },
    deleteOrganisation: (state, action) => {
      const id = action.payload;
      state.organisations = state.organisations.filter(org => org.id !== id);
      state.filteredOrganisations = state.filteredOrganisations.filter(org => org.id !== id);
      state.pagination.total -= 1;
      if (state.selectedOrganisation?.id === id) {
        state.selectedOrganisation = null;
      }
    },
    updateOrganisationStatus: (state, action) => {
      const { id, status } = action.payload;
      const index = state.organisations.findIndex(org => org.id === id);
      if (index !== -1) {
        state.organisations[index].status = status;
        state.organisations[index].updatedAt = new Date().toISOString();
        const filteredIndex = state.filteredOrganisations.findIndex(org => org.id === id);
        if (filteredIndex !== -1) {
          state.filteredOrganisations[filteredIndex].status = status;
          state.filteredOrganisations[filteredIndex].updatedAt = new Date().toISOString();
        }
      }
    },
    updateVerificationStatus: (state, action) => {
      const { id, verificationStatus } = action.payload;
      const index = state.organisations.findIndex(org => org.id === id);
      if (index !== -1) {
        state.organisations[index].verificationStatus = verificationStatus;
        state.organisations[index].updatedAt = new Date().toISOString();
        const filteredIndex = state.filteredOrganisations.findIndex(org => org.id === id);
        if (filteredIndex !== -1) {
          state.filteredOrganisations[filteredIndex].verificationStatus = verificationStatus;
          state.filteredOrganisations[filteredIndex].updatedAt = new Date().toISOString();
        }
      }
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.filteredOrganisations = state.organisations.filter(org =>
        org.name.toLowerCase().includes(action.payload.toLowerCase()) ||
        org.email.toLowerCase().includes(action.payload.toLowerCase()) ||
        org.type.toLowerCase().includes(action.payload.toLowerCase()) ||
        org.city.toLowerCase().includes(action.payload.toLowerCase())
      );
      state.pagination.total = state.filteredOrganisations.length;
      state.pagination.page = 0;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      
      let filtered = state.organisations;
      
      // Appliquer les filtres
      if (state.filters.status !== 'all') {
        filtered = filtered.filter(org => org.status === state.filters.status);
      }
      
      if (state.filters.verificationStatus !== 'all') {
        filtered = filtered.filter(org => org.verificationStatus === state.filters.verificationStatus);
      }
      
      if (state.filters.type !== 'all') {
        filtered = filtered.filter(org => org.type === state.filters.type);
      }
      
      if (state.filters.city !== 'all') {
        filtered = filtered.filter(org => org.city === state.filters.city);
      }
      
      // Appliquer la recherche si elle existe
      if (state.searchQuery) {
        filtered = filtered.filter(org =>
          org.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          org.email.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          org.type.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          org.city.toLowerCase().includes(state.searchQuery.toLowerCase())
        );
      }
      
      state.filteredOrganisations = filtered;
      state.pagination.total = filtered.length;
      state.pagination.page = 0;
    },
    clearFilters: (state) => {
      state.filters = {
        status: 'all',
        verificationStatus: 'all',
        type: 'all',
        city: 'all'
      };
      state.searchQuery = '';
      state.filteredOrganisations = state.organisations;
      state.pagination.total = state.organisations.length;
      state.pagination.page = 0;
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    setSortModel: (state, action) => {
      state.sortModel = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const {
  setOrganisations,
  setSelectedOrganisation,
  addOrganisation,
  updateOrganisation,
  deleteOrganisation,
  updateOrganisationStatus,
  updateVerificationStatus,
  setSearchQuery,
  setFilters,
  clearFilters,
  setPagination,
  setSortModel,
  setLoading,
  setError,
  clearError
} = organisationsSlice.actions;

export default organisationsSlice.reducer;