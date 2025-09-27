import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mockSettings } from '../../data/mockData';

// Async thunks pour les actions asynchrones
export const fetchSettings = createAsyncThunk(
  'settings/fetchSettings',
  async (_, { rejectWithValue }) => {
    try {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockSettings;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateSettings = createAsyncThunk(
  'settings/updateSettings',
  async ({ category, settings }, { rejectWithValue }) => {
    try {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 500));
      return { category, settings };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const resetSettings = createAsyncThunk(
  'settings/resetSettings',
  async (category, { rejectWithValue }) => {
    try {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Valeurs par défaut pour chaque catégorie
      const defaultSettings = {
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
      
      return { category, settings: defaultSettings[category] };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const backupSettings = createAsyncThunk(
  'settings/backupSettings',
  async (_, { getState, rejectWithValue }) => {
    try {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const { settings } = getState().settings;
      const backup = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        settings: JSON.parse(JSON.stringify(settings)),
        version: '1.0.0'
      };
      
      return backup;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const restoreSettings = createAsyncThunk(
  'settings/restoreSettings',
  async (backupData, { rejectWithValue }) => {
    try {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 500));
      return backupData.settings;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const testEmailSettings = createAsyncThunk(
  'settings/testEmailSettings',
  async (emailConfig, { rejectWithValue }) => {
    try {
      // Simulation d'un test d'email
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulation d'un succès ou échec aléatoire pour les tests
      const success = Math.random() > 0.3;
      
      if (!success) {
        throw new Error('Échec de l\'envoi de l\'email de test');
      }
      
      return {
        success: true,
        message: 'Email de test envoyé avec succès',
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// État initial
const initialState = {
  settings: {
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
  },
  loading: false,
  error: null,
  saveStatus: 'idle', // 'idle', 'saving', 'saved', 'error'
  activeTab: 0,
  unsavedChanges: false,
  backups: [],
  testResults: {
    email: null,
    sms: null,
    push: null
  }
};

// Slice
const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    updateLocalSettings: (state, action) => {
      const { category, key, value } = action.payload;
      if (state.settings[category]) {
        state.settings[category][key] = value;
        state.unsavedChanges = true;
        state.saveStatus = 'idle';
      }
    },
    updateCategorySettings: (state, action) => {
      const { category, settings } = action.payload;
      if (state.settings[category]) {
        state.settings[category] = { ...state.settings[category], ...settings };
        state.unsavedChanges = true;
        state.saveStatus = 'idle';
      }
    },
    markChangesSaved: (state) => {
      state.unsavedChanges = false;
      state.saveStatus = 'saved';
    },
    clearSaveStatus: (state) => {
      state.saveStatus = 'idle';
    },
    clearError: (state) => {
      state.error = null;
    },
    clearTestResults: (state) => {
      state.testResults = {
        email: null,
        sms: null,
        push: null
      };
    },
    setTheme: (state, action) => {
      state.settings.appearance.theme = action.payload;
      // Appliquer le thème immédiatement
      document.documentElement.setAttribute('data-theme', action.payload);
    },
    toggleNotification: (state, action) => {
      const { type } = action.payload;
      if (state.settings.notifications.hasOwnProperty(type)) {
        state.settings.notifications[type] = !state.settings.notifications[type];
        state.unsavedChanges = true;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch settings
      .addCase(fetchSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = { ...state.settings, ...action.payload };
        state.unsavedChanges = false;
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update settings
      .addCase(updateSettings.pending, (state) => {
        state.saveStatus = 'saving';
        state.error = null;
      })
      .addCase(updateSettings.fulfilled, (state, action) => {
        state.saveStatus = 'saved';
        const { category, settings } = action.payload;
        if (state.settings[category]) {
          state.settings[category] = { ...state.settings[category], ...settings };
        }
        state.unsavedChanges = false;
        
        // Auto-clear save status after 3 seconds
        setTimeout(() => {
          state.saveStatus = 'idle';
        }, 3000);
      })
      .addCase(updateSettings.rejected, (state, action) => {
        state.saveStatus = 'error';
        state.error = action.payload;
      })
      
      // Reset settings
      .addCase(resetSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetSettings.fulfilled, (state, action) => {
        state.loading = false;
        const { category, settings } = action.payload;
        if (state.settings[category]) {
          state.settings[category] = settings;
        }
        state.unsavedChanges = true;
      })
      .addCase(resetSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Backup settings
      .addCase(backupSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(backupSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.backups.unshift(action.payload);
        // Garder seulement les 10 dernières sauvegardes
        if (state.backups.length > 10) {
          state.backups = state.backups.slice(0, 10);
        }
      })
      .addCase(backupSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Restore settings
      .addCase(restoreSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(restoreSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload;
        state.unsavedChanges = true;
      })
      .addCase(restoreSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Test email settings
      .addCase(testEmailSettings.pending, (state) => {
        state.testResults.email = { status: 'testing', message: 'Test en cours...' };
      })
      .addCase(testEmailSettings.fulfilled, (state, action) => {
        state.testResults.email = {
          status: 'success',
          message: action.payload.message,
          timestamp: action.payload.timestamp
        };
      })
      .addCase(testEmailSettings.rejected, (state, action) => {
        state.testResults.email = {
          status: 'error',
          message: action.payload,
          timestamp: new Date().toISOString()
        };
      });
  }
});

// Export actions
export const {
  setActiveTab,
  updateLocalSettings,
  updateCategorySettings,
  markChangesSaved,
  clearSaveStatus,
  clearError,
  clearTestResults,
  setTheme,
  toggleNotification
} = settingsSlice.actions;

// Selectors
export const selectSettings = (state) => state.settings.settings;
export const selectSettingsLoading = (state) => state.settings.loading;
export const selectSettingsError = (state) => state.settings.error;
export const selectSaveStatus = (state) => state.settings.saveStatus;
export const selectActiveTab = (state) => state.settings.activeTab;
export const selectUnsavedChanges = (state) => state.settings.unsavedChanges;
export const selectBackups = (state) => state.settings.backups;
export const selectTestResults = (state) => state.settings.testResults;

// Category-specific selectors
export const selectGeneralSettings = (state) => state.settings.settings.general;
export const selectAppearanceSettings = (state) => state.settings.settings.appearance;
export const selectNotificationSettings = (state) => state.settings.settings.notifications;
export const selectSecuritySettings = (state) => state.settings.settings.security;

// Theme selector
export const selectCurrentTheme = (state) => state.settings.settings.appearance.theme;

// Validation selectors
export const selectIsEmailConfigValid = (state) => {
  const general = state.settings.settings.general;
  return general.contactEmail && general.contactEmail.includes('@');
};

export const selectIsSecurityConfigValid = (state) => {
  const security = state.settings.settings.security;
  return (
    security.passwordMinLength >= 6 &&
    security.sessionTimeout > 0 &&
    security.maxLoginAttempts > 0
  );
};

export default settingsSlice.reducer;