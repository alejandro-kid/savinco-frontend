import { Button } from '../../../../../shared/ui/components/Button';
import { Card } from '../../../../../shared/ui/components/Card';
import { ErrorMessage } from '../../../../../shared/ui/components/ErrorMessage';
import { LoadingSpinner } from '../../../../../shared/ui/components/LoadingSpinner';
import type { CountryCode, FinancialData } from '../../../domain/types';

export interface FinancialDataListProps {
  items: Array<FinancialData>;
  isLoading: boolean;
  error: string | null;
  onCreateClick: () => void;
  onSummaryClick: () => void;
  onEditClick: (countryCode: CountryCode) => void;
  onDeleteClick: (countryCode: CountryCode) => void;
  onRetry?: () => void;
}

const formatCurrency = (value: number): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(value);

export const FinancialDataList = ({
  items,
  isLoading,
  error,
  onCreateClick,
  onSummaryClick,
  onEditClick,
  onDeleteClick,
  onRetry,
}: FinancialDataListProps) => {
  return (
    <Card title="Datos Financieros por País">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex gap-2">
          <Button onClick={onCreateClick} disabled={isLoading}>
            Crear datos financieros
          </Button>
          <Button variant="secondary" onClick={onSummaryClick} disabled={isLoading}>
            Ver resumen consolidado
          </Button>
        </div>
      </div>

      {isLoading ? <LoadingSpinner /> : null}

      {error ? (
        <div className="mb-3">
          <ErrorMessage>
            <div className="flex items-center justify-between gap-2">
              <span>{error}</span>
              {onRetry ? (
                <Button type="button" variant="secondary" onClick={onRetry}>
                  Reintentar
                </Button>
              ) : null}
            </div>
          </ErrorMessage>
        </div>
      ) : null}

      {!isLoading && !error && items.length === 0 ? (
        <p className="text-sm text-gray-500">
          No hay datos financieros disponibles todavía. Crea un nuevo registro para comenzar.
        </p>
      ) : null}

      {!isLoading && !error && items.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">País</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                  Moneda Original
                </th>
                <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">
                  Capital Ahorrado (USD)
                </th>
                <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">
                  Capital Prestado (USD)
                </th>
                <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">
                  Utilidades Generadas (USD)
                </th>
                <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">
                  Total (USD)
                </th>
                <th className="px-3 py-2 text-right text-xs font-medium text-gray-500">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {items.map((item) => (
                <tr key={item.countryCode}>
                  <td className="px-3 py-2 text-xs text-gray-800">
                    <div className="font-medium">{item.countryName}</div>
                    <div className="text-[11px] text-gray-500">{item.countryCode}</div>
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-700">{item.originalCurrency}</td>
                  <td className="px-3 py-2 text-right text-xs text-gray-700">
                    {formatCurrency(item.capitalSaved)}
                  </td>
                  <td className="px-3 py-2 text-right text-xs text-gray-700">
                    {formatCurrency(item.capitalLoaned)}
                  </td>
                  <td className="px-3 py-2 text-right text-xs text-gray-700">
                    {formatCurrency(item.profitsGenerated)}
                  </td>
                  <td className="px-3 py-2 text-right text-xs font-semibold text-gray-900">
                    {formatCurrency(item.totalInUSD)}
                  </td>
                  <td className="px-3 py-2 text-right text-xs">
                    <div className="flex justify-end gap-2">
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => onEditClick(item.countryCode)}
                        disabled={isLoading}
                      >
                        Editar
                      </Button>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => onDeleteClick(item.countryCode)}
                        disabled={isLoading}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </Card>
  );
};
