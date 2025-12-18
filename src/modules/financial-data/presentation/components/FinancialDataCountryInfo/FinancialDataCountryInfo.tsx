import type { CountryName, CurrencyCode } from '../../../domain/types';

export interface FinancialDataCountryInfoProps {
  countryName: CountryName;
  currencyCode: CurrencyCode;
}

export const FinancialDataCountryInfo = ({
  countryName,
  currencyCode,
}: FinancialDataCountryInfoProps) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <div className="mb-1 text-xs font-medium text-gray-600">País</div>
          <div className="text-sm font-semibold text-gray-900">{countryName}</div>
        </div>
        <div>
          <div className="mb-1 text-xs font-medium text-gray-600">Moneda Original</div>
          <div className="text-sm font-semibold text-gray-900">{currencyCode}</div>
          <p className="mt-1 text-xs text-gray-500">Los montos están expresados en esta moneda</p>
        </div>
      </div>
    </div>
  );
};
