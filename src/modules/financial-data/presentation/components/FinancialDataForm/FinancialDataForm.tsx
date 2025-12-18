import type { FormEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useTrackedForm } from '../../../../../shared/analytics';
import { useAppSelector } from '../../../../../shared/redux/store';
import { Button } from '../../../../../shared/ui/components/Button';
import { ErrorMessage } from '../../../../../shared/ui/components/ErrorMessage';
import { Input } from '../../../../../shared/ui/components/Input';
import { selectAllCountries } from '../../../../country/infrastructure/redux/country.selectors';
import { useGetAllCountries } from '../../../../country/presentation/hooks/use-get-all-countries';
import type { CountryCode, CurrencyCode, FinancialDataInput } from '../../../domain/types';
import { CountryCodeSelect } from '../CountryCodeSelect';
import { FinancialDataNumericFields } from '../FinancialDataNumericFields';

export interface FinancialDataFormProps {
  initialValue?: FinancialDataInput;
  isSubmitting?: boolean;
  errorMessage?: string | null;
  onSubmit: (value: FinancialDataInput) => Promise<void> | void;
  onCancel?: () => void;
}

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
  const [currencyCode, setCurrencyCode] = useState<string>(initialValue?.currencyCode ?? '');
  const [capitalSaved, setCapitalSaved] = useState<string>(
    initialValue?.capitalSaved.toString() ?? ''
  );
  const [capitalLoaned, setCapitalLoaned] = useState<string>(
    initialValue?.capitalLoaned.toString() ?? ''
  );
  const [profitsGenerated, setProfitsGenerated] = useState<string>(
    initialValue?.profitsGenerated.toString() ?? ''
  );

  // Asegurar que los países estén cargados
  useGetAllCountries();

  // Obtener todos los países desde Redux
  const allCountries = useAppSelector(selectAllCountries);

  // Obtener el país seleccionado desde el array de países
  const selectedCountry = useMemo(() => {
    if (!countryCode) {
      return undefined;
    }
    return allCountries.find((country) => country.code === countryCode);
  }, [allCountries, countryCode]);

  // Actualizar currencyCode automáticamente cuando se selecciona un país
  useEffect(() => {
    // Si estamos editando, no cambiar la moneda
    if (initialValue?.currencyCode) {
      return;
    }
    // Si hay un país seleccionado, usar su moneda
    if (selectedCountry?.currencyCode) {
      setCurrencyCode(selectedCountry.currencyCode);
    } else if (!countryCode) {
      // Si no hay país seleccionado, limpiar la moneda
      setCurrencyCode('');
    }
  }, [selectedCountry, countryCode, initialValue?.currencyCode]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!countryCode || !currencyCode) {
      return;
    }

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
      currencyCode: currencyCode as CurrencyCode,
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
            value={currencyCode || ''}
            disabled
            readOnly
            placeholder={countryCode ? 'Se llenará automáticamente' : 'Selecciona un país primero'}
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
        <Button type="submit" disabled={isSubmitting || !countryCode || !currencyCode}>
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
