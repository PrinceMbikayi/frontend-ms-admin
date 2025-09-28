import { createSlice } from '@reduxjs/toolkit';

// Données mockées pour les tickets de support
const mockTickets = [
  {
    id: 1,
    ticketNumber: 'SUP-2024-001',
    title: 'Problème de connexion',
    description: 'Je n\'arrive pas à me connecter à mon compte depuis ce matin.',
    category: 'technical',
    priority: 'high',
    status: 'open',
    userId: 1,
    userName: 'Jean Dupont',
    userEmail: 'jean.dupont@email.com',
    userType: 'professional',
    assignedTo: null,
    assignedToName: null,
    createdAt: '2024-01-15T08:30:00Z',
    updatedAt: '2024-01-15T08:30:00Z',
    resolvedAt: null,
    tags: ['connexion', 'urgent'],
    attachments: [
      {
        id: 1,
        name: 'screenshot_error.png',
        url: '/uploads/screenshot_error.png',
        type: 'image/png',
        size: 245760
      }
    ],
    responses: [
      {
        id: 1,
        content: 'Bonjour, nous avons bien reçu votre demande. Nous allons examiner le problème.',
        authorId: 'admin',
        authorName: 'Support Technique',
        authorType: 'admin',
        createdAt: '2024-01-15T09:00:00Z',
        isInternal: false
      }
    ],
    satisfaction: null,
    estimatedResolutionTime: '2024-01-15T18:00:00Z'
  },
  {
    id: 2,
    ticketNumber: 'SUP-2024-002',
    title: 'Question sur les tarifs',
    description: 'Je souhaiterais avoir des informations sur vos tarifs pour les organisations.',
    category: 'billing',
    priority: 'medium',
    status: 'in_progress',
    userId: 2,
    userName: 'Marie Martin',
    userEmail: 'marie.martin@organisation.com',
    userType: 'organization',
    assignedTo: 'admin1',
    assignedToName: 'Sophie Dubois',
    createdAt: '2024-01-14T14:20:00Z',
    updatedAt: '2024-01-15T10:15:00Z',
    resolvedAt: null,
    tags: ['tarifs', 'organisation'],
    attachments: [],
    responses: [
      {
        id: 1,
        content: 'Bonjour Marie, je vais vous envoyer notre grille tarifaire par email.',
        authorId: 'admin1',
        authorName: 'Sophie Dubois',
        authorType: 'admin',
        createdAt: '2024-01-14T15:30:00Z',
        isInternal: false
      },
      {
        id: 2,
        content: 'Note interne: Vérifier si elle est éligible à la remise organisations.',
        authorId: 'admin1',
        authorName: 'Sophie Dubois',
        authorType: 'admin',
        createdAt: '2024-01-14T15:31:00Z',
        isInternal: true
      }
    ],
    satisfaction: null,
    estimatedResolutionTime: '2024-01-15T17:00:00Z'
  },
  {
    id: 3,
    ticketNumber: 'SUP-2024-003',
    title: 'Bug dans l\'application mobile',
    description: 'L\'application plante quand j\'essaie de publier une mission.',
    category: 'bug',
    priority: 'high',
    status: 'resolved',
    userId: 3,
    userName: 'Pierre Leroy',
    userEmail: 'pierre.leroy@email.com',
    userType: 'professional',
    assignedTo: 'admin2',
    assignedToName: 'Thomas Bernard',
    createdAt: '2024-01-13T11:45:00Z',
    updatedAt: '2024-01-14T16:30:00Z',
    resolvedAt: '2024-01-14T16:30:00Z',
    tags: ['mobile', 'bug', 'mission'],
    attachments: [
      {
        id: 1,
        name: 'crash_log.txt',
        url: '/uploads/crash_log.txt',
        type: 'text/plain',
        size: 15360
      }
    ],
    responses: [
      {
        id: 1,
        content: 'Merci pour le rapport. Pouvez-vous nous envoyer les logs de l\'application ?',
        authorId: 'admin2',
        authorName: 'Thomas Bernard',
        authorType: 'admin',
        createdAt: '2024-01-13T12:00:00Z',
        isInternal: false
      },
      {
        id: 2,
        content: 'Voici les logs demandés.',
        authorId: 3,
        authorName: 'Pierre Leroy',
        authorType: 'user',
        createdAt: '2024-01-13T14:30:00Z',
        isInternal: false
      },
      {
        id: 3,
        content: 'Le problème a été identifié et corrigé dans la version 2.1.3. Merci pour votre patience.',
        authorId: 'admin2',
        authorName: 'Thomas Bernard',
        authorType: 'admin',
        createdAt: '2024-01-14T16:30:00Z',
        isInternal: false
      }
    ],
    satisfaction: 5,
    estimatedResolutionTime: null
  }
];

