import { Card } from '../../../../../shared/ui/components/Card';
import { ErrorMessage } from '../../../../../shared/ui/components/ErrorMessage';
import { LoadingSpinner } from '../../../../../shared/ui/components/LoadingSpinner';
import { formatCurrency } from '../../../../../shared/utils';
import type { FinancialDataSummary } from '../../../domain/types';

export interface FinancialDataSummaryProps {
  summary: FinancialDataSummary | null;
  isLoading: boolean;
  error: string | null;
}

export const FinancialDataSummaryComponent = ({
  summary,
  isLoading,
  error,
}: FinancialDataSummaryProps) => {
  return (
    <Card title="Resumen Consolidado (USD)">
      {isLoading ? <LoadingSpinner /> : null}

      {error ? (
        <div className="mb-3">
          <ErrorMessage>{error}</ErrorMessage>
        </div>
      ) : null}

      {!isLoading && !error && summary ? (
        <div className="space-y-4">
          <div className="grid gap-3 md:grid-cols-4">
            <div className="rounded-lg bg-blue-50 px-3 py-2 text-xs">
              <div className="text-[11px] font-medium uppercase text-blue-700">
                Capital Ahorrado Total
              </div>
              <div className="text-sm font-semibold text-blue-900">
                {formatCurrency(summary.totalCapitalSaved)}
              </div>
            </div>
            <div className="rounded-lg bg-indigo-50 px-3 py-2 text-xs">
              <div className="text-[11px] font-medium uppercase text-indigo-700">
                Capital Prestado Total
              </div>
              <div className="text-sm font-semibold text-indigo-900">
                {formatCurrency(summary.totalCapitalLoaned)}
              </div>
            </div>
            <div className="rounded-lg bg-emerald-50 px-3 py-2 text-xs">
              <div className="text-[11px] font-medium uppercase text-emerald-700">
                Utilidades Generadas Totales
              </div>
              <div className="text-sm font-semibold text-emerald-900">
                {formatCurrency(summary.totalProfitsGenerated)}
              </div>
            </div>
            <div className="rounded-lg bg-slate-50 px-3 py-2 text-xs">
              <div className="text-[11px] font-medium uppercase text-slate-700">Total Global</div>
              <div className="text-sm font-semibold text-slate-900">
                {formatCurrency(summary.grandTotal)}
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-xs font-semibold text-gray-700">Desglose por País</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-xs">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium text-gray-500">País</th>
                    <th className="px-3 py-2 text-right font-medium text-gray-500">
                      Capital Ahorrado
                    </th>
                    <th className="px-3 py-2 text-right font-medium text-gray-500">
                      Capital Prestado
                    </th>
                    <th className="px-3 py-2 text-right font-medium text-gray-500">
                      Utilidades Generadas
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {summary.byCountry.map((item) => (
                    <tr key={item.countryCode}>
                      <td className="px-3 py-2 text-gray-800">
                        <div className="font-medium">{item.countryName}</div>
                        <div className="text-[11px] text-gray-500">{item.countryCode}</div>
                      </td>
                      <td className="px-3 py-2 text-right text-gray-700">
                        {formatCurrency(item.capitalSaved)}
                      </td>
                      <td className="px-3 py-2 text-right text-gray-700">
                        {formatCurrency(item.capitalLoaned)}
                      </td>
                      <td className="px-3 py-2 text-right text-gray-700">
                        {formatCurrency(item.profitsGenerated)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : null}
    </Card>
  );
};
