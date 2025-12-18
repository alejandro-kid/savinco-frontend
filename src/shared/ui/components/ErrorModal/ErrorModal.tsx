import { Button } from '../Button';
import { Modal } from '../Modal';

export interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  closeLabel?: string;
}

export const ErrorModal = ({
  isOpen,
  onClose,
  title,
  message,
  closeLabel = 'Cerrar',
}: ErrorModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-6">
        {/* Error Message */}
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm text-red-700">{message}</p>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 border-t border-gray-200 pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            {closeLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
