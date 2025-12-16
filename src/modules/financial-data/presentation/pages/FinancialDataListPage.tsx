import { useNavigate } from 'react-router-dom';
import { TrackedPage } from '../../../../shared/analytics';
import { FinancialDataList } from '../components/FinancialDataList';
import { useDeleteFinancialData } from '../hooks/use-delete-financial-data';
import { useGetAllFinancialData } from '../hooks/use-get-all-financial-data';

export const FinancialDataListPage = () => {
  const navigate = useNavigate();
  const { items, isLoading, error, reload } = useGetAllFinancialData();
  const { remove } = useDeleteFinancialData();

  const handleCreateClick = () => navigate('/dashboard/create');
  const handleSummaryClick = () => navigate('/dashboard/summary');
  const handleEditClick = (countryCode: string) => navigate(`/dashboard/edit/${countryCode}`);

  const handleDeleteClick = async (countryCode: string) => {
    // Confirm simple, más adelante se podría sustituir por un modal
    // eslint-disable-next-line no-alert
    const confirmed = window.confirm(
      '¿Estás seguro de que quieres eliminar los datos financieros de este país?'
    );
    if (!confirmed) return;
    await remove(countryCode as never);
  };

  return (
    <TrackedPage pageName="Dashboard" properties={{ section: 'financial-data-list' }}>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <header className="mb-6 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Financial Data Dashboard</h1>
            <p className="text-sm text-gray-600">
              Gestiona y visualiza los datos financieros de los países con valores consolidados en
              USD.
            </p>
          </div>
        </header>

        <FinancialDataList
          items={items}
          isLoading={isLoading}
          error={error}
          onCreateClick={handleCreateClick}
          onSummaryClick={handleSummaryClick}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
          onRetry={reload}
        />
      </main>
    </TrackedPage>
  );
};
