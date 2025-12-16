import { useNavigate } from 'react-router-dom';
import { TrackedPage } from '../../../../shared/analytics';
import { Button } from '../../../../shared/ui/components/Button';
import { FinancialDataSummaryComponent } from '../components/FinancialDataSummary';
import { useGetSummary } from '../hooks/use-get-summary';

export const FinancialDataSummaryPage = () => {
  const navigate = useNavigate();
  const { summary, isLoading, error } = useGetSummary();

  return (
    <TrackedPage pageName="Financial Summary" properties={{ section: 'financial-summary' }}>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <header className="mb-6 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Resumen Consolidado</h1>
            <p className="text-sm text-gray-600">
              Visualiza los totales globales y el desglose por país en USD.
            </p>
          </div>
          <Button variant="secondary" onClick={() => navigate('/dashboard')}>
            Volver al dashboard
          </Button>
        </header>

        <FinancialDataSummaryComponent summary={summary} isLoading={isLoading} error={error} />
      </main>
    </TrackedPage>
  );
};
