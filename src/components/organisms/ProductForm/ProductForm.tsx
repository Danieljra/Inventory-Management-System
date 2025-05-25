import React from 'react'
import { useForm } from 'react-hook-form'
import { CreateProductData } from '../../../types/product'
import { Company } from '../../../types/company'
import Button from '../../atoms/Button'
import Input from '../../atoms/Input'

interface ProductFormProps {
  companies: Company[]
  onSubmit: (data: CreateProductData) => void
  isLoading?: boolean
}

const ProductForm: React.FC<ProductFormProps> = ({ companies, onSubmit, isLoading = false }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<CreateProductData>()

  const handleFormSubmit = (data: CreateProductData) => {
    onSubmit(data)
    reset()
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Crear Producto</h2>
      
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Código
          </label>
          <Input
            {...register('codigo', { required: 'El código es requerido' })}
            placeholder="Código del producto"
            error={errors.codigo?.message}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre del Producto
          </label>
          <Input
            {...register('nombre', { required: 'El nombre es requerido' })}
            placeholder="Nombre del producto"
            error={errors.nombre?.message}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Características
          </label>
          <textarea
            {...register('caracteristicas', { required: 'Las características son requeridas' })}
            placeholder="Describe las características del producto"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#009689]"
            rows={3}
          />
          {errors.caracteristicas && (
            <p className="text-red-500 text-sm mt-1">{errors.caracteristicas.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Precio
            </label>
            <Input
              type="number"
              step="0.01"
              {...register('precio', { required: 'El precio es requerido', min: 0 })}
              placeholder="0.00"
              error={errors.precio?.message}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Moneda
            </label>
            <select
              {...register('moneda', { required: 'Selecciona una moneda' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#009689]"
            >
              <option value="">Seleccionar moneda</option>
              <option value="COP">COP - Peso Colombiano</option>
              <option value="USD">USD - Dólar Americano</option>
              <option value="EUR">EUR - Euro</option>
            </select>
            {errors.moneda && (
              <p className="text-red-500 text-sm mt-1">{errors.moneda.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Empresa
          </label>
          <select
            {...register('empresaId', { required: 'Selecciona una empresa' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#009689]"
          >
            <option value="">Seleccionar empresa</option>
            {companies.map((company) => (
              <option key={company.nit} value={company.nit}>
                {company.name}
              </option>
            ))}
          </select>
          {errors.empresaId && (
            <p className="text-red-500 text-sm mt-1">{errors.empresaId.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={!isValid || isLoading}
          className="w-full"
        >
          {isLoading ? 'Creando...' : 'Crear Producto'}
        </Button>
      </form>
    </div>
  )
}

export default ProductForm 