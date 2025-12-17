import type { FormEvent } from 'react';
import { useState } from 'react';
import { Button } from '../../../../../shared/ui/components/Button';
import { ErrorMessage } from '../../../../../shared/ui/components/ErrorMessage';
import { Input } from '../../../../../shared/ui/components/Input';
import type { CreateCurrencyInput } from '../../../domain/types';

export interface CurrencyFormProps {
  initialValue?: CreateCurrencyInput;
  isSubmitting?: boolean;
  errorMessage?: string | null;
  onSubmit: (value: CreateCurrencyInput) => Promise<void> | void;
  onCancel?: () => void;
}

export const CurrencyForm = ({
  initialValue,
  isSubmitting,
  errorMessage,
  onSubmit,
  onCancel,
}: CurrencyFormProps) => {
  const [code, setCode] = useState<string>(initialValue?.code ?? '');
  const [name, setName] = useState<string>(initialValue?.name ?? '');
  const [isBase, setIsBase] = useState<boolean>(initialValue?.isBase ?? false);
  const [exchangeRateToBase, setExchangeRateToBase] = useState<string>(
    initialValue?.exchangeRateToBase.toString() ?? ''
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const currencyCode = code.toUpperCase().trim();
    if (currencyCode.length !== 3 || !/^[A-Z]{3}$/.test(currencyCode)) {
      return;
    }

    const exchangeRate = parseFloat(exchangeRateToBase);
    if (Number.isNaN(exchangeRate) || exchangeRate <= 0) {
      return;
    }

    if (isBase && exchangeRate !== 1.0) {
      return;
    }

    await onSubmit({
      code: currencyCode as never,
      name: name.trim(),
      isBase,
      exchangeRateToBase: exchangeRate,
    });
  };

  const handleIsBaseChange = (checked: boolean) => {
    setIsBase(checked);
    if (checked) {
      setExchangeRateToBase('1.0');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}

      <div>
        <label htmlFor="code" className="mb-1 block text-sm font-medium text-gray-700">
          Código de Moneda (3 letras)
        </label>
        <Input
          id="code"
          type="text"
          value={code}
          onChange={(e) => {
            const value = e.target.value
              .toUpperCase()
              .replace(/[^A-Z]/g, '')
              .slice(0, 3);
            setCode(value);
          }}
          placeholder="USD, EUR, PEN, NPR"
          required
          disabled={isSubmitting || !!initialValue}
          maxLength={3}
          pattern="[A-Z]{3}"
        />
        <p className="mt-1 text-xs text-gray-500">Debe ser exactamente 3 letras mayúsculas</p>
      </div>

      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
          Nombre de la Moneda
        </label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="US Dollar, Euro, Peruvian Sol"
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          <input
            type="checkbox"
            checked={isBase}
            onChange={(e) => handleIsBaseChange(e.target.checked)}
            disabled={isSubmitting || !!initialValue}
            className="mr-2"
          />
          Es moneda base (USD)
        </label>
        <p className="mt-1 text-xs text-gray-500">
          Solo una moneda puede ser base. Si está marcado, la tasa de cambio será 1.0
        </p>
      </div>

      <div>
        <label htmlFor="exchangeRate" className="mb-1 block text-sm font-medium text-gray-700">
          Tasa de Cambio a USD
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
          disabled={isSubmitting || isBase}
        />
        <p className="mt-1 text-xs text-gray-500">
          Cuántos USD equivale 1 unidad de esta moneda. Debe ser mayor a 0.
        </p>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={isSubmitting} className="flex-1">
          {isSubmitting ? 'Guardando...' : 'Guardar'}
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
