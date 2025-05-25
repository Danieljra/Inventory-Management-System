import React from 'react'
import { Menu, X } from 'lucide-react'

interface HamburgerButtonProps {
  isOpen: boolean
  onClick: () => void
  className?: string
}

const HamburgerButton: React.FC<HamburgerButtonProps> = ({ 
  isOpen, 
  onClick, 
  className = '' 
}) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg text-neutral-gray hover:text-primary-teal hover:bg-primary-teal/10 transition-all duration-200 lg:hidden ${className}`}
      aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
    >
      {isOpen ? (
        <X className="w-6 h-6" />
      ) : (
        <Menu className="w-6 h-6" />
      )}
    </button>
  )
}

export default HamburgerButton 