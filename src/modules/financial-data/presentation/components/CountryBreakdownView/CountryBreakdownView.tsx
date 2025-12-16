import { useState } from 'react';
import { Button } from '../../../../../shared/ui/components/Button';
import { formatCurrency } from '../../../../../shared/utils';
import type { FinancialDataByCountrySummary } from '../../../domain/types';
import { CountryBreakdownChart } from '../CountryBreakdownChart';

type ViewMode = 'table' | 'chart';

type CountryBreakdownViewProps = {
  data: Array<FinancialDataByCountrySummary>;
  onCountryClick?: (countryCode: string) => void;
};

export const CountryBreakdownView = ({ data, onCountryClick }: CountryBreakdownViewProps) => {
  const [viewMode, setViewMode] = useState<ViewMode>('table');

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-4 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-base font-semibold text-gray-800 sm:text-lg">Desglose por País</h3>
        <div className="flex gap-2">
          <Button
            onClick={() => setViewMode('table')}
            variant={viewMode === 'table' ? 'primary' : 'secondary'}
            className="flex items-center gap-2"
          >
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            Tabla
          </Button>
          <Button
            onClick={() => setViewMode('chart')}
            variant={viewMode === 'chart' ? 'primary' : 'secondary'}
            className="flex items-center gap-2"
          >
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            Gráfica
          </Button>
        </div>
      </div>

      {viewMode === 'table' ? (
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-4 sm:py-3">
                  País
                </th>
                <th className="px-3 py-2 text-right text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-4 sm:py-3">
                  Capital Ahorrado
                </th>
                <th className="px-3 py-2 text-right text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-4 sm:py-3">
                  Capital Prestado
                </th>
                <th className="px-3 py-2 text-right text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-4 sm:py-3">
                  Utilidades
                </th>
                <th className="px-3 py-2 text-right text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-4 sm:py-3">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {data.map((item) => {
                const total = item.capitalSaved + item.capitalLoaned + item.profitsGenerated;
                return (
                  <tr
                    key={item.countryCode}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => onCountryClick?.(item.countryCode)}
                  >
                    <td className="whitespace-nowrap px-3 py-3 sm:px-4 sm:py-4">
                      <div className="font-medium text-gray-900 text-sm sm:text-base">
                        {item.countryName}
                      </div>
                      <div className="text-xs text-gray-500 sm:text-sm">{item.countryCode}</div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-right text-xs text-gray-700 sm:px-4 sm:py-4 sm:text-sm">
                      {formatCurrency(item.capitalSaved)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-right text-xs text-gray-700 sm:px-4 sm:py-4 sm:text-sm">
                      {formatCurrency(item.capitalLoaned)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-right text-xs text-gray-700 sm:px-4 sm:py-4 sm:text-sm">
                      {formatCurrency(item.profitsGenerated)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-right text-xs font-semibold text-gray-900 sm:px-4 sm:py-4 sm:text-sm">
                      {formatCurrency(total)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="w-full">
          <CountryBreakdownChart data={data} />
        </div>
      )}
    </div>
  );
};
