import React from 'react'
import { User } from 'lucide-react'

interface UserInfoProps {
  userName: string
  userType: string
  className?: string
}

const UserInfo: React.FC<UserInfoProps> = ({ 
  userName, 
  userType, 
  className = '' 
}) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="flex items-center justify-center w-8 h-8 bg-primary-teal/10 rounded-full">
        <User className="w-4 h-4 text-primary-teal" />
      </div>
      <div className="text-sm">
        <div className="text-neutral-black font-medium">{userName}</div>
        <div className="text-neutral-gray text-xs">{userType}</div>
      </div>
    </div>
  )
}

export default UserInfo 