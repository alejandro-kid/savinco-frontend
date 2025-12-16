import type { FormEvent } from 'react';
import { useState } from 'react';
import { Button } from '../../../../../shared/ui/components/Button';
import { ErrorMessage } from '../../../../../shared/ui/components/ErrorMessage';
import { Input } from '../../../../../shared/ui/components/Input';
import { CountryCode, CurrencyCode, type FinancialDataInput } from '../../../domain/types';
import { CountryCodeSelect } from '../CountryCodeSelect';

export interface FinancialDataFormProps {
  initialValue?: FinancialDataInput;
  isSubmitting?: boolean;
  errorMessage?: string | null;
  onSubmit: (value: FinancialDataInput) => Promise<void> | void;
  onCancel?: () => void;
}

const getDefaultCurrencyForCountry = (countryCode: CountryCode | ''): CurrencyCode | '' => {
  switch (countryCode) {
    case CountryCode.ECU:
      return CurrencyCode.USD;
    case CountryCode.ESP:
      return CurrencyCode.EUR;
    case CountryCode.PER:
      return CurrencyCode.PEN;
    case CountryCode.NPL:
      return CurrencyCode.NPR;
    default:
      return '';
  }
};

export const FinancialDataForm = ({
  initialValue,
  isSubmitting,
  errorMessage,
  onSubmit,
  onCancel,
}: FinancialDataFormProps) => {
  const [countryCode, setCountryCode] = useState<CountryCode | ''>(initialValue?.countryCode ?? '');
  const [capitalSaved, setCapitalSaved] = useState<string>(
    initialValue?.capitalSaved.toString() ?? ''
  );
  const [capitalLoaned, setCapitalLoaned] = useState<string>(
    initialValue?.capitalLoaned.toString() ?? ''
  );
  const [profitsGenerated, setProfitsGenerated] = useState<string>(
    initialValue?.profitsGenerated.toString() ?? ''
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!countryCode) return;

    const value: FinancialDataInput = {
      countryCode,
      currencyCode: getDefaultCurrencyForCountry(countryCode) as CurrencyCode,
      capitalSaved: Number(capitalSaved || 0),
      capitalLoaned: Number(capitalLoaned || 0),
      profitsGenerated: Number(profitsGenerated || 0),
    };

    await onSubmit(value);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}

      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label htmlFor="country-code" className="mb-1 block text-xs font-medium text-gray-700">
            País
          </label>
          <CountryCodeSelect
            id="country-code"
            value={countryCode}
            onChange={(event) => setCountryCode(event.target.value as CountryCode | '')}
            disabled={!!initialValue}
          />
        </div>

        <div>
          <label htmlFor="currency-code" className="mb-1 block text-xs font-medium text-gray-700">
            Moneda
          </label>
          <Input
            id="currency-code"
            value={getDefaultCurrencyForCountry(countryCode)}
            disabled
            readOnly
          />
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <div>
          <label htmlFor="capital-saved" className="mb-1 block text-xs font-medium text-gray-700">
            Capital Ahorrado
          </label>
          <Input
            id="capital-saved"
            type="number"
            min={0}
            step="0.01"
            value={capitalSaved}
            onChange={(event) => setCapitalSaved(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="capital-loaned" className="mb-1 block text-xs font-medium text-gray-700">
            Capital Prestado
          </label>
          <Input
            id="capital-loaned"
            type="number"
            min={0}
            step="0.01"
            value={capitalLoaned}
            onChange={(event) => setCapitalLoaned(event.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="profits-generated"
            className="mb-1 block text-xs font-medium text-gray-700"
          >
            Utilidades Generadas
          </label>
          <Input
            id="profits-generated"
            type="number"
            min={0}
            step="0.01"
            value={profitsGenerated}
            onChange={(event) => setProfitsGenerated(event.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <Button type="submit" disabled={isSubmitting || !countryCode}>
          {isSubmitting ? 'Guardando...' : 'Guardar'}
        </Button>
        {onCancel ? (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancelar
          </Button>
        ) : null}
      </div>
    </form>
  );
};
