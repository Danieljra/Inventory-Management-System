export interface Product {
  codigo: string
  nombre: string
  caracteristicas: string
  precio: number
  moneda: 'USD' | 'COP' | 'EUR'
  empresaId: string
  empresaNombre?: string
}

export interface CreateProductData {
  codigo: string
  nombre: string
  caracteristicas: string
  precio: number
  moneda: 'USD' | 'COP' | 'EUR'
  empresaId: string
} 