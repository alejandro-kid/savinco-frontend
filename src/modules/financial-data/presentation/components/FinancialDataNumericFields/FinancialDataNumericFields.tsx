import { NumericInput } from '../../../../../shared/ui/components/NumericInput';

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
  return (
    <div className="grid gap-3 md:grid-cols-3">
      <NumericInput
        id="capital-saved"
        label="Capital Ahorrado"
        value={capitalSaved}
        onChange={onCapitalSavedChange}
        title="Ingrese solo números y un punto decimal (ej: 1000.50)"
      />

      <NumericInput
        id="capital-loaned"
        label="Capital Prestado"
        value={capitalLoaned}
        onChange={onCapitalLoanedChange}
        title="Ingrese solo números y un punto decimal (ej: 1000.50)"
      />

      <NumericInput
        id="profits-generated"
        label="Utilidades Generadas"
        value={profitsGenerated}
        onChange={onProfitsGeneratedChange}
        title="Ingrese solo números y un punto decimal (ej: 1000.50)"
      />
    </div>
  );
};
