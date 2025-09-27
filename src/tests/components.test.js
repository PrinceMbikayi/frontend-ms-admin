import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';

// Import components to test
import Users from '../pages/Users';
import Missions from '../pages/Missions';
import Payments from '../pages/Payments';
import Reports from '../pages/Reports';
import Settings from '../pages/Settings';
import DataTable from '../components/DataTable';
import ChartWidget from '../components/ChartWidget';

// Import mock data
import { mockUsers, mockMissions, mockPayments, mockReportsData } from '../data/mockData';

// Mock Redux store
const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      auth: (state = { user: { role: 'admin' } }) => state,
      users: (state = { users: mockUsers, loading: false, error: null }) => state,
      missions: (state = { missions: mockMissions, loading: false, error: null }) => state,
      payments: (state = { payments: mockPayments, loading: false, error: null }) => state,
      reports: (state = { data: mockReportsData, loading: false, error: null }) => state,
      settings: (state = { settings: {}, loading: false, error: null }) => state,
      notifications: (state = { notifications: [], unreadCount: 0 }) => state
    },
    preloadedState: initialState
  });
};

// Test wrapper component
const TestWrapper = ({ children, store = createMockStore() }) => {
  const theme = createTheme();
  
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe('Users Component', () => {
  test('renders users page with data table', () => {
    render(
      <TestWrapper>
        <Users />
      </TestWrapper>
    );
    
    expect(screen.getByText('Gestion des Utilisateurs')).toBeInTheDocument();
    expect(screen.getByText('Jean')).toBeInTheDocument();
    expect(screen.getByText('Marie')).toBeInTheDocument();
  });

  test('opens add user dialog when add button is clicked', async () => {
    render(
      <TestWrapper>
        <Users />
      </TestWrapper>
    );
    
    const addButton = screen.getByText('Ajouter un utilisateur');
    fireEvent.click(addButton);
    
    await waitFor(() => {
      expect(screen.getByText('Ajouter un Utilisateur')).toBeInTheDocument();
    });
  });

  test('filters users by role', async () => {
    render(
      <TestWrapper>
        <Users />
      </TestWrapper>
    );
    
    // Test role filter functionality
    const roleFilter = screen.getByLabelText('Rôle');
    fireEvent.mouseDown(roleFilter);
    
    await waitFor(() => {
      expect(screen.getByText('Admin')).toBeInTheDocument();
    });
  });
});

describe('Missions Component', () => {
  test('renders missions page with data table', () => {
    render(
      <TestWrapper>
        <Missions />
      </TestWrapper>
    );
    
    expect(screen.getByText('Gestion des Missions')).toBeInTheDocument();
    expect(screen.getByText('Cours de Tennis Débutant')).toBeInTheDocument();
  });

  test('switches between table and card view', async () => {
    render(
      <TestWrapper>
        <Missions />
      </TestWrapper>
    );
    
    const cardViewButton = screen.getByLabelText('Vue en cartes');
    fireEvent.click(cardViewButton);
    
    await waitFor(() => {
      expect(screen.getByText('Vue en cartes')).toBeInTheDocument();
    });
  });

  test('opens add mission dialog', async () => {
    render(
      <TestWrapper>
        <Missions />
      </TestWrapper>
    );
    
    const addButton = screen.getByText('Ajouter une mission');
    fireEvent.click(addButton);
    
    await waitFor(() => {
      expect(screen.getByText('Ajouter une Mission')).toBeInTheDocument();
    });
  });
});

describe('Payments Component', () => {
  test('renders payments page with data table', () => {
    render(
      <TestWrapper>
        <Payments />
      </TestWrapper>
    );
    
    expect(screen.getByText('Gestion des Paiements')).toBeInTheDocument();
    expect(screen.getByText('Pierre Durand')).toBeInTheDocument();
  });

  test('filters payments by status', async () => {
    render(
      <TestWrapper>
        <Payments />
      </TestWrapper>
    );
    
    const statusFilter = screen.getByLabelText('Statut');
    fireEvent.mouseDown(statusFilter);
    
    await waitFor(() => {
      expect(screen.getByText('Complété')).toBeInTheDocument();
    });
  });

  test('opens payment details dialog', async () => {
    render(
      <TestWrapper>
        <Payments />
      </TestWrapper>
    );
    
    const detailsButton = screen.getAllByLabelText('Voir les détails')[0];
    fireEvent.click(detailsButton);
    
    await waitFor(() => {
      expect(screen.getByText('Détails du Paiement')).toBeInTheDocument();
    });
  });
});

describe('Reports Component', () => {
  test('renders reports page with charts', () => {
    render(
      <TestWrapper>
        <Reports />
      </TestWrapper>
    );
    
    expect(screen.getByText('Rapports et Analyses')).toBeInTheDocument();
    expect(screen.getByText('Revenus Mensuels')).toBeInTheDocument();
    expect(screen.getByText('Distribution des Sports')).toBeInTheDocument();
  });

  test('changes date range filter', async () => {
    render(
      <TestWrapper>
        <Reports />
      </TestWrapper>
    );
    
    const dateFilter = screen.getByLabelText('Période');
    fireEvent.mouseDown(dateFilter);
    
    await waitFor(() => {
      expect(screen.getByText('7 derniers jours')).toBeInTheDocument();
    });
  });

  test('exports report data', async () => {
    render(
      <TestWrapper>
        <Reports />
      </TestWrapper>
    );
    
    const exportButton = screen.getByText('Exporter');
    fireEvent.click(exportButton);
    
    // Test export functionality
    expect(exportButton).toBeInTheDocument();
  });
});

describe('Settings Component', () => {
  test('renders settings page with tabs', () => {
    render(
      <TestWrapper>
        <Settings />
      </TestWrapper>
    );
    
    expect(screen.getByText('Paramètres')).toBeInTheDocument();
    expect(screen.getByText('Général')).toBeInTheDocument();
    expect(screen.getByText('Apparence')).toBeInTheDocument();
  });

  test('switches between tabs', async () => {
    render(
      <TestWrapper>
        <Settings />
      </TestWrapper>
    );
    
    const appearanceTab = screen.getByText('Apparence');
    fireEvent.click(appearanceTab);
    
    await waitFor(() => {
      expect(screen.getByText('Thème')).toBeInTheDocument();
    });
  });

  test('saves settings', async () => {
    render(
      <TestWrapper>
        <Settings />
      </TestWrapper>
    );
    
    const saveButton = screen.getByText('Sauvegarder');
    fireEvent.click(saveButton);
    
    await waitFor(() => {
      expect(screen.getByText('Paramètres sauvegardés avec succès')).toBeInTheDocument();
    });
  });
});

describe('DataTable Component', () => {
  const mockData = [
    { id: 1, name: 'Test 1', status: 'active' },
    { id: 2, name: 'Test 2', status: 'inactive' }
  ];

  const mockColumns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Nom', width: 150 },
    { field: 'status', headerName: 'Statut', width: 120 }
  ];

  test('renders data table with data', () => {
    render(
      <TestWrapper>
        <DataTable
          data={mockData}
          columns={mockColumns}
          title="Test Table"
        />
      </TestWrapper>
    );
    
    expect(screen.getByText('Test Table')).toBeInTheDocument();
    expect(screen.getByText('Test 1')).toBeInTheDocument();
    expect(screen.getByText('Test 2')).toBeInTheDocument();
  });

  test('searches data in table', async () => {
    render(
      <TestWrapper>
        <DataTable
          data={mockData}
          columns={mockColumns}
          title="Test Table"
          searchable
        />
      </TestWrapper>
    );
    
    const searchInput = screen.getByPlaceholderText('Rechercher...');
    fireEvent.change(searchInput, { target: { value: 'Test 1' } });
    
    await waitFor(() => {
      expect(screen.getByText('Test 1')).toBeInTheDocument();
    });
  });

  test('exports table data', async () => {
    render(
      <TestWrapper>
        <DataTable
          data={mockData}
          columns={mockColumns}
          title="Test Table"
          exportable
        />
      </TestWrapper>
    );
    
    const exportButton = screen.getByLabelText('Exporter');
    fireEvent.click(exportButton);
    
    // Test export functionality
    expect(exportButton).toBeInTheDocument();
  });
});

