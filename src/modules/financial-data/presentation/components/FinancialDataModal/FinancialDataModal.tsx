import type { ReactNode } from 'react';
import { Button } from '../../../../../shared/ui/components/Button';
import { Card } from '../../../../../shared/ui/components/Card';
import { FinancialDataForm, type FinancialDataFormProps } from '../FinancialDataForm';

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
  if (!isOpen) return null;

  const handleSubmit = async (value: Parameters<typeof onSubmit>[0]) => {
    try {
      await onSubmit(value);
      // Modal se cierra desde el componente padre después de éxito
    } catch (error) {
      // Error ya está manejado por el componente padre
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <Card className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            aria-label="Cerrar"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Form */}
        <FinancialDataForm
          initialValue={initialValue}
          isSubmitting={isSubmitting}
          errorMessage={errorMessage}
          onSubmit={handleSubmit}
          onCancel={onClose}
        />
      </Card>
    </div>
  );
};
