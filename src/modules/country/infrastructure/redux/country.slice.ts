import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Country } from '../../domain/types';

export type CountryState = {
  items: Array<Country>;
  isLoading: boolean;
  isMutating: boolean;
  error: string | null;
};

const initialState: CountryState = {
  items: [],
  isLoading: false,
  isMutating: false,
  error: null,
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
      state.error = null;
    },
    mutationEnded(state) {
      state.isMutating = false;
    },
    mutationFailed(state, action: PayloadAction<string>) {
      state.isMutating = false;
      state.error = action.payload;
    },

    upsertCountry(state, action: PayloadAction<Country>) {
      const existingIndex = state.items.findIndex((item) => item.code === action.payload.code);
      if (existingIndex >= 0) {
        state.items[existingIndex] = action.payload;
      } else {
        state.items.push(action.payload);
      }
    },

    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const countryReducer = countrySlice.reducer;
export const countryActions = countrySlice.actions;
