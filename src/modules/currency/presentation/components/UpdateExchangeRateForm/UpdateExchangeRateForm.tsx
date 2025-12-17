import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { Button } from '../../../../../shared/ui/components/Button';
import { ErrorMessage } from '../../../../../shared/ui/components/ErrorMessage';
import { Input } from '../../../../../shared/ui/components/Input';
import type { UpdateExchangeRateInput } from '../../../domain/types';

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

    await onSubmit({
      exchangeRateToBase: exchangeRate,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}

      <div>
        <label htmlFor="exchangeRate" className="mb-1 block text-sm font-medium text-gray-700">
          Nueva Tasa de Cambio a USD
        </label>
        <Input
          id="exchangeRate"
          type="number"
          step="0.0000000001"
          min="0.0000000001"
          value={exchangeRateToBase}
          onChange={(e) => setExchangeRateToBase(e.target.value)}
          placeholder="1.1111111111"
          required
          disabled={isSubmitting}
        />
        <p className="mt-1 text-xs text-gray-500">
          Cuántos USD equivale 1 unidad de esta moneda. Debe ser mayor a 0.
        </p>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={isSubmitting} className="flex-1">
          {isSubmitting ? 'Actualizando...' : 'Actualizar Tasa'}
        </Button>
        {onCancel ? (
          <Button type="button" variant="secondary" onClick={onCancel} disabled={isSubmitting}>
            Cancelar
          </Button>
        ) : null}
      </div>
    </form>
  );
};
