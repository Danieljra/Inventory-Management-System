import React from 'react'
import { Building2, Package, Archive } from 'lucide-react'
import NavigationItem from '../NavigationItem'

interface NavigationProps {
  className?: string
}

const Navigation: React.FC<NavigationProps> = ({ className = '' }) => {
  const navigationItems = [
    {
      to: '/empresas',
      icon: Building2,
      label: 'Empresas'
    },
    {
      to: '/productos',
      icon: Package,
      label: 'Productos'
    },
    {
      to: '/inventario',
      icon: Archive,
      label: 'Inventario'
    }
  ]

  return (
    <nav className={`flex items-center space-x-1 sm:space-x-2 ${className}`}>
      {navigationItems.map((item) => (
        <NavigationItem
          key={item.to}
          to={item.to}
          icon={item.icon}
          label={item.label}
        />
      ))}
    </nav>
  )
}

export default Navigation 