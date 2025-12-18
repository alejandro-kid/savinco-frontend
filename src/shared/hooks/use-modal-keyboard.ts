import { useEffect } from 'react';

export interface UseModalKeyboardOptions {
  isOpen: boolean;
  onClose: () => void;
  onSave?: () => void;
  disabled?: boolean;
  modalRef?: React.RefObject<HTMLDivElement | null>;
}

/**
 * Hook para manejar eventos de teclado en modales
 * - ESC: Cierra el modal
 * - Enter: Presiona el botón guardar (si existe y no está deshabilitado)
 */
export const useModalKeyboard = ({
  isOpen,
  onClose,
  onSave,
  disabled = false,
  modalRef,
}: UseModalKeyboardOptions) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // ESC: Cerrar modal
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      // Enter: Presionar botón guardar
      if (event.key === 'Enter' && !disabled) {
        // No ejecutar si el usuario está escribiendo en un input, textarea, etc.
        const target = event.target as HTMLElement;
        const isInputElement =
          target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;

        // Si hay una función onSave explícita, usarla
        if (onSave && (!isInputElement || event.ctrlKey || event.metaKey)) {
          event.preventDefault();
          onSave();
          return;
        }

        // Si no hay onSave, buscar el botón submit dentro del modal
        if (!isInputElement || event.ctrlKey || event.metaKey) {
          const modalElement = modalRef?.current;
          if (modalElement) {
            const submitButton = modalElement.querySelector<HTMLButtonElement>(
              'button[type="submit"]:not(:disabled)'
            );
            if (submitButton) {
              event.preventDefault();
              submitButton.click();
            }
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, onSave, disabled, modalRef]);
};
