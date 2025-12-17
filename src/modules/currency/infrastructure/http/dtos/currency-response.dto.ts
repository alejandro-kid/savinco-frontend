import type { CurrencyCode } from '../../../domain/types';

export type CurrencyResponseDTO = {
  id: number;
  code: CurrencyCode;
  name: string;
  isBase: boolean;
  exchangeRateToBase: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateCurrencyDTO = {
  code: CurrencyCode;
  name: string;
  isBase: boolean;
  exchangeRateToBase: number;
};

export type UpdateExchangeRateDTO = {
  exchangeRateToBase: number;
};
