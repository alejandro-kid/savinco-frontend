import { configureStore } from '@reduxjs/toolkit';
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { countryReducer } from '../../modules/country/infrastructure/redux/country.slice';
import { currencyReducer } from '../../modules/currency/infrastructure/redux/currency.slice';
import { financialDataReducer } from '../../modules/financial-data/infrastructure/redux/financial-data.slice';

export const store = configureStore({
  reducer: {
    financialData: financialDataReducer,
    currency: currencyReducer,
    country: countryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
