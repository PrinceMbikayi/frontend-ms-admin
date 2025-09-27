import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mockPayments } from '../../data/mockData';

// Async thunks pour les actions asynchrones
export const fetchPayments = createAsyncThunk(
  'payments/fetchPayments',
  async (_, { rejectWithValue }) => {
    try {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockPayments;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createPayment = createAsyncThunk(
  'payments/createPayment',
  async (paymentData, { rejectWithValue }) => {
    try {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 300));
      const newPayment = {
        ...paymentData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        status: 'pending'
      };
      return newPayment;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updatePayment = createAsyncThunk(
  'payments/updatePayment',
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 300));
      return { id, updates };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePayment = createAsyncThunk(
  'payments/deletePayment',
  async (paymentId, { rejectWithValue }) => {
    try {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 300));
      return paymentId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const processRefund = createAsyncThunk(
  'payments/processRefund',
  async ({ paymentId, reason }, { rejectWithValue }) => {
    try {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        id: paymentId,
        status: 'refunded',
        refundedAt: new Date().toISOString(),
        refundReason: reason
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// État initial
const initialState = {
  payments: [],
  loading: false,
  error: null,
  filters: {
    status: 'all',
    method: 'all',
    dateRange: 'all',
    searchTerm: ''
  },
  pagination: {
    page: 0,
    pageSize: 10,
    total: 0
  },
  selectedPayment: null,
  statistics: {
    totalAmount: 0,
    completedAmount: 0,
    pendingAmount: 0,
    refundedAmount: 0,
    totalTransactions: 0,
    successRate: 0
  }
};

// Slice
const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        status: 'all',
        method: 'all',
        dateRange: 'all',
        searchTerm: ''
      };
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    setSelectedPayment: (state, action) => {
      state.selectedPayment = action.payload;
    },
    clearSelectedPayment: (state) => {
      state.selectedPayment = null;
    },
    updatePaymentStatus: (state, action) => {
      const { id, status } = action.payload;
      const payment = state.payments.find(p => p.id === id);
      if (payment) {
        payment.status = status;
        if (status === 'completed') {
          payment.completedAt = new Date().toISOString();
        }
      }
    },
    calculateStatistics: (state) => {
      const payments = state.payments;
      state.statistics = {
        totalAmount: payments.reduce((sum, p) => sum + p.amount, 0),
        completedAmount: payments
          .filter(p => p.status === 'completed')
          .reduce((sum, p) => sum + p.amount, 0),
        pendingAmount: payments
          .filter(p => p.status === 'pending')
          .reduce((sum, p) => sum + p.amount, 0),
        refundedAmount: payments
          .filter(p => p.status === 'refunded')
          .reduce((sum, p) => sum + p.amount, 0),
        totalTransactions: payments.length,
        successRate: payments.length > 0 
          ? (payments.filter(p => p.status === 'completed').length / payments.length) * 100 
          : 0
      };
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch payments
      .addCase(fetchPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload;
        state.pagination.total = action.payload.length;
        paymentsSlice.caseReducers.calculateStatistics(state);
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create payment
      .addCase(createPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.payments.unshift(action.payload);
        state.pagination.total += 1;
        paymentsSlice.caseReducers.calculateStatistics(state);
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update payment
      .addCase(updatePayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePayment.fulfilled, (state, action) => {
        state.loading = false;
        const { id, updates } = action.payload;
        const index = state.payments.findIndex(p => p.id === id);
        if (index !== -1) {
          state.payments[index] = { ...state.payments[index], ...updates };
        }
        paymentsSlice.caseReducers.calculateStatistics(state);
      })
      .addCase(updatePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete payment
      .addCase(deletePayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePayment.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = state.payments.filter(p => p.id !== action.payload);
        state.pagination.total -= 1;
        paymentsSlice.caseReducers.calculateStatistics(state);
      })
      .addCase(deletePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Process refund
      .addCase(processRefund.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(processRefund.fulfilled, (state, action) => {
        state.loading = false;
        const { id, status, refundedAt, refundReason } = action.payload;
        const payment = state.payments.find(p => p.id === id);
        if (payment) {
          payment.status = status;
          payment.refundedAt = refundedAt;
          payment.refundReason = refundReason;
        }
        paymentsSlice.caseReducers.calculateStatistics(state);
      })
      .addCase(processRefund.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

// Export actions
export const {
  setFilters,
  clearFilters,
  setPagination,
  setSelectedPayment,
  clearSelectedPayment,
  updatePaymentStatus,
  calculateStatistics
} = paymentsSlice.actions;

// Selectors
export const selectPayments = (state) => state.payments.payments;
export const selectPaymentsLoading = (state) => state.payments.loading;
export const selectPaymentsError = (state) => state.payments.error;
export const selectPaymentsFilters = (state) => state.payments.filters;
export const selectPaymentsPagination = (state) => state.payments.pagination;
export const selectSelectedPayment = (state) => state.payments.selectedPayment;
export const selectPaymentsStatistics = (state) => state.payments.statistics;

// Filtered payments selector
export const selectFilteredPayments = (state) => {
  const { payments, filters } = state.payments;
  let filtered = [...payments];

  // Filter by status
  if (filters.status !== 'all') {
    filtered = filtered.filter(payment => payment.status === filters.status);
  }

  // Filter by method
  if (filters.method !== 'all') {
    filtered = filtered.filter(payment => payment.method === filters.method);
  }

  // Filter by search term
  if (filters.searchTerm) {
    const searchLower = filters.searchTerm.toLowerCase();
    filtered = filtered.filter(payment => 
      payment.userName.toLowerCase().includes(searchLower) ||
      payment.missionTitle.toLowerCase().includes(searchLower) ||
      payment.transactionId.toLowerCase().includes(searchLower)
    );
  }

  // Filter by date range
  if (filters.dateRange !== 'all') {
    const now = new Date();
    const filterDate = new Date();
    
    switch (filters.dateRange) {
      case 'today':
        filterDate.setHours(0, 0, 0, 0);
        break;
      case 'week':
        filterDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        filterDate.setMonth(now.getMonth() - 1);
        break;
      case 'year':
        filterDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        break;
    }
    
    if (filters.dateRange !== 'all') {
      filtered = filtered.filter(payment => 
        new Date(payment.createdAt) >= filterDate
      );
    }
  }

  return filtered;
};

export default paymentsSlice.reducer;