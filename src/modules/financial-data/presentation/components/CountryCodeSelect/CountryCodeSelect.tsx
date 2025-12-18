import type { SelectHTMLAttributes } from 'react';
import { useAppSelector } from '../../../../../shared/redux/store';
import { Select } from '../../../../../shared/ui/components/Select';
import { selectAllCountries } from '../../../../country/infrastructure/redux/country.selectors';
import { useGetAllCountries } from '../../../../country/presentation/hooks/use-get-all-countries';

export type CountryCodeSelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export const CountryCodeSelect = (props: CountryCodeSelectProps) => {
  // Cargar países desde Redux
  useGetAllCountries();
  const countries = useAppSelector(selectAllCountries);

  return (
    <Select {...props} key={`country-select-${countries.length}`}>
      <option key="empty-option" value="">
        Selecciona un país
      </option>
      {countries.map((country) => (
        <option key={country.code} value={country.code}>
          {country.name} ({country.code})
        </option>
      ))}
    </Select>
  );
};
