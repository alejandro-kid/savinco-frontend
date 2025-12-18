import { Input } from '../Input';

export interface NumericInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  min?: number;
  max?: number;
  step?: string;
  allowNegative?: boolean;
  title?: string;
}

/**
 * Componente genérico para inputs numéricos con validación
 * - Solo permite números y punto decimal
 * - Valida formato numérico
 * - Opcionalmente permite valores negativos
 */
export const NumericInput = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  disabled = false,
  required = false,
  min,
  max,
  step,
  allowNegative = false,
  title,
}: NumericInputProps) => {
  // Validar que solo se acepten números y punto decimal
  const validateNumericInput = (inputValue: string): string => {
    // Permitir vacío para poder borrar
    if (inputValue === '') return '';

    // Solo permitir números, punto decimal y opcionalmente signo negativo
    const numericRegex = allowNegative ? /^-?\d*\.?\d*$/ : /^\d*\.?\d*$/;
    if (!numericRegex.test(inputValue)) {
      return inputValue.slice(0, -1); // Eliminar el último carácter si no es válido
    }

    // Asegurar que solo haya un punto decimal
    const parts = inputValue.split('.');
    if (parts.length > 2) {
      return `${parts[0]}.${parts.slice(1).join('')}`;
    }

    // No permitir valores negativos si no está permitido
    if (!allowNegative && inputValue.startsWith('-')) {
      return inputValue.slice(1);
    }

    return inputValue;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const validatedValue = validateNumericInput(event.target.value);
    onChange(validatedValue);
  };

  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-xs font-medium text-gray-700">
        {label}
      </label>
      <Input
        id={id}
        type="text"
        inputMode="decimal"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        min={min}
        max={max}
        step={step}
        pattern={allowNegative ? '^-?\\d*\\.?\\d*$' : '^\\d*\\.?\\d*$'}
        title={title || 'Ingrese solo números y un punto decimal'}
      />
    </div>
  );
};
