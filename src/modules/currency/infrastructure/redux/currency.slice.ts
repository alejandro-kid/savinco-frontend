import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Currency } from '../../domain/types';

export type CurrencyState = {
  items: Array<Currency>;
  baseCurrency: Currency | null;
  isLoading: boolean;
  isMutating: boolean;
  error: string | null;
  mutationError: string | null;
};

const initialState: CurrencyState = {
  items: [],
  baseCurrency: null,
  isLoading: false,
  isMutating: false,
  error: null,
  mutationError: null,
};

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    requestStarted(state) {
      state.isLoading = true;
      state.error = null;
    },
    requestSucceeded(state, action: PayloadAction<Array<Currency>>) {
      state.isLoading = false;
      state.items = action.payload;
      state.error = null;
    },
    requestFailed(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },

    requestBaseStarted(state) {
      state.isLoading = true;
      state.error = null;
    },
    requestBaseSucceeded(state, action: PayloadAction<Currency>) {
      state.isLoading = false;
      state.baseCurrency = action.payload;
      state.error = null;
    },
    requestBaseFailed(state, action: PayloadAction<string>) {
      state.isLoading = false;
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

    upsertCurrency(state, action: PayloadAction<Currency>) {
      const existingIndex = state.items.findIndex((item) => item.code === action.payload.code);
      if (existingIndex >= 0) {
        state.items[existingIndex] = action.payload;
      } else {
        state.items.push(action.payload);
      }
      // Update base currency if this is the base
      if (action.payload.isBase) {
        state.baseCurrency = action.payload;
      }
    },

    deleteCurrencyOptimistic(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.code !== action.payload);
      // Clear base currency if it was deleted
      if (state.baseCurrency?.code === action.payload) {
        state.baseCurrency = null;
      }
    },

    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setMutationError(state, action: PayloadAction<string | null>) {
      state.mutationError = action.payload;
    },
  },
});

export const currencyReducer = currencySlice.reducer;
export const currencyActions = currencySlice.actions;
