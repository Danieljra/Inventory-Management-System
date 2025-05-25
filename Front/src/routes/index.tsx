import { createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import ProductsPage from '../pages/ProductsPage'
import InventoryPage from '../pages/InventoryPage'
import CompanyPage from '../pages/CompanyPage'

// Configuración básica de rutas - se expandirá más adelante
export const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />
  },
  {
    path: '/inicio',
    element: <HomePage />
  },
  {
    path: '/empresas',
    element: <CompanyPage />
  },
  {
    path: '/productos',
    element: <ProductsPage />
  },
  {
    path: '/inventario',
    element: <InventoryPage />
  }
]) 