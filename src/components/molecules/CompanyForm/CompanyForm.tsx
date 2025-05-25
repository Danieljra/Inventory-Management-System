import React from 'react'
import { useForm } from 'react-hook-form'
import { CompanyFormData, Company } from '../../../types/company'
import FormField from '../FormField'
import Button from '../../atoms/Button'

interface CompanyFormProps {
  onSubmit: (data: CompanyFormData) => Promise<void>
  initialData?: Company
  isEditing?: boolean
  loading?: boolean
}

const CompanyForm: React.FC<CompanyFormProps> = ({ 
  onSubmit, 
  initialData, 
  isEditing = false, 
  loading = false 
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset
  } = useForm<CompanyFormData>({
    mode: 'onChange',
    defaultValues: initialData ? {
      nit: initialData.nit,
      name: initialData.name,
      address: initialData.address,
      phone: initialData.phone
    } : undefined
  })

  const handleFormSubmit = async (data: CompanyFormData) => {
    try {
      await onSubmit(data)
      if (!isEditing) {
        reset() // Limpiar formulario solo al crear
      }
    } catch (error) {
      console.error('Error en formulario:', error)
    }
  }

  return (
    <div className="bg-neutral-white rounded-lg shadow-sm border border-neutral-gray/20 p-6">
      <h2 className="text-xl font-semibold text-neutral-black mb-6">
        {isEditing ? 'Editar Empresa' : 'Registrar Nueva Empresa'}
      </h2>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <FormField
          name="nit"
          label="NIT"
          type="text"
          placeholder="Ej: 900123456"
          required
          error={errors.nit}
          register={register}
          disabled={loading || isEditing} // NIT no se puede editar
        />

        <FormField
          name="name"
          label="Nombre de la Empresa"
          type="text"
          placeholder="Ej: TechCorp Solutions"
          required
          error={errors.name}
          register={register}
          disabled={loading}
        />

        <FormField
          name="address"
          label="Dirección"
          type="text"
          placeholder="Ej: Calle 123 #45-67, Ciudad"
          required
          error={errors.address}
          register={register}
          disabled={loading}
        />

        <FormField
          name="phone"
          label="Teléfono"
          type="text"
          placeholder="Ej: +57 301 234 5678"
          required
          error={errors.phone}
          register={register}
          disabled={loading}
        />

        <div className="flex space-x-3 pt-4">
          <Button
            type="submit"
            variant="primary"
            disabled={!isValid}
            loading={loading}
            className="flex-1"
          >
            {loading 
              ? (isEditing ? 'Actualizando...' : 'Registrando...') 
              : (isEditing ? 'Actualizar Empresa' : 'Registrar Empresa')
            }
          </Button>
          
          {isEditing && (
            <Button
              type="button"
              variant="outline"
              onClick={() => reset()}
              disabled={loading}
            >
              Cancelar
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}

export default CompanyForm 