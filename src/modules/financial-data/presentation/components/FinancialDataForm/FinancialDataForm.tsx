import type { FormEvent } from 'react';
import { useState } from 'react';
import { useTrackedForm } from '../../../../../shared/analytics';
import { Button } from '../../../../../shared/ui/components/Button';
import { ErrorMessage } from '../../../../../shared/ui/components/ErrorMessage';
import { Input } from '../../../../../shared/ui/components/Input';
import { CountryCode, CurrencyCode, type FinancialDataInput } from '../../../domain/types';
import { CountryCodeSelect } from '../CountryCodeSelect';
import { FinancialDataNumericFields } from '../FinancialDataNumericFields';

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
  const trackedForm = useTrackedForm({
    formName: 'financial_data_form',
    section: 'financial-data-form',
    isEdit: !!initialValue,
  });
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

    // Validar que los valores sean números válidos
    const capitalSavedNum = parseFloat(capitalSaved) || 0;
    const capitalLoanedNum = parseFloat(capitalLoaned) || 0;
    const profitsGeneratedNum = parseFloat(profitsGenerated) || 0;

    // Validar que no sean negativos
    if (capitalSavedNum < 0 || capitalLoanedNum < 0 || profitsGeneratedNum < 0) {
      return;
    }

    const value: FinancialDataInput = {
      countryCode,
      currencyCode: getDefaultCurrencyForCountry(countryCode) as CurrencyCode,
      capitalSaved: capitalSavedNum,
      capitalLoaned: capitalLoanedNum,
      profitsGenerated: profitsGeneratedNum,
    };

    await trackedForm.onSubmit(
      async () => {
        await onSubmit(value);
      },
      {
        countryCode,
        currencyCode: value.currencyCode,
      }
    );
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

      {/* Campos numéricos */}
      <FinancialDataNumericFields
        capitalSaved={capitalSaved}
        capitalLoaned={capitalLoaned}
        profitsGenerated={profitsGenerated}
        onCapitalSavedChange={setCapitalSaved}
        onCapitalLoanedChange={setCapitalLoaned}
        onProfitsGeneratedChange={setProfitsGenerated}
      />

      <div className="flex gap-2 pt-2">
        <Button type="submit" disabled={isSubmitting || !countryCode}>
          {isSubmitting ? 'Guardando...' : 'Guardar'}
        </Button>
        {onCancel ? (
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              trackedForm.onCancel({ countryCode: countryCode || undefined });
              onCancel();
            }}
          >
            Cancelar
          </Button>
        ) : null}
      </div>
    </form>
  );
};
