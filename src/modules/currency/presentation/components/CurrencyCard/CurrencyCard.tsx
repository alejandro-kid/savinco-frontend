import { useTrackedButton } from '../../../../../shared/analytics';
import { Button } from '../../../../../shared/ui/components/Button';
import { Card } from '../../../../../shared/ui/components/Card';
import type { Currency, CurrencyCode } from '../../../domain/types';

export interface CurrencyCardProps {
  item: Currency;
  onEdit: (code: CurrencyCode) => void;
  isProcessing?: boolean;
}

export const CurrencyCard = ({ item, onEdit, isProcessing = false }: CurrencyCardProps) => {
  const trackedEditButton = useTrackedButton({
    actionName: 'currency_edit',
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
          <p className="mb-1 text-xs font-medium text-white/90">Tasa de Cambio a USD</p>
          <p className="text-2xl font-bold">{item.exchangeRateToBase.toFixed(10)}</p>
          <p className="mt-1 text-xs text-white/80">
            1 {item.code} = {item.exchangeRateToBase.toFixed(4)} USD
          </p>
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
          </div>
        ) : (
          <div className="border-t border-gray-200 pt-3 text-center text-xs text-gray-500">
            La moneda base no puede ser editada
          </div>
        )}
      </div>
    </Card>
  );
};
