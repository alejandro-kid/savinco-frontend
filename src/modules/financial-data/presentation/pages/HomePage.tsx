import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../shared/ui/components/Button';
import { ErrorMessage } from '../../../../shared/ui/components/ErrorMessage';
import { LoadingSpinner } from '../../../../shared/ui/components/LoadingSpinner';
import type { FinancialDataByCountrySummary } from '../../domain/types';
import { CountryBreakdownView } from '../components/CountryBreakdownView';
import { CountryFilter, type FilterOption } from '../components/CountryFilter';
import { FinancialMetricsCard } from '../components/FinancialMetricsCard';
import { HomeHero } from '../components/HomeHero';
import { useGetSummary } from '../hooks/use-get-summary';

export const HomePage = () => {
  const navigate = useNavigate();
  const { summary, isLoading, error } = useGetSummary();
  const [filter, setFilter] = useState<FilterOption>('ALL');

  // Calcular métricas según el filtro
  const metrics = useMemo(() => {
    if (!summary) {
      return {
        capitalSaved: 0,
        capitalLoaned: 0,
        profitsGenerated: 0,
        grandTotal: 0,
      };
    }

    if (filter === 'ALL') {
      return {
        capitalSaved: summary.totalCapitalSaved,
        capitalLoaned: summary.totalCapitalLoaned,
        profitsGenerated: summary.totalProfitsGenerated,
        grandTotal: summary.grandTotal,
      };
    }

    // Filtrar por país específico
    const countryData = summary.byCountry.find((item) => item.countryCode === filter) as
      | FinancialDataByCountrySummary
      | undefined;

    if (!countryData) {
      return {
        capitalSaved: 0,
        capitalLoaned: 0,
        profitsGenerated: 0,
        grandTotal: 0,
      };
    }

    return {
      capitalSaved: countryData.capitalSaved,
      capitalLoaned: countryData.capitalLoaned,
      profitsGenerated: countryData.profitsGenerated,
      grandTotal:
        countryData.capitalSaved + countryData.capitalLoaned + countryData.profitsGenerated,
    };
  }, [summary, filter]);

  // Obtener datos del país filtrado para mostrar nombre
  const filteredCountryName = useMemo(() => {
    if (filter === 'ALL' || !summary) return null;
    const countryData = summary.byCountry.find((item) => item.countryCode === filter);
    return countryData?.countryName || null;
  }, [summary, filter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* Hero Section */}
        <HomeHero />

        {/* Filter Section */}
        <div className="mb-6 flex flex-col items-stretch gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
          <CountryFilter value={filter} onChange={setFilter} disabled={isLoading} />
          <Button
            onClick={() => navigate('/dashboard')}
            variant="primary"
            className="w-full sm:w-auto sm:flex-shrink-0"
          >
            Ir al Dashboard
          </Button>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : null}

        {/* Error State */}
        {error ? (
          <div className="mb-6">
            <ErrorMessage>{error}</ErrorMessage>
          </div>
        ) : null}

        {/* Metrics Cards */}
        {!isLoading && !error && summary ? (
          <>
            {filteredCountryName ? (
              <div className="mb-4 text-center sm:mb-6">
                <h2 className="text-xl font-semibold text-gray-800 sm:text-2xl">
                  Datos de {filteredCountryName}
                </h2>
              </div>
            ) : null}

            <div className="mb-6 grid gap-4 sm:gap-6 sm:grid-cols-1 md:grid-cols-3">
              <FinancialMetricsCard
                title="Capital Ahorrado"
                value={metrics.capitalSaved}
                color="blue"
                icon={
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="flex-shrink-0"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                }
              />
              <FinancialMetricsCard
                title="Capital Prestado"
                value={metrics.capitalLoaned}
                color="indigo"
                icon={
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="flex-shrink-0"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                }
              />
              <FinancialMetricsCard
                title="Utilidades Generadas"
                value={metrics.profitsGenerated}
                color="emerald"
                icon={
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="flex-shrink-0"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                }
              />
            </div>

            {/* Grand Total Card (solo si es "Todos") */}
            {filter === 'ALL' ? (
              <div className="mb-6 sm:mb-8">
                <FinancialMetricsCard
                  title="Total Global"
                  value={metrics.grandTotal}
                  color="purple"
                  icon={
                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      className="flex-shrink-0"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  }
                />
              </div>
            ) : null}

            {/* Country Breakdown (solo si es "Todos") */}
            {filter === 'ALL' && summary.byCountry.length > 0 ? (
              <CountryBreakdownView
                data={summary.byCountry}
                onCountryClick={(countryCode) => setFilter(countryCode as FilterOption)}
              />
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  );
};
