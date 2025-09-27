// Mock data for the Mission Sport Admin application

// Users Mock Data
export const mockUsers = [
  {
    id: 1,
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@email.com',
    phone: '+33 6 12 34 56 78',
    role: 'admin',
    status: 'active',
    avatar: 'https://i.pravatar.cc/150?img=1',
    createdAt: '2024-01-15T10:30:00Z',
    lastLogin: '2024-01-20T14:22:00Z',
    missions: 15,
    totalEarnings: 2450.00
  },
  {
    id: 2,
    firstName: 'Marie',
    lastName: 'Martin',
    email: 'marie.martin@email.com',
    phone: '+33 6 23 45 67 89',
    role: 'coach',
    status: 'active',
    avatar: 'https://i.pravatar.cc/150?img=2',
    createdAt: '2024-01-10T09:15:00Z',
    lastLogin: '2024-01-20T16:45:00Z',
    missions: 8,
    totalEarnings: 1200.00
  },
  {
    id: 3,
    firstName: 'Pierre',
    lastName: 'Durand',
    email: 'pierre.durand@email.com',
    phone: '+33 6 34 56 78 90',
    role: 'user',
    status: 'inactive',
    avatar: 'https://i.pravatar.cc/150?img=3',
    createdAt: '2024-01-05T11:20:00Z',
    lastLogin: '2024-01-18T10:30:00Z',
    missions: 3,
    totalEarnings: 450.00
  },
  {
    id: 4,
    firstName: 'Sophie',
    lastName: 'Bernard',
    email: 'sophie.bernard@email.com',
    phone: '+33 6 45 67 89 01',
    role: 'coach',
    status: 'active',
    avatar: 'https://i.pravatar.cc/150?img=4',
    createdAt: '2024-01-12T14:45:00Z',
    lastLogin: '2024-01-20T12:15:00Z',
    missions: 12,
    totalEarnings: 1800.00
  },
  {
    id: 5,
    firstName: 'Thomas',
    lastName: 'Petit',
    email: 'thomas.petit@email.com',
    phone: '+33 6 56 78 90 12',
    role: 'user',
    status: 'active',
    avatar: 'https://i.pravatar.cc/150?img=5',
    createdAt: '2024-01-08T16:30:00Z',
    lastLogin: '2024-01-19T18:20:00Z',
    missions: 5,
    totalEarnings: 750.00
  }
];

// Missions Mock Data
export const mockMissions = [
  {
    id: 1,
    title: 'Cours de Tennis Débutant',
    description: 'Initiation au tennis pour enfants de 6 à 12 ans',
    sport: 'Tennis',
    level: 'Débutant',
    duration: 60,
    price: 45.00,
    location: 'Club de Tennis de Paris',
    address: '15 Avenue des Champs, 75008 Paris',
    date: '2024-01-25T14:00:00Z',
    status: 'active',
    coachId: 2,
    coachName: 'Marie Martin',
    participants: 8,
    maxParticipants: 10,
    category: 'Cours collectif',
    equipment: ['Raquettes fournies', 'Balles'],
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    title: 'Entraînement Football Avancé',
    description: 'Session d\'entraînement intensif pour joueurs confirmés',
    sport: 'Football',
    level: 'Avancé',
    duration: 90,
    price: 35.00,
    location: 'Stade Municipal',
    address: '22 Rue du Sport, 75012 Paris',
    date: '2024-01-26T18:30:00Z',
    status: 'active',
    coachId: 4,
    coachName: 'Sophie Bernard',
    participants: 15,
    maxParticipants: 20,
    category: 'Entraînement',
    equipment: ['Ballons', 'Cônes', 'Chasubles'],
    createdAt: '2024-01-12T14:45:00Z'
  },
  {
    id: 3,
    title: 'Yoga Matinal',
    description: 'Séance de yoga relaxante pour bien commencer la journée',
    sport: 'Yoga',
    level: 'Tous niveaux',
    duration: 75,
    price: 25.00,
    location: 'Studio Zen',
    address: '8 Place de la Paix, 75011 Paris',
    date: '2024-01-27T08:00:00Z',
    status: 'completed',
    coachId: 2,
    coachName: 'Marie Martin',
    participants: 12,
    maxParticipants: 15,
    category: 'Bien-être',
    equipment: ['Tapis fournis', 'Blocs'],
    createdAt: '2024-01-10T09:15:00Z'
  },
  {
    id: 4,
    title: 'Natation Perfectionnement',
    description: 'Amélioration de la technique de nage pour nageurs intermédiaires',
    sport: 'Natation',
    level: 'Intermédiaire',
    duration: 60,
    price: 40.00,
    location: 'Piscine Olympique',
    address: '30 Boulevard Aquatique, 75015 Paris',
    date: '2024-01-28T19:00:00Z',
    status: 'cancelled',
    coachId: 4,
    coachName: 'Sophie Bernard',
    participants: 0,
    maxParticipants: 8,
    category: 'Cours technique',
    equipment: ['Planches', 'Pull-buoys'],
    createdAt: '2024-01-08T16:30:00Z'
  },
  {
    id: 5,
    title: 'Course à Pied Endurance',
    description: 'Entraînement d\'endurance en groupe dans le Bois de Boulogne',
    sport: 'Course à pied',
    level: 'Intermédiaire',
    duration: 45,
    price: 20.00,
    location: 'Bois de Boulogne',
    address: 'Entrée Porte Dauphine, 75016 Paris',
    date: '2024-01-29T07:30:00Z',
    status: 'active',
    coachId: 2,
    coachName: 'Marie Martin',
    participants: 6,
    maxParticipants: 12,
    category: 'Entraînement',
    equipment: ['Chronomètre', 'Balisage'],
    createdAt: '2024-01-05T11:20:00Z'
  }
];