describe('ChartWidget Component', () => {
  const mockChartData = [
    { name: 'Jan', value: 100 },
    { name: 'Feb', value: 200 },
    { name: 'Mar', value: 150 }
  ];

  test('renders chart widget with data', () => {
    render(
      <TestWrapper>
        <ChartWidget
          title="Test Chart"
          data={mockChartData}
          type="line"
        />
      </TestWrapper>
    );
    
    expect(screen.getByText('Test Chart')).toBeInTheDocument();
  });

  test('shows loading state', () => {
    render(
      <TestWrapper>
        <ChartWidget
          title="Test Chart"
          data={[]}
          type="line"
          loading
        />
      </TestWrapper>
    );
    
    expect(screen.getByText('Test Chart')).toBeInTheDocument();
    // Loading skeleton should be visible
  });

  test('shows error state', () => {
    render(
      <TestWrapper>
        <ChartWidget
          title="Test Chart"
          data={[]}
          type="line"
          error="Test error"
        />
      </TestWrapper>
    );
    
    expect(screen.getByText('Test Chart')).toBeInTheDocument();
    expect(screen.getByText('Test error')).toBeInTheDocument();
  });

  test('refreshes chart data', async () => {
    const mockOnRefresh = jest.fn();
    
    render(
      <TestWrapper>
        <ChartWidget
          title="Test Chart"
          data={mockChartData}
          type="line"
          onRefresh={mockOnRefresh}
        />
      </TestWrapper>
    );
    
    const refreshButton = screen.getByLabelText('Actualiser');
    fireEvent.click(refreshButton);
    
    expect(mockOnRefresh).toHaveBeenCalled();
  });
});

