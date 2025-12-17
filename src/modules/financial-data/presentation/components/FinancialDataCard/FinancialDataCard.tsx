import { Button } from '../../../../../shared/ui/components/Button';
import { Card } from '../../../../../shared/ui/components/Card';
import { formatCurrency } from '../../../../../shared/utils';
import type { CountryCode, FinancialData } from '../../../domain/types';

export interface FinancialDataCardProps {
  item: FinancialData;
  onEdit: (countryCode: CountryCode) => void;
  onDelete: (countryCode: CountryCode) => void;
  isProcessing?: boolean;
}

export const FinancialDataCard = ({
  item,
  onEdit,
  onDelete,
  isProcessing = false,
}: FinancialDataCardProps) => {
  const getCountryFlag = (countryCode: CountryCode): string => {
    const flags: Record<CountryCode, string> = {
      ECU: '🇪🇨',
      ESP: '🇪🇸',
      PER: '🇵🇪',
      NPL: '🇳🇵',
    };
    return flags[countryCode] || '🌍';
  };

  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between border-b border-gray-200 pb-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-2xl shadow-lg">
              {getCountryFlag(item.countryCode)}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">{item.countryName}</h3>
              <p className="text-xs font-medium text-gray-500">{item.countryCode}</p>
            </div>
          </div>
          <div className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-700">
            {item.originalCurrency}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="mb-4 grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-white/60 p-3 backdrop-blur-sm">
            <p className="mb-1 text-xs font-medium text-gray-600">Capital Ahorrado</p>
            <p className="text-base font-bold text-blue-600">{formatCurrency(item.capitalSaved)}</p>
          </div>
          <div className="rounded-lg bg-white/60 p-3 backdrop-blur-sm">
            <p className="mb-1 text-xs font-medium text-gray-600">Capital Prestado</p>
            <p className="text-base font-bold text-indigo-600">{formatCurrency(item.capitalLoaned)}</p>
          </div>
          <div className="rounded-lg bg-white/60 p-3 backdrop-blur-sm">
            <p className="mb-1 text-xs font-medium text-gray-600">Utilidades</p>
            <p className="text-base font-bold text-emerald-600">{formatCurrency(item.profitsGenerated)}</p>
          </div>
          <div className="rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 p-3 text-white shadow-md">
            <p className="mb-1 text-xs font-medium text-white/90">Total USD</p>
            <p className="text-base font-bold">{formatCurrency(item.totalInUSD)}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 border-t border-gray-200 pt-3">
          <Button
            variant="secondary"
            onClick={() => onEdit(item.countryCode)}
            disabled={isProcessing}
            className="flex-1"
          >
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Editar
          </Button>
          <Button
            variant="secondary"
            onClick={() => onDelete(item.countryCode)}
            disabled={isProcessing}
            className="flex-1 text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Eliminar
          </Button>
        </div>
      </div>
    </Card>
  );
};
