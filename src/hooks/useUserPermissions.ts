import { UserRole, UserPermissions } from '../types/user'

const getCurrentUserRole = (): UserRole => {
  // Simular que el usuario logueado es admin
  // En una implementación real, esto vendría del contexto de auth
  return 'admin' // Cambiar por 'external' para probar vista de usuario externo
}

export const useUserPermissions = (): UserPermissions & { userRole: UserRole } => {
  const userRole = getCurrentUserRole()

  const permissions: UserPermissions = {
    canCreateCompany: userRole === 'admin',
    canEditCompany: userRole === 'admin',
    canDeleteCompany: userRole === 'admin',
    canViewCompanies: true // Ambos tipos de usuario pueden ver
  }

  return {
    ...permissions,
    userRole
  }
} 