import type { FormEvent } from 'react';
import { useState } from 'react';
import { Button } from '../../../../../shared/ui/components/Button';
import { ErrorMessage } from '../../../../../shared/ui/components/ErrorMessage';
import { Input } from '../../../../../shared/ui/components/Input';
import type { CreateCountryInput } from '../../../domain/types';

export interface CountryFormProps {
  initialValue?: CreateCountryInput;
  isSubmitting?: boolean;
  errorMessage?: string | null;
  onSubmit: (value: CreateCountryInput) => Promise<void> | void;
  onCancel?: () => void;
}

export const CountryForm = ({
  initialValue,
  isSubmitting,
  errorMessage,
  onSubmit,
  onCancel,
}: CountryFormProps) => {
  const [code, setCode] = useState<string>(initialValue?.code ?? '');
  const [name, setName] = useState<string>(initialValue?.name ?? '');
  const [currencyCode, setCurrencyCode] = useState<string>(initialValue?.currencyCode ?? '');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const countryCode = code.toUpperCase().trim();
    if (countryCode.length !== 3 || !/^[A-Z]{3}$/.test(countryCode)) {
      return;
    }

    const currCode = currencyCode.toUpperCase().trim();
    if (currCode.length !== 3 || !/^[A-Z]{3}$/.test(currCode)) {
      return;
    }

    await onSubmit({
      code: countryCode as never,
      name: name.trim(),
      currencyCode: currCode as never,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMessage ? (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      ) : null}

      <div>
        <label htmlFor="code" className="mb-1 block text-sm font-medium text-gray-700">
          Código de País (3 letras)
        </label>
        <Input
          id="code"
          type="text"
          value={code}
          onChange={(e) => {
            const value = e.target.value.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 3);
            setCode(value);
          }}
          placeholder="ECU, ESP, PER, NPL"
          required
          disabled={isSubmitting || !!initialValue}
          maxLength={3}
          pattern="[A-Z]{3}"
        />
        <p className="mt-1 text-xs text-gray-500">Debe ser exactamente 3 letras mayúsculas</p>
      </div>

      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
          Nombre del País
        </label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ecuador, España, Perú, Nepal"
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="currencyCode" className="mb-1 block text-sm font-medium text-gray-700">
          Código de Moneda (3 letras)
        </label>
        <Input
          id="currencyCode"
          type="text"
          value={currencyCode}
          onChange={(e) => {
            const value = e.target.value.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 3);
            setCurrencyCode(value);
          }}
          placeholder="USD, EUR, PEN, NPR"
          required
          disabled={isSubmitting}
          maxLength={3}
          pattern="[A-Z]{3}"
        />
        <p className="mt-1 text-xs text-gray-500">
          Código de la moneda asociada. Debe existir en el sistema de monedas.
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
