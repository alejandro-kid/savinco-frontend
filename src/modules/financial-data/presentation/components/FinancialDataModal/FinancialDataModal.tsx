import { FinancialDataForm, type FinancialDataFormProps } from '../FinancialDataForm';
import { FinancialDataModalBase } from '../FinancialDataModalBase';

export interface FinancialDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  initialValue?: FinancialDataFormProps['initialValue'];
  onSubmit: FinancialDataFormProps['onSubmit'];
  isSubmitting?: boolean;
  errorMessage?: string | null;
}

export const FinancialDataModal = ({
  isOpen,
  onClose,
  title,
  initialValue,
  onSubmit,
  isSubmitting = false,
  errorMessage,
}: FinancialDataModalProps) => {
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
      <FinancialDataForm
        initialValue={initialValue}
        isSubmitting={isSubmitting}
        errorMessage={errorMessage}
        onSubmit={handleSubmit}
        onCancel={onClose}
      />
    </FinancialDataModalBase>
  );
};
