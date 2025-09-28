import { createSlice } from '@reduxjs/toolkit';

// Données mockées pour les conversations et messages
const mockConversations = [
  {
    id: 1,
    participants: [
      { id: 1, name: 'Jean Dupont', type: 'professional', avatar: null },
      { id: 2, name: 'Club de Football Paris', type: 'organisation', avatar: null }
    ],
    lastMessage: {
      id: 101,
      senderId: 1,
      content: 'Bonjour, je suis intéressé par votre mission de préparation physique.',
      timestamp: '2024-01-15T14:30:00Z',
      type: 'text',
      status: 'read'
    },
    unreadCount: 0,
    status: 'active',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T14:30:00Z',
    missionId: 1,
    missionTitle: 'Préparation physique équipe senior',
    priority: 'normal',
    tags: ['mission', 'football'],
    archived: false
  },
  {
    id: 2,
    participants: [
      { id: 3, name: 'Marie Martin', type: 'professional', avatar: null },
      { id: 4, name: 'Centre Aquatique Municipal', type: 'organisation', avatar: null }
    ],
    lastMessage: {
      id: 102,
      senderId: 4,
      content: 'Parfait, nous confirmons votre intervention pour demain à 15h.',
      timestamp: '2024-01-15T16:45:00Z',
      type: 'text',
      status: 'delivered'
    },
    unreadCount: 2,
    status: 'active',
    createdAt: '2024-01-14T09:15:00Z',
    updatedAt: '2024-01-15T16:45:00Z',
    missionId: 2,
    missionTitle: 'Cours d\'aquagym',
    priority: 'high',
    tags: ['mission', 'natation', 'urgent'],
    archived: false
  },
  {
    id: 3,
    participants: [
      { id: 5, name: 'Pierre Durand', type: 'professional', avatar: null },
      { id: 6, name: 'Salle de Sport Elite', type: 'organisation', avatar: null }
    ],
    lastMessage: {
      id: 103,
      senderId: 5,
      content: 'Je ne pourrai malheureusement pas assurer la séance de demain.',
      timestamp: '2024-01-15T18:20:00Z',
      type: 'text',
      status: 'sent'
    },
    unreadCount: 1,
    status: 'active',
    createdAt: '2024-01-13T14:30:00Z',
    updatedAt: '2024-01-15T18:20:00Z',
    missionId: 3,
    missionTitle: 'Coaching personnel',
    priority: 'high',
    tags: ['mission', 'fitness', 'annulation'],
    archived: false
  }
];

const mockMessages = [
  {
    id: 101,
    conversationId: 1,
    senderId: 1,
    senderName: 'Jean Dupont',
    senderType: 'professional',
    content: 'Bonjour, je suis intéressé par votre mission de préparation physique.',
    timestamp: '2024-01-15T14:30:00Z',
    type: 'text',
    status: 'read',
    attachments: [],
    edited: false,
    editedAt: null
  },
  {
    id: 102,
    conversationId: 2,
    senderId: 4,
    senderName: 'Centre Aquatique Municipal',
    senderType: 'organisation',
    content: 'Parfait, nous confirmons votre intervention pour demain à 15h.',
    timestamp: '2024-01-15T16:45:00Z',
    type: 'text',
    status: 'delivered',
    attachments: [],
    edited: false,
    editedAt: null
  },
  {
    id: 103,
    conversationId: 3,
    senderId: 5,
    senderName: 'Pierre Durand',
    senderType: 'professional',
    content: 'Je ne pourrai malheureusement pas assurer la séance de demain.',
    timestamp: '2024-01-15T18:20:00Z',
    type: 'text',
    status: 'sent',
    attachments: [],
    edited: false,
    editedAt: null
  }
];

const mockReports = [
  {
    id: 1,
    reporterId: 2,
    reporterName: 'Club de Football Paris',
    reporterType: 'organisation',
    reportedUserId: 7,
    reportedUserName: 'Alex Problème',
    reportedUserType: 'professional',
    conversationId: 4,
    messageId: 104,
    reason: 'inappropriate_content',
    description: 'Messages inappropriés et non professionnels',
    status: 'pending',
    priority: 'high',
    createdAt: '2024-01-15T10:30:00Z',
    reviewedAt: null,
    reviewedBy: null,
    resolution: null,
    evidence: [
      { type: 'screenshot', url: '/evidence/screenshot1.png' },
      { type: 'message_history', data: 'Historique des messages problématiques' }
    ]
  },
  {
    id: 2,
    reporterId: 8,
    reporterName: 'Sophie Léger',
    reporterType: 'professional',
    reportedUserId: 9,
    reportedUserName: 'Organisation Douteuse',
    reportedUserType: 'organisation',
    conversationId: 5,
    messageId: 105,
    reason: 'spam',
    description: 'Envoi répétitif de messages publicitaires',
    status: 'resolved',
    priority: 'medium',
    createdAt: '2024-01-14T15:20:00Z',
    reviewedAt: '2024-01-15T09:00:00Z',
    reviewedBy: 'admin',
    resolution: 'Utilisateur averti et messages supprimés',
    evidence: []
  }
];

