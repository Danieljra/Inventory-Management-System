import { Product, CreateProductData } from '../types/product'

let products: Product[] = []

export const productService = {
  createProduct: async (data: CreateProductData): Promise<Product> => {
    const newProduct: Product = {
      ...data,
      empresaNombre: '' // Se llenaría con la empresa real
    }
    products.push(newProduct)
    return newProduct
  },

  getAllProducts: async (): Promise<Product[]> => {
    return products
  }
} 