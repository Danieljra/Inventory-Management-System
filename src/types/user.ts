export type UserRole = 'admin' | 'external'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
}

export interface UserPermissions {
  canCreateCompany: boolean
  canEditCompany: boolean
  canDeleteCompany: boolean
  canViewCompanies: boolean
} 