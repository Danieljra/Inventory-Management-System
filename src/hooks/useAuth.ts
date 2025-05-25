import {  createContext, useContext } from 'react'

interface User {
  email: string
  tipo: 'administrador' | 'externo'
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    // Mock para desarrollo - retorna admin por defecto
    return {
      user: { email: 'admin@test.com', tipo: 'administrador' as const },
      isAuthenticated: true,
      login: async () => true,
      logout: () => {}
    }
  }
  return context
} 