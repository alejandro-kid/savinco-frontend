import { useTrackedFilter } from '../../../../../shared/analytics';
import { Select } from '../../../../../shared/ui/components/Select';
import { CountryCode } from '../../../domain/types';

export type FilterOption = 'ALL' | CountryCode;

export interface CountryFilterProps {
  value: FilterOption;
  onChange: (value: FilterOption) => void;
  disabled?: boolean;
}

const COUNTRY_OPTIONS: Array<{ value: FilterOption; label: string }> = [
  { value: 'ALL', label: 'Todos los Países' },
  { value: CountryCode.ECU, label: 'Ecuador' },
  { value: CountryCode.ESP, label: 'España' },
  { value: CountryCode.PER, label: 'Perú' },
  { value: CountryCode.NPL, label: 'Nepal' },
];

export const CountryFilter = ({ value, onChange, disabled }: CountryFilterProps) => {
  const trackedFilter = useTrackedFilter({
    filterName: 'country_filter',
    section: 'home-page',
  });

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
        {COUNTRY_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  );
};
