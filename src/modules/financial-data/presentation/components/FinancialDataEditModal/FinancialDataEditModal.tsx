import type { FinancialDataEditFormProps } from '../FinancialDataEditForm';
import { FinancialDataEditForm } from '../FinancialDataEditForm';
import { FinancialDataModalBase } from '../FinancialDataModalBase';

export interface FinancialDataEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  countryCode: FinancialDataEditFormProps['countryCode'];
  countryName: FinancialDataEditFormProps['countryName'];
  currencyCode: FinancialDataEditFormProps['currencyCode'];
  initialCapitalSaved: FinancialDataEditFormProps['initialCapitalSaved'];
  initialCapitalLoaned: FinancialDataEditFormProps['initialCapitalLoaned'];
  initialProfitsGenerated: FinancialDataEditFormProps['initialProfitsGenerated'];
  onSubmit: FinancialDataEditFormProps['onSubmit'];
  isSubmitting?: boolean;
  errorMessage?: string | null;
}

export const FinancialDataEditModal = ({
  isOpen,
  onClose,
  title,
  countryCode,
  countryName,
  currencyCode,
  initialCapitalSaved,
  initialCapitalLoaned,
  initialProfitsGenerated,
  onSubmit,
  isSubmitting = false,
  errorMessage,
}: FinancialDataEditModalProps) => {
  const handleSubmit = async (value: Parameters<typeof onSubmit>[0]) => {
    try {
      await onSubmit(value);
      // Modal se cierra desde el componente padre después de éxito
    } catch (_error) {
      // Error ya está manejado por el componente padre
    }
  };

  return (
    <FinancialDataModalBase isOpen={isOpen} onClose={onClose} title={title} disabled={isSubmitting}>
      <FinancialDataEditForm
        countryCode={countryCode}
        countryName={countryName}
        currencyCode={currencyCode}
        initialCapitalSaved={initialCapitalSaved}
        initialCapitalLoaned={initialCapitalLoaned}
        initialProfitsGenerated={initialProfitsGenerated}
        isSubmitting={isSubmitting}
        errorMessage={errorMessage}
        onSubmit={handleSubmit}
        onCancel={onClose}
      />
    </FinancialDataModalBase>
  );
};
