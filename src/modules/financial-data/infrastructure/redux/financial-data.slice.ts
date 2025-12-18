import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CountryCode, FinancialData, FinancialDataSummary } from '../../domain/types';

export type FinancialDataState = {
  items: Array<FinancialData>;
  summary: FinancialDataSummary | null;
  isLoadingList: boolean;
  isLoadingSummary: boolean;
  isMutating: boolean;
  error: string | null; // Error de carga de lista/summary
  mutationError: string | null; // Error de mutaciones (create/update/delete)
};

const initialState: FinancialDataState = {
  items: [],
  summary: null,
  isLoadingList: false,
  isLoadingSummary: false,
  isMutating: false,
  error: null,
  mutationError: null,
};

const financialDataSlice = createSlice({
  name: 'financialData',
  initialState,
  reducers: {
    requestListStarted(state) {
      state.isLoadingList = true;
      state.error = null;
    },
    requestListSucceeded(state, action: PayloadAction<Array<FinancialData>>) {
      state.isLoadingList = false;
      state.items = action.payload;
      state.error = null;
    },
    requestListFailed(state, action: PayloadAction<string>) {
      state.isLoadingList = false;
      state.error = action.payload;
    },

    requestSummaryStarted(state) {
      state.isLoadingSummary = true;
      state.error = null;
    },
    requestSummarySucceeded(state, action: PayloadAction<FinancialDataSummary>) {
      state.isLoadingSummary = false;
      state.summary = action.payload;
      state.error = null;
    },
    requestSummaryFailed(state, action: PayloadAction<string>) {
      state.isLoadingSummary = false;
      state.error = action.payload;
    },

    mutationStarted(state) {
      state.isMutating = true;
      state.mutationError = null;
    },
    mutationEnded(state) {
      state.isMutating = false;
      state.mutationError = null;
    },
    mutationFailed(state, action: PayloadAction<string>) {
      state.isMutating = false;
      state.mutationError = action.payload;
    },

    upsertFinancialData(state, action: PayloadAction<FinancialData>) {
      const existingIndex = state.items.findIndex(
        (item) => item.countryCode === action.payload.countryCode
      );
      if (existingIndex >= 0) {
        state.items[existingIndex] = action.payload;
      } else {
        state.items.push(action.payload);
      }
    },

    deleteFinancialDataOptimistic(state, action: PayloadAction<CountryCode>) {
      state.items = state.items.filter((item) => item.countryCode !== action.payload);
    },

    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    clearMutationError(state) {
      state.mutationError = null;
    },
    invalidateSummary(state) {
      // Invalidate summary cache so it gets reloaded
      state.summary = null;
    },
  },
});

export const financialDataReducer = financialDataSlice.reducer;

export const financialDataActions = financialDataSlice.actions;
