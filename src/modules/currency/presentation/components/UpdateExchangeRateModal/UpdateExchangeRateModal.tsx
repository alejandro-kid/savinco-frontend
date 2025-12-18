import { Modal } from '../../../../../shared/ui/components/Modal';
import {
  UpdateExchangeRateForm,
  type UpdateExchangeRateFormProps,
} from '../UpdateExchangeRateForm';

export interface UpdateExchangeRateModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  initialValue?: number;
  onSubmit: UpdateExchangeRateFormProps['onSubmit'];
  isSubmitting?: boolean;
  errorMessage?: string | null;
}

export const UpdateExchangeRateModal = ({
  isOpen,
  onClose,
  title,
  initialValue,
  onSubmit,
  isSubmitting = false,
  errorMessage,
}: UpdateExchangeRateModalProps) => {
  const handleSubmit = async (value: Parameters<typeof onSubmit>[0]) => {
    try {
      await onSubmit(value);
    } catch (_error) {
      // Error ya está manejado por el componente padre
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} disabled={isSubmitting}>
      <UpdateExchangeRateForm
        initialValue={initialValue}
        isSubmitting={isSubmitting}
        errorMessage={errorMessage}
        onSubmit={handleSubmit}
        onCancel={onClose}
      />
    </Modal>
  );
};
