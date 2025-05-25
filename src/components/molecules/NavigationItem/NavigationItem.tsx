import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LucideIcon } from 'lucide-react'

interface NavigationItemProps {
  to: string
  icon: LucideIcon
  label: string
  className?: string
}

const NavigationItem: React.FC<NavigationItemProps> = ({ 
  to, 
  icon: Icon, 
  label, 
  className = '' 
}) => {
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <Link
      to={to}
      className={`
        flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-all duration-200
        ${isActive 
          ? 'bg-primary-teal text-neutral-white shadow-sm' 
          : 'text-neutral-gray hover:text-primary-teal hover:bg-primary-teal/10'
        }
        ${className}
      `}
    >
      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
      <span className="font-medium text-sm sm:text-base">{label}</span>
    </Link>
  )
}

export default NavigationItem 