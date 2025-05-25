import React, { useState, useEffect } from 'react'
import { Product, CreateProductData } from '../types/product'
import { Company } from '../types/company'
import { productService } from '../services/productService'
import { companyService } from '../services/companyService'
import ProductForm from '../components/organisms/ProductForm/ProductForm'
import ProductList from '../components/organisms/ProductList/ProductList'
import { useAuth } from '../hooks/useAuth'
import Header from '../components/organisms/Header/Header'


const ProductsPage: React.FC = () => {
  const { user } = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [companies, setCompanies] = useState<Company[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setIsLoading(true)
    try {
      const [productsData, companiesData] = await Promise.all([
        productService.getAllProducts(),
        companyService.getAllCompanies()
      ])
      setProducts(productsData)
      setCompanies(companiesData)
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateProduct = async (data: CreateProductData) => {
    try {
      setIsLoading(true)
      await productService.createProduct(data)
      await loadData()
    } catch (error) {
      console.error('Error creating product:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (user?.tipo !== 'administrador') {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Acceso Restringido</h1>
          <p className="text-gray-600">Solo los administradores pueden gestionar productos.</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Gestión de Productos</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ProductForm
            companies={companies}
            onSubmit={handleCreateProduct}
            isLoading={isLoading}
          />
          <ProductList products={products} isLoading={isLoading} />
        </div>
      </main>
    </div>
  )
}

export default ProductsPage 