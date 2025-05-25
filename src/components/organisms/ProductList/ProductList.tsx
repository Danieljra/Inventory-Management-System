import React from 'react'
import { Product } from '../../../types/product'

interface ProductListProps {
  products: Product[]
  isLoading?: boolean
}

const ProductList: React.FC<ProductListProps> = ({ products, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">
          Productos ({products.length})
        </h2>
      </div>

      {products.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          No hay productos registrados
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {products.map((product, index) => (
            <div key={`${product.codigo}-${index}`} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {product.nombre}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Código: {product.codigo}
                  </p>
                  <p className="text-gray-700 mb-3">
                    {product.caracteristicas}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="bg-[#009689] text-white px-2 py-1 rounded">
                      {product.precio.toLocaleString()} {product.moneda}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductList 