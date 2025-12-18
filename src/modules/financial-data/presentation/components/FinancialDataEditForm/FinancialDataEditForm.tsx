import type { FormEvent } from 'react';
import { useState } from 'react';
import { Button } from '../../../../../shared/ui/components/Button';
import { ErrorMessage } from '../../../../../shared/ui/components/ErrorMessage';
import type {
  CountryCode,
  CountryName,
  CurrencyCode,
  FinancialDataInput,
} from '../../../domain/types';
import { FinancialDataCountryInfo } from '../FinancialDataCountryInfo';
import { FinancialDataNumericFields } from '../FinancialDataNumericFields';

export interface FinancialDataEditFormProps {
  countryCode: CountryCode;
  countryName: CountryName;
  currencyCode: CurrencyCode;
  initialCapitalSaved: number;
  initialCapitalLoaned: number;
  initialProfitsGenerated: number;
  isSubmitting?: boolean;
  errorMessage?: string | null;
  onSubmit: (value: FinancialDataInput) => Promise<void> | void;
  onCancel?: () => void;
}

export const FinancialDataEditForm = ({
  countryCode,
  countryName,
  currencyCode,
  initialCapitalSaved,
  initialCapitalLoaned,
  initialProfitsGenerated,
  isSubmitting,
  errorMessage,
  onSubmit,
  onCancel,
}: FinancialDataEditFormProps) => {
  const [capitalSaved, setCapitalSaved] = useState<string>(initialCapitalSaved.toString());
  const [capitalLoaned, setCapitalLoaned] = useState<string>(initialCapitalLoaned.toString());
  const [profitsGenerated, setProfitsGenerated] = useState<string>(
    initialProfitsGenerated.toString()
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
      currencyCode,
      capitalSaved: capitalSavedNum,
      capitalLoaned: capitalLoanedNum,
      profitsGenerated: profitsGeneratedNum,
    };

    await onSubmit(value);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}

      {/* Información del país y moneda (solo lectura) */}
      <FinancialDataCountryInfo countryName={countryName} currencyCode={currencyCode} />

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
        <Button type="submit" disabled={isSubmitting}>
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