// Données mockées pour les articles de FAQ
const mockFaqArticles = [
  {
    id: 1,
    title: 'Comment créer un compte professionnel ?',
    content: 'Pour créer un compte professionnel, rendez-vous sur la page d\'inscription...',
    category: 'account',
    subcategory: 'registration',
    tags: ['inscription', 'professionnel', 'compte'],
    isPublished: true,
    views: 1250,
    helpful: 45,
    notHelpful: 3,
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-10T15:30:00Z',
    authorId: 'admin1',
    authorName: 'Sophie Dubois'
  },
  {
    id: 2,
    title: 'Comment publier une mission ?',
    content: 'Pour publier une mission, connectez-vous à votre compte et cliquez sur "Publier une mission"...',
    category: 'missions',
    subcategory: 'creation',
    tags: ['mission', 'publication', 'création'],
    isPublished: true,
    views: 2100,
    helpful: 78,
    notHelpful: 5,
    createdAt: '2024-01-02T14:20:00Z',
    updatedAt: '2024-01-12T09:15:00Z',
    authorId: 'admin2',
    authorName: 'Thomas Bernard'
  },
  {
    id: 3,
    title: 'Politique de remboursement',
    content: 'Notre politique de remboursement s\'applique dans les cas suivants...',
    category: 'billing',
    subcategory: 'refunds',
    tags: ['remboursement', 'politique', 'paiement'],
    isPublished: true,
    views: 890,
    helpful: 32,
    notHelpful: 8,
    createdAt: '2024-01-03T16:45:00Z',
    updatedAt: '2024-01-08T11:20:00Z',
    authorId: 'admin1',
    authorName: 'Sophie Dubois'
  }
];

// Données mockées pour les guides
const mockGuides = [
  {
    id: 1,
    title: 'Guide complet pour les professionnels',
    description: 'Tout ce que vous devez savoir pour utiliser efficacement notre plateforme.',
    content: 'Ce guide vous accompagne pas à pas...',
    category: 'professional',
    difficulty: 'beginner',
    estimatedReadTime: 15,
    isPublished: true,
    views: 3200,
    downloads: 450,
    rating: 4.8,
    ratingCount: 125,
    tags: ['professionnel', 'guide', 'débutant'],
    createdAt: '2024-01-01T08:00:00Z',
    updatedAt: '2024-01-15T14:30:00Z',
    authorId: 'admin1',
    authorName: 'Sophie Dubois',
    attachments: [
      {
        id: 1,
        name: 'guide_professionnel.pdf',
        url: '/downloads/guide_professionnel.pdf',
        type: 'application/pdf',
        size: 2048000
      }
    ]
  },
  {
    id: 2,
    title: 'Guide pour les organisations',
    description: 'Comment gérer efficacement votre équipe et vos missions.',
    content: 'Les organisations ont des besoins spécifiques...',
    category: 'organization',
    difficulty: 'intermediate',
    estimatedReadTime: 25,
    isPublished: true,
    views: 1800,
    downloads: 320,
    rating: 4.6,
    ratingCount: 89,
    tags: ['organisation', 'équipe', 'gestion'],
    createdAt: '2024-01-05T10:30:00Z',
    updatedAt: '2024-01-14T16:45:00Z',
    authorId: 'admin2',
    authorName: 'Thomas Bernard',
    attachments: []
  }
];

const initialState = {
  // Tickets de support
  tickets: mockTickets,
  filteredTickets: mockTickets,
  selectedTicket: null,
  
  // Articles FAQ
  faqArticles: mockFaqArticles,
  filteredFaqArticles: mockFaqArticles,
  selectedFaqArticle: null,
  
  // Guides
  guides: mockGuides,
  filteredGuides: mockGuides,
  selectedGuide: null,
  
  // États de l'interface
  loading: false,
  error: null,
  selectedTab: 0, // 0: Tickets, 1: FAQ, 2: Guides
  
  // Recherche et filtres pour tickets
  searchQuery: '',
  filters: {
    status: 'all',
    priority: 'all',
    category: 'all',
    assignedTo: 'all',
    userType: 'all',
    dateRange: 'all'
  },
  
  // Filtres pour FAQ
  faqFilters: {
    category: 'all',
    isPublished: 'all'
  },
  
  // Filtres pour guides
  guideFilters: {
    category: 'all',
    difficulty: 'all',
    isPublished: 'all'
  },
  
  // Pagination et tri
  pagination: {
    page: 0,
    pageSize: 25
  },
  sortModel: [{ field: 'createdAt', sort: 'desc' }],
  
  // Statistiques
  stats: {
    totalTickets: mockTickets.length,
    openTickets: mockTickets.filter(t => t.status === 'open').length,
    inProgressTickets: mockTickets.filter(t => t.status === 'in_progress').length,
    resolvedTickets: mockTickets.filter(t => t.status === 'resolved').length,
    averageResolutionTime: '2.5 heures',
    satisfactionScore: 4.2,
    totalFaqArticles: mockFaqArticles.length,
    publishedFaqArticles: mockFaqArticles.filter(a => a.isPublished).length,
    totalGuides: mockGuides.length,
    publishedGuides: mockGuides.filter(g => g.isPublished).length,
    totalViews: mockFaqArticles.reduce((sum, a) => sum + a.views, 0) + mockGuides.reduce((sum, g) => sum + g.views, 0)
  }
};

