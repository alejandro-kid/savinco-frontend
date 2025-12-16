import { useNavigate } from 'react-router-dom';
import { TrackedPage } from '../../../../shared/analytics';
import { Card } from '../../../../shared/ui/components/Card';
import { FinancialDataForm } from '../components/FinancialDataForm';
import { useCreateFinancialData } from '../hooks/use-create-financial-data';

export const FinancialDataCreatePage = () => {
  const navigate = useNavigate();
  const { create, isMutating, error } = useCreateFinancialData();

  const handleSubmit = async (value: Parameters<typeof create>[0]) => {
    await create(value);
    navigate('/dashboard');
  };

  const handleCancel = () => navigate('/dashboard');

  return (
    <TrackedPage pageName="Create Financial Data" properties={{ section: 'financial-data-form' }}>
      <main className="mx-auto max-w-3xl px-4 py-8">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Crear Datos Financieros</h1>
          <p className="text-sm text-gray-600">
            Define los datos financieros para un país. Los valores se almacenan en la moneda
            original y se mostrarán convertidos a USD.
          </p>
        </header>

        <Card>
          <FinancialDataForm
            isSubmitting={isMutating}
            errorMessage={error}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </Card>
      </main>
    </TrackedPage>
  );
};
