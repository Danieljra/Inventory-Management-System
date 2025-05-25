import React from 'react'
import { useForm } from 'react-hook-form'
import { X, Mail } from 'lucide-react'
import { EmailData } from '../../../types/inventory'
import Button from '../../atoms/Button'
import Input from '../../atoms/Input'

interface EmailModalProps {
  isOpen: boolean
  onClose: () => void
  onSend: (data: EmailData) => void
  isLoading?: boolean
  companyName?: string
}

const EmailModal: React.FC<EmailModalProps> = ({
  isOpen,
  onClose,
  onSend,
  isLoading = false,
  companyName
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<EmailData>({
    defaultValues: {
      subject: companyName 
        ? `Inventario de ${companyName}` 
        : 'Reporte de Inventario Completo'
    }
  })

  const handleFormSubmit = (data: EmailData) => {
    onSend(data)
    reset()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#009689]" />
              <h3 className="text-lg font-semibold text-gray-900">
                Enviar Inventario por Email
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <Input
              label="Correo de destino"
              type="email"
              {...register('to', {
                required: 'El correo es requerido',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Ingresa un correo válido'
                }
              })}
              placeholder="ejemplo@correo.com"
              error={errors.to?.message}
            />

            <Input
              label="Asunto"
              {...register('subject', { required: 'El asunto es requerido' })}
              placeholder="Asunto del correo"
              error={errors.subject?.message}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mensaje (opcional)
              </label>
              <textarea
                {...register('message')}
                placeholder="Mensaje adicional..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009689]"
              />
            </div>

            {/* Botones */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={onClose}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={!isValid || isLoading}
                className="flex-1"
              >
                {isLoading ? 'Enviando...' : 'Enviar'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EmailModal 