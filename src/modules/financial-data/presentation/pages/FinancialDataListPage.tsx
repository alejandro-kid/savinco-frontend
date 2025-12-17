import { useState } from 'react';
import { TrackedPage } from '../../../../shared/analytics';
import { useDashboardEntities } from '../../../../shared/dashboard';
import { ErrorMessage } from '../../../../shared/ui/components/ErrorMessage';
import { LoadingSpinner } from '../../../../shared/ui/components/LoadingSpinner';
import type { CountryCode, FinancialDataInput } from '../../domain/types';
import { DashboardLayout } from '../components/DashboardLayout';
import { FinancialDataCard } from '../components/FinancialDataCard';
import { FinancialDataModal } from '../components/FinancialDataModal';
import { useCreateFinancialData } from '../hooks/use-create-financial-data';
import { useDeleteFinancialData } from '../hooks/use-delete-financial-data';
import { useGetAllFinancialData } from '../hooks/use-get-all-financial-data';
import { useGetByCountry } from '../hooks/use-get-by-country';
import { useUpdateFinancialData } from '../hooks/use-update-financial-data';

export const FinancialDataListPage = () => {
  const { items, isLoading, error, reload } = useGetAllFinancialData();
  const { create, isMutating: isCreating, error: createError } = useCreateFinancialData();
  const { update, isMutating: isUpdating, error: updateError } = useUpdateFinancialData();
  const { remove, isMutating: isDeleting } = useDeleteFinancialData();
  const { load: loadForEdit, isLoading: isLoadingEdit } = useGetByCountry();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCountryCode, setEditingCountryCode] = useState<CountryCode | null>(null);
  const [editingData, setEditingData] = useState<FinancialDataInput | null>(null);

  // Obtener entidades del dashboard desde la configuración centralizada
  const entities = useDashboardEntities();

  const handleCreateClick = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateSubmit = async (value: FinancialDataInput) => {
    await create(value);
    await reload();
    setIsCreateModalOpen(false);
  };

  const handleEditClick = async (countryCode: CountryCode) => {
    setEditingCountryCode(countryCode);
    setIsEditModalOpen(true);

    try {
      const data = await loadForEdit(countryCode);
      if (data) {
        setEditingData({
          countryCode: data.countryCode,
          currencyCode: data.originalCurrency,
          capitalSaved: data.capitalSaved,
          capitalLoaned: data.capitalLoaned,
          profitsGenerated: data.profitsGenerated,
        });
      }
    } catch {
      // Error ya está manejado por el hook
      setIsEditModalOpen(false);
    }
  };

  const handleEditSubmit = async (value: FinancialDataInput) => {
    if (!editingCountryCode) return;
    await update(editingCountryCode, value);
    await reload();
    setIsEditModalOpen(false);
    setEditingCountryCode(null);
    setEditingData(null);
  };

  const handleDeleteClick = async (countryCode: CountryCode) => {
    // eslint-disable-next-line no-alert
    const confirmed = window.confirm(
      '¿Estás seguro de que quieres eliminar los datos financieros de este país?'
    );
    if (!confirmed) return;

    await remove(countryCode);
    await reload();
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingCountryCode(null);
    setEditingData(null);
  };

  const isProcessing = isCreating || isUpdating || isDeleting || isLoadingEdit;
  const errorMessage = error || createError || updateError;

  return (
    <TrackedPage pageName="Dashboard" properties={{ section: 'financial-data-list' }}>
      <DashboardLayout
        entities={entities}
        onCreateClick={handleCreateClick}
        createButtonLabel="Agregar Datos Financieros"
      >
        {/* Error Message */}
        {errorMessage ? (
          <div className="mb-6">
            <ErrorMessage>
              <div className="flex items-center justify-between gap-2">
                <span>{errorMessage}</span>
                <button
                  type="button"
                  onClick={reload}
                  className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-red-700"
                  aria-label="Reintentar carga de datos"
                >
                  Reintentar
                </button>
              </div>
            </ErrorMessage>
          </div>
        ) : null}

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : null}

        {/* Empty State */}
        {!isLoading && !errorMessage && items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <svg
                width="40"
                height="40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-400"
                aria-label="Icono de datos financieros vacíos"
              >
                <title>Icono de datos financieros vacíos</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">No hay datos financieros</h3>
            <p className="mb-6 text-sm text-gray-600">
              Comienza agregando datos financieros para un país.
            </p>
            <button
              type="button"
              onClick={handleCreateClick}
              className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg"
            >
              Agregar Datos Financieros
            </button>
          </div>
        ) : null}

        {/* Cards Grid */}
        {!isLoading && !errorMessage && items.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <FinancialDataCard
                key={item.countryCode}
                item={item}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
                isProcessing={isProcessing}
              />
            ))}
          </div>
        ) : null}

        {/* Create Modal */}
        <FinancialDataModal
          isOpen={isCreateModalOpen}
          onClose={handleCloseCreateModal}
          title="Crear Datos Financieros"
          onSubmit={handleCreateSubmit}
          isSubmitting={isCreating}
          errorMessage={createError}
        />

        {/* Edit Modal */}
        <FinancialDataModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          title="Editar Datos Financieros"
          initialValue={editingData ?? undefined}
          onSubmit={handleEditSubmit}
          isSubmitting={isUpdating || isLoadingEdit}
          errorMessage={updateError}
        />
      </DashboardLayout>
    </TrackedPage>
  );
};
