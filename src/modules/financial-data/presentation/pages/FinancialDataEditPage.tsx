import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TrackedPage } from '../../../../shared/analytics';
import { Card } from '../../../../shared/ui/components/Card';
import { ErrorMessage } from '../../../../shared/ui/components/ErrorMessage';
import { LoadingSpinner } from '../../../../shared/ui/components/LoadingSpinner';
import type { CountryCode, FinancialDataInput } from '../../domain/types';
import { FinancialDataForm } from '../components/FinancialDataForm';
import { useGetByCountry } from '../hooks/use-get-by-country';
import { useUpdateFinancialData } from '../hooks/use-update-financial-data';

export const FinancialDataEditPage = () => {
  const navigate = useNavigate();
  const { countryCode } = useParams<{ countryCode: string }>();
  const { load, isLoading: isLoadingData, error: loadError } = useGetByCountry();
  const { update, isMutating, error: updateError } = useUpdateFinancialData();
  const [existingData, setExistingData] = useState<FinancialDataInput | null>(null);

  // Cargar datos existentes al montar el componente
  useEffect(() => {
    if (
      countryCode &&
      (countryCode === 'ECU' ||
        countryCode === 'ESP' ||
        countryCode === 'PER' ||
        countryCode === 'NPL')
    ) {
      load(countryCode as CountryCode)
        .then((data) => {
          if (data) {
            setExistingData({
              countryCode: data.countryCode,
              currencyCode: data.originalCurrency,
              capitalSaved: data.capitalSaved,
              capitalLoaned: data.capitalLoaned,
              profitsGenerated: data.profitsGenerated,
            });
          }
        })
        .catch(() => {
          // Error ya está manejado por el hook
        });
    }
  }, [countryCode, load]);

  const handleSubmit = async (value: FinancialDataInput) => {
    if (!countryCode) return;
    await update(countryCode as CountryCode, value);
    navigate('/dashboard');
  };

  const handleCancel = () => navigate('/dashboard');

  // Validar que el countryCode sea válido
  if (!countryCode || !['ECU', 'ESP', 'PER', 'NPL'].includes(countryCode)) {
    return (
      <TrackedPage pageName="Edit Financial Data" properties={{ section: 'financial-data-form' }}>
        <main className="mx-auto max-w-3xl px-4 py-8">
          <Card>
            <ErrorMessage>Código de país inválido</ErrorMessage>
          </Card>
        </main>
      </TrackedPage>
    );
  }

  // Mostrar loading mientras se cargan los datos
  if (isLoadingData) {
    return (
      <TrackedPage pageName="Edit Financial Data" properties={{ section: 'financial-data-form' }}>
        <main className="mx-auto max-w-3xl px-4 py-8">
          <Card>
            <div className="flex justify-center py-12">
              <LoadingSpinner />
            </div>
          </Card>
        </main>
      </TrackedPage>
    );
  }

  // Mostrar error si no se pudieron cargar los datos
  if (loadError && !existingData) {
    return (
      <TrackedPage pageName="Edit Financial Data" properties={{ section: 'financial-data-form' }}>
        <main className="mx-auto max-w-3xl px-4 py-8">
          <Card>
            <ErrorMessage>{loadError}</ErrorMessage>
          </Card>
        </main>
      </TrackedPage>
    );
  }

  return (
    <TrackedPage pageName="Edit Financial Data" properties={{ section: 'financial-data-form' }}>
      <main className="mx-auto max-w-3xl px-4 py-8">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Editar Datos Financieros</h1>
          <p className="text-sm text-gray-600">
            Actualiza los datos financieros para {countryCode}. Los valores se almacenan en la
            moneda original y se mostrarán convertidos a USD.
          </p>
        </header>

        <Card>
          <FinancialDataForm
            initialValue={existingData ?? undefined}
            isSubmitting={isMutating}
            errorMessage={updateError}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </Card>
      </main>
    </TrackedPage>
  );
};