// Payments Mock Data
export const mockPayments = [
  {
    id: 1,
    userId: 3,
    userName: 'Pierre Durand',
    missionId: 1,
    missionTitle: 'Cours de Tennis Débutant',
    amount: 45.00,
    currency: 'EUR',
    status: 'completed',
    method: 'card',
    transactionId: 'txn_1234567890',
    createdAt: '2024-01-20T14:30:00Z',
    completedAt: '2024-01-20T14:30:15Z',
    description: 'Paiement cours de tennis',
    fees: 2.25
  },
  {
    id: 2,
    userId: 5,
    userName: 'Thomas Petit',
    missionId: 2,
    missionTitle: 'Entraînement Football Avancé',
    amount: 35.00,
    currency: 'EUR',
    status: 'pending',
    method: 'paypal',
    transactionId: 'txn_0987654321',
    createdAt: '2024-01-19T16:45:00Z',
    completedAt: null,
    description: 'Paiement entraînement football',
    fees: 1.75
  },
  {
    id: 3,
    userId: 2,
    userName: 'Marie Martin',
    missionId: 3,
    missionTitle: 'Yoga Matinal',
    amount: 25.00,
    currency: 'EUR',
    status: 'completed',
    method: 'card',
    transactionId: 'txn_1122334455',
    createdAt: '2024-01-18T10:15:00Z',
    completedAt: '2024-01-18T10:15:08Z',
    description: 'Paiement séance yoga',
    fees: 1.25
  },
  {
    id: 4,
    userId: 4,
    userName: 'Sophie Bernard',
    missionId: 4,
    missionTitle: 'Natation Perfectionnement',
    amount: 40.00,
    currency: 'EUR',
    status: 'failed',
    method: 'card',
    transactionId: 'txn_5566778899',
    createdAt: '2024-01-17T12:20:00Z',
    completedAt: null,
    description: 'Paiement cours natation',
    fees: 2.00,
    errorMessage: 'Carte expirée'
  },
  {
    id: 5,
    userId: 1,
    userName: 'Jean Dupont',
    missionId: 5,
    missionTitle: 'Course à Pied Endurance',
    amount: 20.00,
    currency: 'EUR',
    status: 'refunded',
    method: 'card',
    transactionId: 'txn_9988776655',
    createdAt: '2024-01-16T08:30:00Z',
    completedAt: '2024-01-16T08:30:12Z',
    refundedAt: '2024-01-17T14:20:00Z',
    description: 'Paiement course à pied',
    fees: 1.00,
    refundReason: 'Annulation par le client'
  }
];

