import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DateDisplay from '../../atoms/DateDisplay'
import HamburgerButton from '../../atoms/HamburgerButton'
import UserMenu from '../../molecules/UserMenu'
import Navigation from '../../molecules/Navigation'
import MobileNavigation from '../../molecules/MobileNavigation'

interface HeaderProps {
  className?: string
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  // Simular datos del usuario logueado (luego vendrá de context/store)
  const userData = {
    name: 'Juan Pérez',
    type: 'Administrador'
  }

  const handleLogout = () => {
    // Limpiar storage
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    
    // Redirigir al login
    navigate('/')
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <header className={`bg-neutral-white shadow-sm border-b border-neutral-gray/20 sticky top-0 z-30 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Fecha actual - Lado izquierdo */}
            <div className="flex-shrink-0">
              {/* Desktop/Tablet */}
              <div className="hidden sm:block">
                <DateDisplay />
              </div>
              {/* Mobile */}
              <div className="sm:hidden">
                <DateDisplay compact showTime={false} />
              </div>
            </div>

            {/* Navegación central - Solo desktop */}
            <div className="hidden lg:flex flex-1 justify-center">
              <Navigation />
            </div>

            {/* Lado derecho */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* User Menu - Desktop */}
              <div className="hidden lg:block">
                <UserMenu
                  userName={userData.name}
                  userType={userData.type}
                  onLogout={handleLogout}
                  showFull={true}
                />
              </div>

              {/* User Menu - Tablet */}
              <div className="hidden sm:block lg:hidden">
                <UserMenu
                  userName={userData.name}
                  userType={userData.type}
                  onLogout={handleLogout}
                  showFull={false}
                />
              </div>

              {/* Hamburger Button - Mobile/Tablet */}
              <HamburgerButton
                isOpen={isMobileMenuOpen}
                onClick={toggleMobileMenu}
              />
            </div>
          </div>

          {/* Navigation Bar para Tablet */}
          <div className="hidden sm:block lg:hidden border-t border-neutral-gray/20 py-2">
            <Navigation className="justify-center" />
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <MobileNavigation
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
        userName={userData.name}
        userType={userData.type}
        onLogout={handleLogout}
      />
    </>
  )
}

export default Header 