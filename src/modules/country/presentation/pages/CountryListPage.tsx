import { useState } from 'react';
import { TrackedPage } from '../../../../shared/analytics';
import { useDashboardEntities } from '../../../../shared/dashboard';
import { ErrorMessage } from '../../../../shared/ui/components/ErrorMessage';
import { LoadingSpinner } from '../../../../shared/ui/components/LoadingSpinner';
import type { CreateCountryInput } from '../../domain/types';
import { DashboardLayout } from '../../../financial-data/presentation/components/DashboardLayout';
import { CountryCard } from '../components/CountryCard';
import { CountryModal } from '../components/CountryModal';
import { useCreateCountry } from '../hooks/use-create-country';
import { useGetAllCountries } from '../hooks/use-get-all-countries';

export const CountryListPage = () => {
  const { items, isLoading, error, reload } = useGetAllCountries();
  const { create, isMutating: isCreating, error: createError } = useCreateCountry();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Obtener entidades del dashboard desde la configuración centralizada
  const entities = useDashboardEntities();

  const handleCreateClick = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateSubmit = async (value: CreateCountryInput) => {
    await create(value);
    await reload();
    setIsCreateModalOpen(false);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const isProcessing = isCreating;
  const errorMessage = error || createError;

  return (
    <TrackedPage pageName="Dashboard" properties={{ section: 'country-list' }}>
      <DashboardLayout
        entities={entities}
        onCreateClick={handleCreateClick}
        createButtonLabel="Agregar País"
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
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100" aria-label="Icono de países vacíos">
              <svg
                width="40"
                height="40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">No hay países</h3>
            <p className="mb-6 text-sm text-gray-600">
              Comienza agregando un país con su moneda asociada.
            </p>
            <button
              type="button"
              onClick={handleCreateClick}
              className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg"
            >
              Agregar País
            </button>
          </div>
        ) : null}

        {/* Cards Grid */}
        {!isLoading && !errorMessage && items.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <CountryCard key={item.code} item={item} isProcessing={isProcessing} />
            ))}
          </div>
        ) : null}

        {/* Create Modal */}
        <CountryModal
          isOpen={isCreateModalOpen}
          onClose={handleCloseCreateModal}
          title="Crear País"
          onSubmit={handleCreateSubmit}
          isSubmitting={isCreating}
          errorMessage={createError}
        />
      </DashboardLayout>
    </TrackedPage>
  );
};