// Reports Mock Data
export const mockReportsData = {
  // Revenue data for charts
  revenueData: [
    { name: 'Jan', value: 4000, users: 240, missions: 45 },
    { name: 'Fév', value: 3000, users: 198, missions: 38 },
    { name: 'Mar', value: 5000, users: 320, missions: 62 },
    { name: 'Avr', value: 4500, users: 280, missions: 55 },
    { name: 'Mai', value: 6000, users: 380, missions: 72 },
    { name: 'Jun', value: 5500, users: 350, missions: 68 },
    { name: 'Jul', value: 7000, users: 420, missions: 85 },
    { name: 'Aoû', value: 6500, users: 390, missions: 78 },
    { name: 'Sep', value: 5800, users: 360, missions: 70 },
    { name: 'Oct', value: 6200, users: 375, missions: 74 },
    { name: 'Nov', value: 5900, users: 365, missions: 71 },
    { name: 'Déc', value: 7200, users: 430, missions: 88 }
  ],
  
  // Sports distribution
  sportsData: [
    { name: 'Tennis', value: 35, color: '#1976d2' },
    { name: 'Football', value: 28, color: '#dc004e' },
    { name: 'Natation', value: 20, color: '#ff9800' },
    { name: 'Yoga', value: 12, color: '#4caf50' },
    { name: 'Course', value: 5, color: '#9c27b0' }
  ],
  
  // User growth
  userGrowthData: [
    { name: 'Sem 1', nouveaux: 12, actifs: 145 },
    { name: 'Sem 2', nouveaux: 18, actifs: 158 },
    { name: 'Sem 3', nouveaux: 15, actifs: 167 },
    { name: 'Sem 4', nouveaux: 22, actifs: 182 },
    { name: 'Sem 5', nouveaux: 19, actifs: 195 },
    { name: 'Sem 6', nouveaux: 25, actifs: 210 },
    { name: 'Sem 7', nouveaux: 21, actifs: 225 },
    { name: 'Sem 8', nouveaux: 28, actifs: 245 }
  ],
  
  // Mission completion rates
  completionData: [
    { name: 'Lun', completed: 85, cancelled: 15 },
    { name: 'Mar', completed: 92, cancelled: 8 },
    { name: 'Mer', completed: 78, cancelled: 22 },
    { name: 'Jeu', completed: 88, cancelled: 12 },
    { name: 'Ven', completed: 95, cancelled: 5 },
    { name: 'Sam', completed: 82, cancelled: 18 },
    { name: 'Dim', completed: 90, cancelled: 10 }
  ],
  
  // Payment methods
  paymentMethodsData: [
    { name: 'Carte bancaire', value: 65, color: '#1976d2' },
    { name: 'PayPal', value: 25, color: '#ff9800' },
    { name: 'Virement', value: 8, color: '#4caf50' },
    { name: 'Espèces', value: 2, color: '#757575' }
  ]
};

// Statistics Mock Data
export const mockStats = {
  totalUsers: 1247,
  activeUsers: 892,
  totalMissions: 156,
  completedMissions: 134,
  totalRevenue: 68450.00,
  monthlyRevenue: 7200.00,
  averageRating: 4.7,
  totalReviews: 523,
  conversionRate: 12.5,
  retentionRate: 78.3,
  averageSessionDuration: '24m 35s',
  bounceRate: 23.1
};

// Notifications Mock Data
export const mockNotifications = [
  {
    id: 1,
    type: 'info',
    title: 'Nouveau utilisateur inscrit',
    message: 'Thomas Petit s\'est inscrit sur la plateforme',
    timestamp: '2024-01-20T16:30:00Z',
    read: false,
    actionUrl: '/users/5'
  },
  {
    id: 2,
    type: 'warning',
    title: 'Mission annulée',
    message: 'La mission "Natation Perfectionnement" a été annulée',
    timestamp: '2024-01-20T14:15:00Z',
    read: false,
    actionUrl: '/missions/4'
  },
  {
    id: 3,
    type: 'success',
    title: 'Paiement reçu',
    message: 'Paiement de 45€ reçu pour le cours de tennis',
    timestamp: '2024-01-20T12:45:00Z',
    read: true,
    actionUrl: '/payments/1'
  },
  {
    id: 4,
    type: 'error',
    title: 'Échec de paiement',
    message: 'Le paiement de Sophie Bernard a échoué',
    timestamp: '2024-01-19T18:20:00Z',
    read: true,
    actionUrl: '/payments/4'
  }
];

