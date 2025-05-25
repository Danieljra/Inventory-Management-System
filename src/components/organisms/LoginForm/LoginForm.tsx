import React from 'react'
import { useForm } from 'react-hook-form'
import { LoginFormData } from '../../../types/auth'
import FormField from '../../molecules/FormField'
import Button from '../../atoms/Button'

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>
  loading?: boolean
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, loading = false }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<LoginFormData>({
    mode: 'onChange'
  })

  const handleFormSubmit = async (data: LoginFormData) => {
    try {
      await onSubmit(data)
    } catch (error) {
      console.error('Error en login:', error)
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-neutral-black mb-2">
          Iniciar Sesión
        </h1>
        <p className="text-neutral-gray">
          Ingresa tus credenciales para acceder
        </p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <FormField
          name="email"
          label="Correo electrónico"
          type="email"
          placeholder="tu@email.com"
          required
          error={errors.email}
          register={register}
          disabled={loading}
        />

        <FormField
          name="password"
          label="Contraseña"
          type="password"
          placeholder="••••••••"
          required
          error={errors.password}
          register={register}
          disabled={loading}
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={!isValid}
          loading={loading}
        >
          {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </Button>
      </form>
    </div>
  )
}

export default LoginForm 