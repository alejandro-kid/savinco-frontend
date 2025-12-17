import type { CreateCurrencyInput, Currency, UpdateExchangeRateInput } from '../../../domain/types';
import type {
  CreateCurrencyDTO,
  CurrencyResponseDTO,
  UpdateExchangeRateDTO,
} from '../dtos/currency-response.dto';

export const mapCurrencyFromDTO = (dto: CurrencyResponseDTO): Currency => {
  return {
    id: dto.id,
    code: dto.code,
    name: dto.name,
    isBase: dto.isBase,
    exchangeRateToBase: dto.exchangeRateToBase,
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
  };
};

export const mapCurrencyToCreateDTO = (input: CreateCurrencyInput): CreateCurrencyDTO => {
  return {
    code: input.code,
    name: input.name,
    isBase: input.isBase,
    exchangeRateToBase: input.exchangeRateToBase,
  };
};

export const mapUpdateExchangeRateToDTO = (
  input: UpdateExchangeRateInput
): UpdateExchangeRateDTO => {
  return {
    exchangeRateToBase: input.exchangeRateToBase,
  };
};
