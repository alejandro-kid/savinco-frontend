import type { ReactNode } from 'react';
import { Modal } from '../../../../../shared/ui/components/Modal';

export interface FinancialDataModalBaseProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  onSave?: () => void;
  disabled?: boolean;
}

export const FinancialDataModalBase = ({
  isOpen,
  onClose,
  title,
  children,
  onSave,
  disabled = false,
}: FinancialDataModalBaseProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} onSave={onSave} disabled={disabled}>
      {children}
    </Modal>
  );
};
