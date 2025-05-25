import React from 'react'
import { Building2, Package, Archive, LogOut } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

interface MobileNavigationProps {
  isOpen: boolean
  onClose: () => void
  userName: string
  userType: string
  onLogout: () => void
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isOpen,
  onClose,
  userName,
  userType,
  onLogout
}) => {
  const location = useLocation()

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

  const handleLinkClick = () => {
    onClose()
  }

  const handleLogout = () => {
    onLogout()
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-neutral-black/50 z-40 lg:hidden"
        onClick={onClose}
      />
      
      {/* Mobile Menu */}
      <div className="fixed top-0 right-0 w-80 max-w-[90vw] h-full bg-neutral-white shadow-2xl z-50 lg:hidden transform transition-transform duration-300">
        <div className="p-6">
          {/* User Info */}
          <div className="border-b border-neutral-gray/20 pb-6 mb-6">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-teal/10 rounded-full">
                <div className="w-6 h-6 bg-primary-teal rounded-full"></div>
              </div>
              <div>
                <div className="text-neutral-black font-medium">{userName}</div>
                <div className="text-neutral-gray text-sm">{userType}</div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2 mb-6">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.to
              
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={handleLinkClick}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
                    ${isActive 
                      ? 'bg-primary-teal text-neutral-white' 
                      : 'text-neutral-gray hover:text-primary-teal hover:bg-primary-teal/10'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 w-full text-left text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default MobileNavigation 