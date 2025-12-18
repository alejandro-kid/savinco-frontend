import { useTrackedButton } from '../../../../../shared/analytics';
import { Button } from '../../../../../shared/ui/components/Button';
import { Card } from '../../../../../shared/ui/components/Card';
import type { Currency, CurrencyCode } from '../../../domain/types';
import { useBaseCurrency } from '../../hooks/use-base-currency';

export interface CurrencyCardProps {
  item: Currency;
  onEdit: (code: CurrencyCode) => void;
  onDelete: (code: CurrencyCode) => void;
  isProcessing?: boolean;
  totalCurrencies?: number;
}

export const CurrencyCard = ({
  item,
  onEdit,
  onDelete,
  isProcessing = false,
  totalCurrencies = 0,
}: CurrencyCardProps) => {
  // Si hay una sola moneda, se puede eliminar aunque sea base
  const canDelete = !item.isBase || totalCurrencies === 1;
  const baseCurrency = useBaseCurrency();
  const trackedEditButton = useTrackedButton({
    actionName: 'currency_edit',
    section: 'currency-card',
    baseProperties: {
      currencyCode: item.code,
      currencyName: item.name,
    },
  });
  const trackedDeleteButton = useTrackedButton({
    actionName: 'currency_delete',
    section: 'currency-card',
    baseProperties: {
      currencyCode: item.code,
      currencyName: item.name,
    },
  });

  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
      <div className="relative">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between border-b border-gray-200 pb-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-2xl font-bold text-white shadow-lg">
              {item.code}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
              <p className="text-xs font-medium text-gray-500">Código: {item.code}</p>
            </div>
          </div>
          {item.isBase ? (
            <div className="rounded-lg bg-blue-100 px-3 py-1.5 text-xs font-semibold text-blue-700">
              Base
            </div>
          ) : null}
        </div>

        {/* Exchange Rate */}
        <div className="mb-4 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 p-4 text-white shadow-md">
          <p className="mb-1 text-xs font-medium text-white/90">
            Tasa de Cambio a {baseCurrency?.code ?? 'Moneda Base'}
          </p>
          <p className="text-2xl font-bold">{item.exchangeRateToBase.toFixed(10)}</p>
          {baseCurrency && (
            <p className="mt-1 text-xs text-white/80">
              1 {item.code} = {item.exchangeRateToBase.toFixed(4)} {baseCurrency.code}
            </p>
          )}
        </div>

        {/* Timestamps */}
        <div className="mb-4 grid grid-cols-2 gap-2 text-xs text-gray-600">
          <div>
            <p className="font-medium">Creado:</p>
            <p>{new Date(item.createdAt).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="font-medium">Actualizado:</p>
            <p>{new Date(item.updatedAt).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Actions */}
        {!item.isBase ? (
          <div className="flex gap-2 border-t border-gray-200 pt-3">
            <Button
              variant="secondary"
              onClick={trackedEditButton.onClick(() => onEdit(item.code))}
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
                aria-label="Editar"
              >
                <title>Editar</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Editar Tasa
            </Button>
            <Button
              variant="secondary"
              onClick={trackedDeleteButton.onClick(() => onDelete(item.code))}
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
                aria-label="Eliminar"
              >
                <title>Eliminar</title>
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
        ) : canDelete ? (
          <div className="flex gap-2 border-t border-gray-200 pt-3">
            <Button
              variant="secondary"
              onClick={trackedDeleteButton.onClick(() => onDelete(item.code))}
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
                aria-label="Eliminar"
              >
                <title>Eliminar</title>
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
        ) : (
          <div className="border-t border-gray-200 pt-3 text-center text-xs text-gray-500">
            La moneda base no puede ser editada ni eliminada
          </div>
        )}
      </div>
    </Card>
  );
};
