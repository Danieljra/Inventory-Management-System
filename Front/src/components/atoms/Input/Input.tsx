import React, { forwardRef } from 'react'

interface InputProps {
  id?: string
  name?: string
  type?: 'text' | 'email' | 'password' | 'number'
  placeholder?: string
  label?: string
  error?: string
  disabled?: boolean
  required?: boolean
  className?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  step?: string | number
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  id,
  name,
  type = 'text',
  placeholder,
  label,
  error,
  disabled = false,
  required = false,
  className = '',
  value,
  onChange,
  ...props
}, ref) => {
  const baseClasses = 'w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-teal/20 focus:border-primary-teal'
  const errorClasses = error 
    ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' 
    : 'border-neutral-gray/30 hover:border-neutral-gray/50'
  const disabledClasses = disabled 
    ? 'bg-neutral-gray/10 cursor-not-allowed text-neutral-gray/60' 
    : 'bg-neutral-white text-neutral-black'
  
  const inputClasses = `${baseClasses} ${errorClasses} ${disabledClasses} ${className}`
  
  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={id} 
          className="block text-sm font-medium text-neutral-black mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        value={value}
        onChange={onChange}
        className={inputClasses}
        {...props}
      />
      {error && (
        <p className="mt-2 text-sm text-red-500">{error}</p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input 