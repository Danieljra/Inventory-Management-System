import { LoginFormData, LoginResponse } from '../types/auth'

export const loginUser = async (data: LoginFormData): Promise<LoginResponse> => {
  // Simulo delay de API
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  // Simulo validación
  if (data.email === 'admin@test.com' && data.password === '123456') {
    return {
      token: 'mock-jwt-token',
      user: {
        id: '1',
        email: data.email,
        name: 'Usuario Demo'
      }
    }
  }
  
  throw new Error('Credenciales inválidas')
} 