const initialState = {
  // Conversations
  conversations: mockConversations,
  filteredConversations: mockConversations,
  selectedConversation: null,
  
  // Messages
  messages: mockMessages,
  conversationMessages: {},
  
  // Signalements
  reports: mockReports,
  filteredReports: mockReports,
  selectedReport: null,
  
  // Filtres et recherche
  searchQuery: '',
  filters: {
    status: 'all', // all, active, archived
    priority: 'all', // all, high, normal, low
    type: 'all', // all, mission, support, general
    unreadOnly: false,
    dateRange: null
  },
  reportFilters: {
    status: 'all', // all, pending, resolved, dismissed
    priority: 'all', // all, high, medium, low
    reason: 'all' // all, inappropriate_content, spam, harassment, other
  },
  
  // Pagination et tri
  pagination: {
    page: 0,
    pageSize: 25
  },
  sortModel: [
    {
      field: 'updatedAt',
      sort: 'desc'
    }
  ],
  
  // États de l'interface
  loading: false,
  error: null,
  selectedTab: 0, // 0: conversations, 1: signalements
  
  // Statistiques
  stats: {
    totalConversations: mockConversations.length,
    activeConversations: mockConversations.filter(c => c.status === 'active').length,
    unreadMessages: mockConversations.reduce((sum, c) => sum + c.unreadCount, 0),
    totalReports: mockReports.length,
    pendingReports: mockReports.filter(r => r.status === 'pending').length,
    resolvedReports: mockReports.filter(r => r.status === 'resolved').length,
    averageResponseTime: '2h 30min',
    messagesPerDay: 45
  }
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    // Gestion des conversations
    setSelectedConversation: (state, action) => {
      state.selectedConversation = action.payload;
    },
    
    archiveConversation: (state, action) => {
      const conversationId = action.payload;
      const conversation = state.conversations.find(c => c.id === conversationId);
      if (conversation) {
        conversation.archived = true;
        conversation.status = 'archived';
        conversation.updatedAt = new Date().toISOString();
      }
      messagesSlice.caseReducers.applyFilters(state);
    },
    
    unarchiveConversation: (state, action) => {
      const conversationId = action.payload;
      const conversation = state.conversations.find(c => c.id === conversationId);
      if (conversation) {
        conversation.archived = false;
        conversation.status = 'active';
        conversation.updatedAt = new Date().toISOString();
      }
      messagesSlice.caseReducers.applyFilters(state);
    },
    
    deleteConversation: (state, action) => {
      const conversationId = action.payload;
      state.conversations = state.conversations.filter(c => c.id !== conversationId);
      state.messages = state.messages.filter(m => m.conversationId !== conversationId);
      if (state.selectedConversation?.id === conversationId) {
        state.selectedConversation = null;
      }
      messagesSlice.caseReducers.applyFilters(state);
    },
    
    updateConversationPriority: (state, action) => {
      const { id, priority } = action.payload;
      const conversation = state.conversations.find(c => c.id === id);
      if (conversation) {
        conversation.priority = priority;
        conversation.updatedAt = new Date().toISOString();
      }
      messagesSlice.caseReducers.applyFilters(state);
    },
    
    addConversationTag: (state, action) => {
      const { id, tag } = action.payload;
      const conversation = state.conversations.find(c => c.id === id);
      if (conversation && !conversation.tags.includes(tag)) {
        conversation.tags.push(tag);
        conversation.updatedAt = new Date().toISOString();
      }
    },
    
    removeConversationTag: (state, action) => {
      const { id, tag } = action.payload;
      const conversation = state.conversations.find(c => c.id === id);
      if (conversation) {
        conversation.tags = conversation.tags.filter(t => t !== tag);
        conversation.updatedAt = new Date().toISOString();
      }
    },
    
    // Gestion des messages
    addMessage: (state, action) => {
      const message = {
        ...action.payload,
        id: Date.now(),
        timestamp: new Date().toISOString(),
        status: 'sent'
      };
      state.messages.push(message);
      
      // Mettre à jour la conversation
      const conversation = state.conversations.find(c => c.id === message.conversationId);
      if (conversation) {
        conversation.lastMessage = message;
        conversation.updatedAt = message.timestamp;
      }
    },
    
    deleteMessage: (state, action) => {
      const messageId = action.payload;
      state.messages = state.messages.filter(m => m.id !== messageId);
    },
    
    editMessage: (state, action) => {
      const { id, content } = action.payload;
      const message = state.messages.find(m => m.id === id);
      if (message) {
        message.content = content;
        message.edited = true;
        message.editedAt = new Date().toISOString();
      }
    },
    
    markMessageAsRead: (state, action) => {
      const messageId = action.payload;
      const message = state.messages.find(m => m.id === messageId);
      if (message) {
        message.status = 'read';
      }
    },
    
    // Gestion des signalements
    setSelectedReport: (state, action) => {
      state.selectedReport = action.payload;
    },
    
    addReport: (state, action) => {
      const report = {
        ...action.payload,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        status: 'pending'
      };
      state.reports.push(report);
      messagesSlice.caseReducers.applyReportFilters(state);
    },
    
    updateReportStatus: (state, action) => {
      const { id, status, resolution, reviewedBy } = action.payload;
      const report = state.reports.find(r => r.id === id);
      if (report) {
        report.status = status;
        report.resolution = resolution || null;
        report.reviewedBy = reviewedBy || null;
        report.reviewedAt = new Date().toISOString();
      }
      messagesSlice.caseReducers.applyReportFilters(state);
    },
    
    deleteReport: (state, action) => {
      const reportId = action.payload;
      state.reports = state.reports.filter(r => r.id !== reportId);
      if (state.selectedReport?.id === reportId) {
        state.selectedReport = null;
      }
      messagesSlice.caseReducers.applyReportFilters(state);
    },
    
    // Recherche et filtres
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      messagesSlice.caseReducers.applyFilters(state);
    },
    
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      messagesSlice.caseReducers.applyFilters(state);
    },
    
    setReportFilters: (state, action) => {
      state.reportFilters = { ...state.reportFilters, ...action.payload };
      messagesSlice.caseReducers.applyReportFilters(state);
    },
    
    clearFilters: (state) => {
      state.filters = {
        status: 'all',
        priority: 'all',
        type: 'all',
        unreadOnly: false,
        dateRange: null
      };
      state.searchQuery = '';
      messagesSlice.caseReducers.applyFilters(state);
    },
    
    clearReportFilters: (state) => {
      state.reportFilters = {
        status: 'all',
        priority: 'all',
        reason: 'all'
      };
      messagesSlice.caseReducers.applyReportFilters(state);
    },
    
    applyFilters: (state) => {
      let filtered = [...state.conversations];
      
      // Recherche textuelle
      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase();
        filtered = filtered.filter(conversation =>
          conversation.participants.some(p => p.name.toLowerCase().includes(query)) ||
          conversation.lastMessage.content.toLowerCase().includes(query) ||
          conversation.missionTitle?.toLowerCase().includes(query) ||
          conversation.tags.some(tag => tag.toLowerCase().includes(query))
        );
      }
      
      // Filtres
      if (state.filters.status !== 'all') {
        filtered = filtered.filter(c => c.status === state.filters.status);
      }
      
      if (state.filters.priority !== 'all') {
        filtered = filtered.filter(c => c.priority === state.filters.priority);
      }
      
      if (state.filters.unreadOnly) {
        filtered = filtered.filter(c => c.unreadCount > 0);
      }
      
      if (state.filters.dateRange) {
        const { start, end } = state.filters.dateRange;
        filtered = filtered.filter(c => {
          const date = new Date(c.updatedAt);
          return date >= new Date(start) && date <= new Date(end);
        });
      }
      
      state.filteredConversations = filtered;
    },
    
    applyReportFilters: (state) => {
      let filtered = [...state.reports];
      
      if (state.reportFilters.status !== 'all') {
        filtered = filtered.filter(r => r.status === state.reportFilters.status);
      }
      
      if (state.reportFilters.priority !== 'all') {
        filtered = filtered.filter(r => r.priority === state.reportFilters.priority);
      }
      
      if (state.reportFilters.reason !== 'all') {
        filtered = filtered.filter(r => r.reason === state.reportFilters.reason);
      }
      
      state.filteredReports = filtered;
    },
    
    // Pagination et tri
    setPagination: (state, action) => {
      state.pagination = action.payload;
    },
    
    setSortModel: (state, action) => {
      state.sortModel = action.payload;
    },
    
    // États de l'interface
    setSelectedTab: (state, action) => {
      state.selectedTab = action.payload;
    },
    
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
        totalConversations: state.conversations.length,
        activeConversations: state.conversations.filter(c => c.status === 'active').length,
        unreadMessages: state.conversations.reduce((sum, c) => sum + c.unreadCount, 0),
        totalReports: state.reports.length,
        pendingReports: state.reports.filter(r => r.status === 'pending').length,
        resolvedReports: state.reports.filter(r => r.status === 'resolved').length,
        averageResponseTime: '2h 30min',
        messagesPerDay: 45
      };
    }
  }
});

export const {
  setSelectedConversation,
  archiveConversation,
  unarchiveConversation,
  deleteConversation,
  updateConversationPriority,
  addConversationTag,
  removeConversationTag,
  addMessage,
  deleteMessage,
  editMessage,
  markMessageAsRead,
  setSelectedReport,
  addReport,
  updateReportStatus,
  deleteReport,
  setSearchQuery,
  setFilters,
  setReportFilters,
  clearFilters,
  clearReportFilters,
  setPagination,
  setSortModel,
  setSelectedTab,
  setLoading,
  setError,
  clearError,
  updateStats
} = messagesSlice.actions;

export default messagesSlice.reducer;