import React from 'react'
import { FieldError } from 'react-hook-form'
import Input from '../../atoms/Input'

interface FormFieldProps {
  name: string
  label: string
  type?: 'text' | 'email' | 'password'
  placeholder?: string
  required?: boolean
  error?: FieldError
  register: any
  disabled?: boolean
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  type = 'text',
  placeholder,
  required = false,
  error,
  register,
  disabled = false
}) => {
  return (
    <Input
      {...register(name)}
      id={name}
      type={type}
      label={label}
      placeholder={placeholder}
      required={required}
      error={error?.message}
      disabled={disabled}
    />
  )
}

export default FormField 