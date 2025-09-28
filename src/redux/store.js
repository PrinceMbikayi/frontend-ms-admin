import { configureStore } from '@reduxjs/toolkit';

// Import slices
import authSlice from './slices/authSlice';
import usersSlice from './slices/usersSlice';
import missionsSlice from './slices/missionsSlice';
import organisationsSlice from './slices/organisationsSlice';
import messagesSlice from './slices/messagesSlice';
import supportSlice from './slices/supportSlice';
import statsSlice from './slices/statsSlice';
import paymentsSlice from './slices/paymentsSlice';
import settingsSlice from './slices/settingsSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    users: usersSlice,
    missions: missionsSlice,
    organisations: organisationsSlice,
    messages: messagesSlice,
    support: supportSlice,
    stats: statsSlice,
    payments: paymentsSlice,
    settings: settingsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export { store };

// Types pour TypeScript (commentés car nous utilisons JavaScript)
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;