export interface InventoryItem {
  codigo: string
  nombre: string
  caracteristicas: string
  precio: number
  moneda: 'USD' | 'COP' | 'EUR'
  empresaId: string
  empresaNombre: string
  empresaNit: string
}

export interface InventoryByCompany {
  empresa: {
    nit: string
    name: string
    address: string
    phone: string
  }
  productos: InventoryItem[]
  totalProductos: number
}

export interface EmailData {
  to: string
  subject: string
  message?: string
} 