// Settings Mock Data
export const mockSettings = {
  general: {
    siteName: 'Mission Sport Admin',
    siteDescription: 'Plateforme de gestion des missions sportives',
    contactEmail: 'admin@missionsport.fr',
    supportPhone: '+33 1 23 45 67 89',
    timezone: 'Europe/Paris',
    language: 'fr',
    currency: 'EUR'
  },
  appearance: {
    theme: 'light',
    primaryColor: '#1976d2',
    secondaryColor: '#dc004e',
    logoUrl: '',
    faviconUrl: ''
  },
  notifications: {
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    notifyNewUser: true,
    notifyNewMission: true,
    notifyPayment: true,
    notifySystemUpdates: false
  },
  security: {
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordMinLength: 8,
    passwordRequireSpecialChars: true,
    passwordRequireNumbers: true,
    passwordRequireUppercase: true,
    maxLoginAttempts: 5
  }
};

// Helper functions for mock data
export const getMockUserById = (id) => {
  return mockUsers.find(user => user.id === parseInt(id));
};

export const getMockMissionById = (id) => {
  return mockMissions.find(mission => mission.id === parseInt(id));
};

export const getMockPaymentById = (id) => {
  return mockPayments.find(payment => payment.id === parseInt(id));
};

export const getMockUsersByRole = (role) => {
  return mockUsers.filter(user => user.role === role);
};

export const getMockMissionsByStatus = (status) => {
  return mockMissions.filter(mission => mission.status === status);
};

export const getMockPaymentsByStatus = (status) => {
  return mockPayments.filter(payment => payment.status === status);
};

export const getMockMissionsByCoach = (coachId) => {
  return mockMissions.filter(mission => mission.coachId === parseInt(coachId));
};

export const getMockPaymentsByUser = (userId) => {
  return mockPayments.filter(payment => payment.userId === parseInt(userId));
};

// Generate random data for testing
export const generateRandomUser = () => {
  const firstNames = ['Jean', 'Marie', 'Pierre', 'Sophie', 'Thomas', 'Julie', 'Antoine', 'Camille'];
  const lastNames = ['Dupont', 'Martin', 'Durand', 'Bernard', 'Petit', 'Robert', 'Richard', 'Moreau'];
  const roles = ['user', 'coach', 'admin'];
  const statuses = ['active', 'inactive'];
  
  return {
    id: Date.now(),
    firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
    lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
    email: `user${Date.now()}@email.com`,
    phone: `+33 6 ${Math.floor(Math.random() * 90 + 10)} ${Math.floor(Math.random() * 90 + 10)} ${Math.floor(Math.random() * 90 + 10)} ${Math.floor(Math.random() * 90 + 10)}`,
    role: roles[Math.floor(Math.random() * roles.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70 + 1)}`,
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    missions: Math.floor(Math.random() * 20),
    totalEarnings: Math.floor(Math.random() * 3000)
  };
};

export const generateRandomMission = () => {
  const sports = ['Tennis', 'Football', 'Natation', 'Yoga', 'Course à pied', 'Basketball', 'Volleyball'];
  const levels = ['Débutant', 'Intermédiaire', 'Avancé', 'Tous niveaux'];
  const statuses = ['active', 'completed', 'cancelled'];
  const categories = ['Cours collectif', 'Entraînement', 'Bien-être', 'Cours technique'];
  
  return {
    id: Date.now(),
    title: `Cours de ${sports[Math.floor(Math.random() * sports.length)]}`,
    description: 'Description générée automatiquement',
    sport: sports[Math.floor(Math.random() * sports.length)],
    level: levels[Math.floor(Math.random() * levels.length)],
    duration: [30, 45, 60, 75, 90][Math.floor(Math.random() * 5)],
    price: Math.floor(Math.random() * 50 + 20),
    location: 'Lieu généré',
    address: 'Adresse générée',
    date: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    coachId: Math.floor(Math.random() * 5 + 1),
    coachName: 'Coach généré',
    participants: Math.floor(Math.random() * 15),
    maxParticipants: Math.floor(Math.random() * 10 + 15),
    category: categories[Math.floor(Math.random() * categories.length)],
    equipment: ['Équipement 1', 'Équipement 2'],
    createdAt: new Date().toISOString()
  };
};

export default {
  mockUsers,
  mockMissions,
  mockPayments,
  mockReportsData,
  mockStats,
  mockNotifications,
  mockSettings
};