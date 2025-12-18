import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { useTrackedForm } from '../../../../../shared/analytics';
import { Button } from '../../../../../shared/ui/components/Button';
import { ErrorMessage } from '../../../../../shared/ui/components/ErrorMessage';
import { NumericInput } from '../../../../../shared/ui/components/NumericInput';
import type { UpdateExchangeRateInput } from '../../../domain/types';
import { useBaseCurrency } from '../../hooks/use-base-currency';

export interface UpdateExchangeRateFormProps {
  initialValue?: number;
  isSubmitting?: boolean;
  errorMessage?: string | null;
  onSubmit: (value: UpdateExchangeRateInput) => Promise<void> | void;
  onCancel?: () => void;
}

export const UpdateExchangeRateForm = ({
  initialValue,
  isSubmitting,
  errorMessage,
  onSubmit,
  onCancel,
}: UpdateExchangeRateFormProps) => {
  const baseCurrency = useBaseCurrency();
  const trackedForm = useTrackedForm({
    formName: 'currency_exchange_rate_form',
    section: 'update-exchange-rate-form',
  });
  const [exchangeRateToBase, setExchangeRateToBase] = useState<string>(
    initialValue?.toString() ?? ''
  );

  useEffect(() => {
    if (initialValue !== undefined) {
      setExchangeRateToBase(initialValue.toString());
    }
  }, [initialValue]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const exchangeRate = parseFloat(exchangeRateToBase);
    if (Number.isNaN(exchangeRate) || exchangeRate <= 0) {
      return;
    }

    const value: UpdateExchangeRateInput = {
      exchangeRateToBase: exchangeRate,
    };

    await trackedForm.onSubmit(
      async () => {
        await onSubmit(value);
      },
      {
        previousRate: initialValue,
        newRate: exchangeRate,
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}

      <div>
        <NumericInput
          id="exchangeRate"
          label={`Nueva Tasa de Cambio a ${baseCurrency?.code ?? 'Moneda Base'}`}
          value={exchangeRateToBase}
          onChange={setExchangeRateToBase}
          placeholder="1.1111111111"
          required
          disabled={isSubmitting}
          step="0.0000000001"
          min={0.0000000001}
          title="Ingrese solo números y un punto decimal (ej: 1.1111111111)"
        />
        <p className="mt-1 text-xs text-gray-500">
          {baseCurrency
            ? `Cuántas unidades de ${baseCurrency.code} equivale 1 unidad de esta moneda. Debe ser mayor a 0.`
            : 'Cuántas unidades de la moneda base equivale 1 unidad de esta moneda. Debe ser mayor a 0.'}
        </p>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={isSubmitting} className="flex-1">
          {isSubmitting ? 'Actualizando...' : 'Actualizar Tasa'}
        </Button>
        {onCancel ? (
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              trackedForm.onCancel({ previousRate: initialValue });
              onCancel();
            }}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
        ) : null}
      </div>
    </form>
  );
};
