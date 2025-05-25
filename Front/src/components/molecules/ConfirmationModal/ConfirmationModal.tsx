import React from 'react'
import { AlertTriangle, X } from 'lucide-react'
import Button from '../../atoms/Button'

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  isLoading?: boolean
  variant?: 'danger' | 'warning' | 'info'
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  isLoading = false,
  variant = 'danger'
}) => {
  if (!isOpen) return null

  const iconColors = {
    danger: 'text-red-500',
    warning: 'text-yellow-500',
    info: 'text-primary-blue'
  }

  const confirmButtonVariant = variant === 'danger' ? 'primary' : 'secondary'

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-neutral-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-neutral-white rounded-lg shadow-2xl max-w-md w-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-gray/20">
            <div className="flex items-center space-x-3">
              <AlertTriangle className={`w-6 h-6 ${iconColors[variant]}`} />
              <h3 className="text-lg font-semibold text-neutral-black">
                {title}
              </h3>
            </div>
            <button
              onClick={onClose}
              disabled={isLoading}
              className="text-neutral-gray hover:text-neutral-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <p className="text-neutral-gray">{message}</p>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 p-6 border-t border-neutral-gray/20">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1"
            >
              {cancelText}
            </Button>
            <Button
              variant={confirmButtonVariant}
              onClick={onConfirm}
              loading={isLoading}
              className="flex-1"
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConfirmationModal 