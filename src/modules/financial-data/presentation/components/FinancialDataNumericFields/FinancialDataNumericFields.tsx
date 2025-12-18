import { Input } from '../../../../../shared/ui/components/Input';

export interface FinancialDataNumericFieldsProps {
  capitalSaved: string;
  capitalLoaned: string;
  profitsGenerated: string;
  onCapitalSavedChange: (value: string) => void;
  onCapitalLoanedChange: (value: string) => void;
  onProfitsGeneratedChange: (value: string) => void;
}

export const FinancialDataNumericFields = ({
  capitalSaved,
  capitalLoaned,
  profitsGenerated,
  onCapitalSavedChange,
  onCapitalLoanedChange,
  onProfitsGeneratedChange,
}: FinancialDataNumericFieldsProps) => {
  // Validar que solo se acepten números y punto decimal
  const validateNumericInput = (value: string): string => {
    // Permitir vacío para poder borrar
    if (value === '') return '';

    // Solo permitir números, punto decimal y un solo punto
    const numericRegex = /^-?\d*\.?\d*$/;
    if (!numericRegex.test(value)) {
      return value.slice(0, -1); // Eliminar el último carácter si no es válido
    }

    // Asegurar que solo haya un punto decimal
    const parts = value.split('.');
    if (parts.length > 2) {
      return `${parts[0]}.${parts.slice(1).join('')}`;
    }

    // No permitir valores negativos
    if (value.startsWith('-')) {
      return value.slice(1);
    }

    return value;
  };

  const handleCapitalSavedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = validateNumericInput(event.target.value);
    onCapitalSavedChange(value);
  };

  const handleCapitalLoanedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = validateNumericInput(event.target.value);
    onCapitalLoanedChange(value);
  };

  const handleProfitsGeneratedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = validateNumericInput(event.target.value);
    onProfitsGeneratedChange(value);
  };

  return (
    <div className="grid gap-3 md:grid-cols-3">
      <div>
        <label htmlFor="capital-saved" className="mb-1 block text-xs font-medium text-gray-700">
          Capital Ahorrado
        </label>
        <Input
          id="capital-saved"
          type="text"
          inputMode="decimal"
          value={capitalSaved}
          onChange={handleCapitalSavedChange}
          pattern="^\d*\.?\d*$"
          title="Ingrese solo números y un punto decimal (ej: 1000.50)"
        />
      </div>

      <div>
        <label htmlFor="capital-loaned" className="mb-1 block text-xs font-medium text-gray-700">
          Capital Prestado
        </label>
        <Input
          id="capital-loaned"
          type="text"
          inputMode="decimal"
          value={capitalLoaned}
          onChange={handleCapitalLoanedChange}
          pattern="^\d*\.?\d*$"
          title="Ingrese solo números y un punto decimal (ej: 1000.50)"
        />
      </div>

      <div>
        <label htmlFor="profits-generated" className="mb-1 block text-xs font-medium text-gray-700">
          Utilidades Generadas
        </label>
        <Input
          id="profits-generated"
          type="text"
          inputMode="decimal"
          value={profitsGenerated}
          onChange={handleProfitsGeneratedChange}
          pattern="^\d*\.?\d*$"
          title="Ingrese solo números y un punto decimal (ej: 1000.50)"
        />
      </div>
    </div>
  );
};
