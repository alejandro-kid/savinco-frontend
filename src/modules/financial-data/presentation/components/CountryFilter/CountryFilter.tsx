import { useMemo } from 'react';
import { useTrackedFilter } from '../../../../../shared/analytics';
import { useAppSelector } from '../../../../../shared/redux/store';
import { Select } from '../../../../../shared/ui/components/Select';
import { selectAllCountries } from '../../../../country/infrastructure/redux/country.selectors';
import { useGetAllCountries } from '../../../../country/presentation/hooks/use-get-all-countries';
import type { CountryCode } from '../../../domain/types';

export type FilterOption = 'ALL' | CountryCode;

export interface CountryFilterProps {
  value: FilterOption;
  onChange: (value: FilterOption) => void;
  disabled?: boolean;
}

export const CountryFilter = ({ value, onChange, disabled }: CountryFilterProps) => {
  const trackedFilter = useTrackedFilter({
    filterName: 'country_filter',
    section: 'home-page',
  });

  // Cargar países desde Redux
  useGetAllCountries();
  const countries = useAppSelector(selectAllCountries);

  // Crear opciones dinámicamente desde los países en la base de datos
  const countryOptions = useMemo(() => {
    const options: Array<{ value: FilterOption; label: string }> = [
      { value: 'ALL', label: 'Todos los Países' },
    ];
    countries.forEach((country) => {
      options.push({
        value: country.code,
        label: country.name,
      });
    });
    return options;
  }, [countries]);

  return (
    <div className="flex items-center gap-3">
      <label htmlFor="country-filter" className="text-sm font-medium text-gray-700">
        Filtrar por país:
      </label>
      <Select
        id="country-filter"
        value={value}
        onChange={(e) => {
          const newValue = e.target.value as FilterOption;
          trackedFilter.onChange(newValue, value, onChange);
        }}
        disabled={disabled}
        className="min-w-[180px]"
      >
        {countryOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  );
};