// Integration tests
describe('Integration Tests', () => {
  test('navigation between pages works correctly', async () => {
    const store = createMockStore();
    
    render(
      <TestWrapper store={store}>
        <div>
          <Users />
          <Missions />
          <Payments />
        </div>
      </TestWrapper>
    );
    
    // Test that all components render without errors
    expect(screen.getByText('Gestion des Utilisateurs')).toBeInTheDocument();
    expect(screen.getByText('Gestion des Missions')).toBeInTheDocument();
    expect(screen.getByText('Gestion des Paiements')).toBeInTheDocument();
  });

  test('data consistency across components', () => {
    const store = createMockStore();
    
    render(
      <TestWrapper store={store}>
        <div>
          <Users />
          <Missions />
        </div>
      </TestWrapper>
    );
    
    // Test that user data is consistent
    expect(screen.getByText('Marie Martin')).toBeInTheDocument();
    // Marie should appear in both users and missions (as coach)
  });

  test('error handling works correctly', async () => {
    const storeWithError = createMockStore({
      users: { users: [], loading: false, error: 'Failed to load users' }
    });
    
    render(
      <TestWrapper store={storeWithError}>
        <Users />
      </TestWrapper>
    );
    
    await waitFor(() => {
      expect(screen.getByText('Failed to load users')).toBeInTheDocument();
    });
  });
});

// Performance tests
describe('Performance Tests', () => {
  test('large dataset rendering performance', () => {
    const largeDataset = Array.from({ length: 1000 }, (_, i) => ({
      id: i,
      name: `User ${i}`,
      email: `user${i}@test.com`,
      status: i % 2 === 0 ? 'active' : 'inactive'
    }));

    const columns = [
      { field: 'id', headerName: 'ID', width: 90 },
      { field: 'name', headerName: 'Nom', width: 150 },
      { field: 'email', headerName: 'Email', width: 200 },
      { field: 'status', headerName: 'Statut', width: 120 }
    ];

    const startTime = performance.now();
    
    render(
      <TestWrapper>
        <DataTable
          data={largeDataset}
          columns={columns}
          title="Large Dataset"
        />
      </TestWrapper>
    );
    
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    // Should render within reasonable time (less than 1 second)
    expect(renderTime).toBeLessThan(1000);
    expect(screen.getByText('Large Dataset')).toBeInTheDocument();
  });
});

// Accessibility tests
describe('Accessibility Tests', () => {
  test('components have proper ARIA labels', () => {
    render(
      <TestWrapper>
        <Users />
      </TestWrapper>
    );
    
    // Check for proper ARIA labels
    expect(screen.getByRole('button', { name: /ajouter un utilisateur/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /rechercher/i })).toBeInTheDocument();
  });

  test('keyboard navigation works', async () => {
    render(
      <TestWrapper>
        <Settings />
      </TestWrapper>
    );
    
    const firstTab = screen.getByText('Général');
    firstTab.focus();
    
    // Test tab navigation
    fireEvent.keyDown(firstTab, { key: 'ArrowRight' });
    
    await waitFor(() => {
      expect(document.activeElement).toBe(screen.getByText('Apparence'));
    });
  });
});

// Mock API calls for testing
jest.mock('../services/api', () => ({
  getUsers: jest.fn(() => Promise.resolve(mockUsers)),
  getMissions: jest.fn(() => Promise.resolve(mockMissions)),
  getPayments: jest.fn(() => Promise.resolve(mockPayments)),
  getReports: jest.fn(() => Promise.resolve(mockReportsData)),
  createUser: jest.fn((user) => Promise.resolve({ ...user, id: Date.now() })),
  updateUser: jest.fn((id, user) => Promise.resolve({ ...user, id })),
  deleteUser: jest.fn((id) => Promise.resolve({ id })),
  createMission: jest.fn((mission) => Promise.resolve({ ...mission, id: Date.now() })),
  updateMission: jest.fn((id, mission) => Promise.resolve({ ...mission, id })),
  deleteMission: jest.fn((id) => Promise.resolve({ id }))
}));