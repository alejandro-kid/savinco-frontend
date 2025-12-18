import type { ReactNode } from 'react';
import { useRef } from 'react';
import { type UseModalKeyboardOptions, useModalKeyboard } from '../../../hooks/use-modal-keyboard';
import { Card } from '../Card';

export interface ModalProps extends UseModalKeyboardOptions {
  title: string;
  children: ReactNode;
  className?: string;
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  onSave,
  disabled = false,
  className,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Hook para manejar eventos de teclado (ESC y Enter)
  useModalKeyboard({
    isOpen,
    onClose,
    onSave,
    disabled,
    modalRef,
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div ref={modalRef} className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <Card className={className}>
          {/* Header */}
          <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <button
              type="button"
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
                aria-label="Cerrar"
              >
                <title>Cerrar</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Content */}
          {children}
        </Card>
      </div>
    </div>
  );
};
