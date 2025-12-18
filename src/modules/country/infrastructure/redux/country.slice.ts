import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Country } from '../../domain/types';

export type CountryState = {
  items: Array<Country>;
  isLoading: boolean;
  isMutating: boolean;
  error: string | null;
  mutationError: string | null;
};

const initialState: CountryState = {
  items: [],
  isLoading: false,
  isMutating: false,
  error: null,
  mutationError: null,
};

const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    requestStarted(state) {
      state.isLoading = true;
      state.error = null;
    },
    requestSucceeded(state, action: PayloadAction<Array<Country>>) {
      state.isLoading = false;
      state.items = action.payload;
      state.error = null;
    },
    requestFailed(state, action: PayloadAction<string>) {
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

    upsertCountry(state, action: PayloadAction<Country>) {
      const existingIndex = state.items.findIndex((item) => item.code === action.payload.code);
      if (existingIndex >= 0) {
        state.items[existingIndex] = action.payload;
      } else {
        state.items.push(action.payload);
      }
    },

    deleteCountryOptimistic(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.code !== action.payload);
    },

    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setMutationError(state, action: PayloadAction<string | null>) {
      state.mutationError = action.payload;
    },
  },
});

export const countryReducer = countrySlice.reducer;
export const countryActions = countrySlice.actions;
