import type { RootState } from '../../../../shared/redux/store';

export const selectFinancialDataState = (state: RootState) => state.financialData;

export const selectFinancialDataItems = (state: RootState) => state.financialData.items;

export const selectFinancialDataSummary = (state: RootState) => state.financialData.summary;

export const selectFinancialDataIsLoadingList = (state: RootState) =>
  state.financialData.isLoadingList;

export const selectFinancialDataIsLoadingSummary = (state: RootState) =>
  state.financialData.isLoadingSummary;

export const selectFinancialDataIsMutating = (state: RootState) => state.financialData.isMutating;

export const selectFinancialDataError = (state: RootState) => state.financialData.error;

export const selectFinancialDataMutationError = (state: RootState) =>
  state.financialData.mutationError;
