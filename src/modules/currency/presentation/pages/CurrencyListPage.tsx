import { useState } from 'react';
import { TrackedPage, useTrackedOperation } from '../../../../shared/analytics';
import { useDashboardEntities } from '../../../../shared/dashboard';
import { ErrorMessage } from '../../../../shared/ui/components/ErrorMessage';
import { LoadingSpinner } from '../../../../shared/ui/components/LoadingSpinner';
import { DashboardLayout } from '../../../financial-data/presentation/components/DashboardLayout';
import { getCurrencyByCodeUseCase } from '../../application/use-cases/get-currency-by-code.use-case';
import type {
  CreateCurrencyInput,
  CurrencyCode,
  UpdateExchangeRateInput,
} from '../../domain/types';
import { CurrencyCard } from '../components/CurrencyCard';
import { CurrencyModal } from '../components/CurrencyModal';
import { UpdateExchangeRateModal } from '../components/UpdateExchangeRateModal';
import { useCreateCurrency } from '../hooks/use-create-currency';
import { useCurrencyRepository } from '../hooks/use-currency-repository';
import { useGetAllCurrencies } from '../hooks/use-get-all-currencies';
import { useUpdateExchangeRate } from '../hooks/use-update-exchange-rate';

export const CurrencyListPage = () => {
  const trackedOperation = useTrackedOperation({
    entityName: 'currency',
    section: 'currency-list',
  });
  const { items, isLoading, error, reload } = useGetAllCurrencies();
  const { create, isMutating: isCreating, error: createError } = useCreateCurrency();
  const { update, isMutating: isUpdating, error: updateError } = useUpdateExchangeRate();
  const repository = useCurrencyRepository();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCode, setEditingCode] = useState<CurrencyCode | null>(null);
  const [editingExchangeRate, setEditingExchangeRate] = useState<number | null>(null);

  // Obtener entidades del dashboard desde la configuración centralizada
  const entities = useDashboardEntities();

  const handleCreateClick = () => {
    trackedOperation.trackClick('create');
    setIsCreateModalOpen(true);
  };

  const handleCreateSubmit = async (value: CreateCurrencyInput) => {
    try {
      await trackedOperation.execute(
        'create',
        async () => {
          await create(value);
          await reload();
          setIsCreateModalOpen(false);
        },
        {
          currencyCode: value.code,
          isBase: value.isBase,
        }
      );
    } catch {
      // Error ya está manejado
    }
  };

  const handleEditClick = async (code: CurrencyCode) => {
    trackedOperation.trackModalOpened('edit', { currencyCode: code });
    setEditingCode(code);
    setIsEditModalOpen(true);

    try {
      const currency = await getCurrencyByCodeUseCase(repository, code);
      if (currency) {
        setEditingExchangeRate(currency.exchangeRateToBase);
      }
    } catch {
      setIsEditModalOpen(false);
    }
  };

  const handleEditSubmit = async (value: UpdateExchangeRateInput) => {
    if (!editingCode) return;
    try {
      await trackedOperation.execute(
        'update',
        async () => {
          await update(editingCode, value);
          await reload();
          setIsEditModalOpen(false);
          setEditingCode(null);
          setEditingExchangeRate(null);
        },
        {
          currencyCode: editingCode,
          exchangeRate: value.exchangeRateToBase,
        }
      );
    } catch {
      // Error ya está manejado
    }
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingCode(null);
    setEditingExchangeRate(null);
  };

  const isProcessing = isCreating || isUpdating;
  const errorMessage = error || createError || updateError;

  return (
    <TrackedPage pageName="Dashboard" properties={{ section: 'currency-list' }}>
      <DashboardLayout
        entities={entities}
        onCreateClick={handleCreateClick}
        createButtonLabel="Agregar Moneda"
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
                aria-label="Icono de monedas vacías"
              >
                <title>Icono de monedas vacías</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">No hay monedas</h3>
            <p className="mb-6 text-sm text-gray-600">
              Comienza agregando una moneda con su tasa de cambio.
            </p>
            <button
              type="button"
              onClick={handleCreateClick}
              className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg"
            >
              Agregar Moneda
            </button>
          </div>
        ) : null}

        {/* Cards Grid */}
        {!isLoading && !errorMessage && items.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <CurrencyCard
                key={item.code}
                item={item}
                onEdit={handleEditClick}
                isProcessing={isProcessing}
              />
            ))}
          </div>
        ) : null}

        {/* Create Modal */}
        <CurrencyModal
          isOpen={isCreateModalOpen}
          onClose={handleCloseCreateModal}
          title="Crear Moneda"
          onSubmit={handleCreateSubmit}
          isSubmitting={isCreating}
          errorMessage={createError}
        />

        {/* Edit Exchange Rate Modal */}
        <UpdateExchangeRateModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          title="Actualizar Tasa de Cambio"
          initialValue={editingExchangeRate ?? undefined}
          onSubmit={handleEditSubmit}
          isSubmitting={isUpdating}
          errorMessage={updateError}
        />
      </DashboardLayout>
    </TrackedPage>
  );
};
