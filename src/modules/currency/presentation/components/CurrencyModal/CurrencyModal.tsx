import { Modal } from '../../../../../shared/ui/components/Modal';
import { CurrencyForm, type CurrencyFormProps } from '../CurrencyForm';

export interface CurrencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  initialValue?: CurrencyFormProps['initialValue'];
  onSubmit: CurrencyFormProps['onSubmit'];
  isSubmitting?: boolean;
  errorMessage?: string | null;
}

export const CurrencyModal = ({
  isOpen,
  onClose,
  title,
  initialValue,
  onSubmit,
  isSubmitting = false,
  errorMessage,
}: CurrencyModalProps) => {
  const handleSubmit = async (value: Parameters<typeof onSubmit>[0]) => {
    try {
      await onSubmit(value);
    } catch (_error) {
      // Error ya está manejado por el componente padre
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} disabled={isSubmitting}>
      <CurrencyForm
        initialValue={initialValue}
        isSubmitting={isSubmitting}
        errorMessage={errorMessage}
        onSubmit={handleSubmit}
        onCancel={onClose}
      />
    </Modal>
  );
};
