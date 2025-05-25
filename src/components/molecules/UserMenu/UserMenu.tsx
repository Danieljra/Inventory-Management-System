import React from 'react'
import { LogOut, User } from 'lucide-react'
import UserInfo from '../../atoms/UserInfo'
import Button from '../../atoms/Button'

interface UserMenuProps {
  userName: string
  userType: string
  onLogout: () => void
  showFull?: boolean
  className?: string
}

const UserMenu: React.FC<UserMenuProps> = ({ 
  userName, 
  userType, 
  onLogout,
  showFull = true,
  className = '' 
}) => {
  if (!showFull) {
    // Versión compacta para tablet
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div className="flex items-center justify-center w-8 h-8 bg-primary-teal/10 rounded-full">
          <User className="w-4 h-4 text-primary-teal" />
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onLogout}
          className="text-neutral-gray hover:text-red-500 hover:bg-red-50"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      <UserInfo userName={userName} userType={userType} />
      <Button
        variant="ghost"
        size="sm"
        onClick={onLogout}
        className="flex items-center space-x-2 text-neutral-gray hover:text-red-500 hover:bg-red-50"
      >
        <LogOut className="w-4 h-4" />
        <span className="hidden xl:inline">Cerrar Sesión</span>
      </Button>
    </div>
  )
}

export default UserMenu 