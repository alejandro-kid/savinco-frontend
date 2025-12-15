import {
  createFinancialDataFromResponse,
  createFinancialDataSummary,
} from '../../../domain/factory';
import type {
  FinancialData,
  FinancialDataInput,
  FinancialDataSummary,
} from '../../../domain/types';
import type {
  CreateFinancialDataDTO,
  UpdateFinancialDataDTO,
} from '../dtos/create-financial-data.dto';
import type {
  FinancialDataResponseDTO,
  FinancialDataSummaryResponseDTO,
} from '../dtos/financial-data-response.dto';

export const mapToCreateFinancialDataDTO = (input: FinancialDataInput): CreateFinancialDataDTO => ({
  countryCode: input.countryCode,
  currencyCode: input.currencyCode,
  capitalSaved: input.capitalSaved,
  capitalLoaned: input.capitalLoaned,
  profitsGenerated: input.profitsGenerated,
});

export const mapToUpdateFinancialDataDTO = (input: FinancialDataInput): UpdateFinancialDataDTO => ({
  countryCode: input.countryCode,
  currencyCode: input.currencyCode,
  capitalSaved: input.capitalSaved,
  capitalLoaned: input.capitalLoaned,
  profitsGenerated: input.profitsGenerated,
});

export const mapFinancialDataFromResponseDTO = (dto: FinancialDataResponseDTO): FinancialData => {
  return createFinancialDataFromResponse({
    countryCode: dto.countryCode,
    countryName: dto.countryName,
    originalCurrency: dto.originalCurrency,
    capitalSaved: dto.capitalSaved,
    capitalLoaned: dto.capitalLoaned,
    profitsGenerated: dto.profitsGenerated,
    totalInUSD: dto.totalInUSD,
  });
};

export const mapFinancialDataArrayFromResponseDTO = (
  dtos: Array<FinancialDataResponseDTO>
): Array<FinancialData> => dtos.map(mapFinancialDataFromResponseDTO);

export const mapFinancialDataSummaryFromResponseDTO = (
  dto: FinancialDataSummaryResponseDTO
): FinancialDataSummary => {
  return createFinancialDataSummary({
    totalCapitalSaved: dto.totalCapitalSaved,
    totalCapitalLoaned: dto.totalCapitalLoaned,
    totalProfitsGenerated: dto.totalProfitsGenerated,
    grandTotal: dto.grandTotal,
    byCountry: dto.byCountry,
  });
};