const supportSlice = createSlice({
  name: 'support',
  initialState,
  reducers: {
    // Gestion des tickets
    setSelectedTicket: (state, action) => {
      state.selectedTicket = action.payload;
    },
    
    addTicket: (state, action) => {
      const newTicket = {
        ...action.payload,
        id: Math.max(...state.tickets.map(t => t.id)) + 1,
        ticketNumber: `SUP-2024-${String(Math.max(...state.tickets.map(t => t.id)) + 1).padStart(3, '0')}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        responses: []
      };
      state.tickets.unshift(newTicket);
      supportSlice.caseReducers.applyFilters(state);
      supportSlice.caseReducers.updateStats(state);
    },
    
    updateTicket: (state, action) => {
      const { id, updates } = action.payload;
      const ticketIndex = state.tickets.findIndex(t => t.id === id);
      if (ticketIndex !== -1) {
        state.tickets[ticketIndex] = {
          ...state.tickets[ticketIndex],
          ...updates,
          updatedAt: new Date().toISOString()
        };
        if (state.selectedTicket && state.selectedTicket.id === id) {
          state.selectedTicket = state.tickets[ticketIndex];
        }
        supportSlice.caseReducers.applyFilters(state);
        supportSlice.caseReducers.updateStats(state);
      }
    },
    
    updateTicketStatus: (state, action) => {
      const { id, status, resolvedAt = null } = action.payload;
      const ticketIndex = state.tickets.findIndex(t => t.id === id);
      if (ticketIndex !== -1) {
        state.tickets[ticketIndex].status = status;
        state.tickets[ticketIndex].updatedAt = new Date().toISOString();
        if (status === 'resolved' && resolvedAt) {
          state.tickets[ticketIndex].resolvedAt = resolvedAt;
        }
        if (state.selectedTicket && state.selectedTicket.id === id) {
          state.selectedTicket = state.tickets[ticketIndex];
        }
        supportSlice.caseReducers.applyFilters(state);
        supportSlice.caseReducers.updateStats(state);
      }
    },
    
    assignTicket: (state, action) => {
      const { id, assignedTo, assignedToName } = action.payload;
      const ticketIndex = state.tickets.findIndex(t => t.id === id);
      if (ticketIndex !== -1) {
        state.tickets[ticketIndex].assignedTo = assignedTo;
        state.tickets[ticketIndex].assignedToName = assignedToName;
        state.tickets[ticketIndex].updatedAt = new Date().toISOString();
        if (state.selectedTicket && state.selectedTicket.id === id) {
          state.selectedTicket = state.tickets[ticketIndex];
        }
        supportSlice.caseReducers.applyFilters(state);
      }
    },
    
    addTicketResponse: (state, action) => {
      const { ticketId, response } = action.payload;
      const ticketIndex = state.tickets.findIndex(t => t.id === ticketId);
      if (ticketIndex !== -1) {
        const newResponse = {
          ...response,
          id: Math.max(...state.tickets[ticketIndex].responses.map(r => r.id), 0) + 1,
          createdAt: new Date().toISOString()
        };
        state.tickets[ticketIndex].responses.push(newResponse);
        state.tickets[ticketIndex].updatedAt = new Date().toISOString();
        if (state.selectedTicket && state.selectedTicket.id === ticketId) {
          state.selectedTicket = state.tickets[ticketIndex];
        }
      }
    },
    
    deleteTicket: (state, action) => {
      const id = action.payload;
      state.tickets = state.tickets.filter(t => t.id !== id);
      if (state.selectedTicket && state.selectedTicket.id === id) {
        state.selectedTicket = null;
      }
      supportSlice.caseReducers.applyFilters(state);
      supportSlice.caseReducers.updateStats(state);
    },
    
    // Gestion des articles FAQ
    setSelectedFaqArticle: (state, action) => {
      state.selectedFaqArticle = action.payload;
    },
    
    addFaqArticle: (state, action) => {
      const newArticle = {
        ...action.payload,
        id: Math.max(...state.faqArticles.map(a => a.id)) + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        views: 0,
        helpful: 0,
        notHelpful: 0
      };
      state.faqArticles.unshift(newArticle);
      supportSlice.caseReducers.applyFaqFilters(state);
      supportSlice.caseReducers.updateStats(state);
    },
    
    updateFaqArticle: (state, action) => {
      const { id, updates } = action.payload;
      const articleIndex = state.faqArticles.findIndex(a => a.id === id);
      if (articleIndex !== -1) {
        state.faqArticles[articleIndex] = {
          ...state.faqArticles[articleIndex],
          ...updates,
          updatedAt: new Date().toISOString()
        };
        if (state.selectedFaqArticle && state.selectedFaqArticle.id === id) {
          state.selectedFaqArticle = state.faqArticles[articleIndex];
        }
        supportSlice.caseReducers.applyFaqFilters(state);
        supportSlice.caseReducers.updateStats(state);
      }
    },
    
    deleteFaqArticle: (state, action) => {
      const id = action.payload;
      state.faqArticles = state.faqArticles.filter(a => a.id !== id);
      if (state.selectedFaqArticle && state.selectedFaqArticle.id === id) {
        state.selectedFaqArticle = null;
      }
      supportSlice.caseReducers.applyFaqFilters(state);
      supportSlice.caseReducers.updateStats(state);
    },
    
    // Gestion des guides
    setSelectedGuide: (state, action) => {
      state.selectedGuide = action.payload;
    },
    
    addGuide: (state, action) => {
      const newGuide = {
        ...action.payload,
        id: Math.max(...state.guides.map(g => g.id)) + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        views: 0,
        downloads: 0,
        rating: 0,
        ratingCount: 0
      };
      state.guides.unshift(newGuide);
      supportSlice.caseReducers.applyGuideFilters(state);
      supportSlice.caseReducers.updateStats(state);
    },
    
    updateGuide: (state, action) => {
      const { id, updates } = action.payload;
      const guideIndex = state.guides.findIndex(g => g.id === id);
      if (guideIndex !== -1) {
        state.guides[guideIndex] = {
          ...state.guides[guideIndex],
          ...updates,
          updatedAt: new Date().toISOString()
        };
        if (state.selectedGuide && state.selectedGuide.id === id) {
          state.selectedGuide = state.guides[guideIndex];
        }
        supportSlice.caseReducers.applyGuideFilters(state);
        supportSlice.caseReducers.updateStats(state);
      }
    },
    
    deleteGuide: (state, action) => {
      const id = action.payload;
      state.guides = state.guides.filter(g => g.id !== id);
      if (state.selectedGuide && state.selectedGuide.id === id) {
        state.selectedGuide = null;
      }
      supportSlice.caseReducers.applyGuideFilters(state);
      supportSlice.caseReducers.updateStats(state);
    },
    
    // Recherche et filtres
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      supportSlice.caseReducers.applyFilters(state);
    },
    
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      supportSlice.caseReducers.applyFilters(state);
    },
    
    setFaqFilters: (state, action) => {
      state.faqFilters = { ...state.faqFilters, ...action.payload };
      supportSlice.caseReducers.applyFaqFilters(state);
    },
    
    setGuideFilters: (state, action) => {
      state.guideFilters = { ...state.guideFilters, ...action.payload };
      supportSlice.caseReducers.applyGuideFilters(state);
    },
    
    clearFilters: (state) => {
      state.filters = {
        status: 'all',
        priority: 'all',
        category: 'all',
        assignedTo: 'all',
        userType: 'all',
        dateRange: 'all'
      };
      state.searchQuery = '';
      supportSlice.caseReducers.applyFilters(state);
    },
    
    clearFaqFilters: (state) => {
      state.faqFilters = {
        category: 'all',
        isPublished: 'all'
      };
      supportSlice.caseReducers.applyFaqFilters(state);
    },
    
    clearGuideFilters: (state) => {
      state.guideFilters = {
        category: 'all',
        difficulty: 'all',
        isPublished: 'all'
      };
      supportSlice.caseReducers.applyGuideFilters(state);
    },
    
    // Application des filtres
    applyFilters: (state) => {
      let filtered = [...state.tickets];
      
      // Recherche textuelle
      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase();
        filtered = filtered.filter(ticket =>
          ticket.title.toLowerCase().includes(query) ||
          ticket.description.toLowerCase().includes(query) ||
          ticket.userName.toLowerCase().includes(query) ||
          ticket.userEmail.toLowerCase().includes(query) ||
          ticket.ticketNumber.toLowerCase().includes(query)
        );
      }
      
      // Filtres
      if (state.filters.status !== 'all') {
        filtered = filtered.filter(ticket => ticket.status === state.filters.status);
      }
      
      if (state.filters.priority !== 'all') {
        filtered = filtered.filter(ticket => ticket.priority === state.filters.priority);
      }
      
      if (state.filters.category !== 'all') {
        filtered = filtered.filter(ticket => ticket.category === state.filters.category);
      }
      
      if (state.filters.assignedTo !== 'all') {
        if (state.filters.assignedTo === 'unassigned') {
          filtered = filtered.filter(ticket => !ticket.assignedTo);
        } else {
          filtered = filtered.filter(ticket => ticket.assignedTo === state.filters.assignedTo);
        }
      }
      
      if (state.filters.userType !== 'all') {
        filtered = filtered.filter(ticket => ticket.userType === state.filters.userType);
      }
      
      state.filteredTickets = filtered;
    },
    
    applyFaqFilters: (state) => {
      let filtered = [...state.faqArticles];
      
      if (state.faqFilters.category !== 'all') {
        filtered = filtered.filter(article => article.category === state.faqFilters.category);
      }
      
      if (state.faqFilters.isPublished !== 'all') {
        const isPublished = state.faqFilters.isPublished === 'published';
        filtered = filtered.filter(article => article.isPublished === isPublished);
      }
      
      state.filteredFaqArticles = filtered;
    },
    
    applyGuideFilters: (state) => {
      let filtered = [...state.guides];
      
      if (state.guideFilters.category !== 'all') {
        filtered = filtered.filter(guide => guide.category === state.guideFilters.category);
      }
      
      if (state.guideFilters.difficulty !== 'all') {
        filtered = filtered.filter(guide => guide.difficulty === state.guideFilters.difficulty);
      }
      
      if (state.guideFilters.isPublished !== 'all') {
        const isPublished = state.guideFilters.isPublished === 'published';
        filtered = filtered.filter(guide => guide.isPublished === isPublished);
      }
      
      state.filteredGuides = filtered;
    },
    
    // Pagination et tri
    setPagination: (state, action) => {
      state.pagination = action.payload;
    },
    
    setSortModel: (state, action) => {
      state.sortModel = action.payload;
    },
    
    // Onglets
    setSelectedTab: (state, action) => {
      state.selectedTab = action.payload;
    },
    
    // États de chargement et erreur
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    
    setError: (state, action) => {
      state.error = action.payload;
    },
    
    clearError: (state) => {
      state.error = null;
    },
    
    // Mise à jour des statistiques
    updateStats: (state) => {
      state.stats = {
        totalTickets: state.tickets.length,
        openTickets: state.tickets.filter(t => t.status === 'open').length,
        inProgressTickets: state.tickets.filter(t => t.status === 'in_progress').length,
        resolvedTickets: state.tickets.filter(t => t.status === 'resolved').length,
        averageResolutionTime: '2.5 heures',
        satisfactionScore: 4.2,
        totalFaqArticles: state.faqArticles.length,
        publishedFaqArticles: state.faqArticles.filter(a => a.isPublished).length,
        totalGuides: state.guides.length,
        publishedGuides: state.guides.filter(g => g.isPublished).length,
        totalViews: state.faqArticles.reduce((sum, a) => sum + a.views, 0) + state.guides.reduce((sum, g) => sum + g.views, 0)
      };
    }
  }
});

export const {
  setSelectedTicket,
  addTicket,
  updateTicket,
  updateTicketStatus,
  assignTicket,
  addTicketResponse,
  deleteTicket,
  setSelectedFaqArticle,
  addFaqArticle,
  updateFaqArticle,
  deleteFaqArticle,
  setSelectedGuide,
  addGuide,
  updateGuide,
  deleteGuide,
  setSearchQuery,
  setFilters,
  setFaqFilters,
  setGuideFilters,
  clearFilters,
  clearFaqFilters,
  clearGuideFilters,
  applyFilters,
  applyFaqFilters,
  applyGuideFilters,
  setPagination,
  setSortModel,
  setSelectedTab,
  setLoading,
  setError,
  clearError,
  updateStats
} = supportSlice.actions;

export default supportSlice.reducer;