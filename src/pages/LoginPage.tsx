import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../components/organisms/LoginForm'
import { LoginFormData } from '../types/auth'
import { loginUser } from '../services/authService'
import LoginTemplate from '../components/templates/LoginTemplate'

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (data: LoginFormData) => {
    setLoading(true)
    try {
      const response = await loginUser(data)
      
      // Guardar token (aquí podrías usar Context, Zustand, etc.)
      localStorage.setItem('authToken', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
      
      // Redirigir al dashboard o home
      navigate('/inicio')
      
    } catch (error) {
      console.error('Error de login:', error)
      // Aquí podrías mostrar un toast de error
      alert('Error: Credenciales inválidas')
    } finally {
      setLoading(false)
    }
  }

  return (
    <LoginTemplate>
      <LoginForm onSubmit={handleLogin} loading={loading} />
    </LoginTemplate>
  )
}

export default LoginPage 