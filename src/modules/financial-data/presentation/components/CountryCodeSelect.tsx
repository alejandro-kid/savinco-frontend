import type { SelectHTMLAttributes } from 'react';
import { Select } from '../../../../shared/ui/components/Select';
import { CountryCode } from '../../domain/types';

export type CountryCodeSelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export const CountryCodeSelect = (props: CountryCodeSelectProps) => {
  return (
    <Select {...props}>
      <option value="">Selecciona un país</option>
      <option value={CountryCode.ECU}>Ecuador (ECU)</option>
      <option value={CountryCode.ESP}>España (ESP)</option>
      <option value={CountryCode.PER}>Perú (PER)</option>
      <option value={CountryCode.NPL}>Nepal (NPL)</option>
    </Select>
  );
};
