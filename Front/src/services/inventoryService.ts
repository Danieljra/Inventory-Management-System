import { InventoryByCompany, EmailData } from '../types/inventory'
import { companyService } from './companyService'
import { productService } from './productService'

export const inventoryService = {
  getInventoryByCompany: async (): Promise<InventoryByCompany[]> => {
    try {
      const [companies, products] = await Promise.all([
        companyService.getAllCompanies(),
        productService.getAllProducts()
      ])

      const inventoryByCompany: InventoryByCompany[] = companies.map(company => {
        const companyProducts = products
          .filter(product => product.empresaId === company.nit)
          .map(product => ({
            ...product,
            empresaNombre: company.name,
            empresaNit: company.nit
          }))

        return {
          empresa: company,
          productos: companyProducts,
          totalProductos: companyProducts.length
        }
      })

      return inventoryByCompany.filter(inventory => inventory.totalProductos > 0)
    } catch (error) {
      console.error('Error getting inventory:', error)
      return []
    }
  },

  sendInventoryByEmail: async (emailData: EmailData, companyNit?: string): Promise<boolean> => {
    try {
      // Simulo de envío de email
      console.log('Enviando email:', emailData)
      console.log('Para empresa:', companyNit || 'Todas las empresas')
      
      // Simulo delay de envío
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      return true
    } catch (error) {
      console.error('Error sending email:', error)
      return false
    }
  }
} 