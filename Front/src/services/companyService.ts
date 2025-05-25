import { Company, CreateCompanyRequest, UpdateCompanyRequest } from '../types/company'

// Datos mock para simular la base de datos
let mockCompanies: Company[] = [
  {
    nit: '900123456',
    name: 'TechCorp Solutions',
    address: 'Calle 123 #45-67, Bogotá',
    phone: '+57 301 234 5678',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    nit: '800987654',
    name: 'Innovación Digital SAS',
    address: 'Carrera 15 #89-12, Medellín',
    phone: '+57 314 876 5432',
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-02-20')
  },
  {
    nit: '700555888',
    name: 'Servicios Empresariales Ltda',
    address: 'Avenida 68 #23-45, Cali',
    phone: '+57 322 555 8888',
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-03-10')
  }
]

// Simular delay de red
const simulateApiDelay = () => new Promise(resolve => setTimeout(resolve, 800))

export const companyService = {
  // Obtener todas las empresas
  getAllCompanies: async (): Promise<Company[]> => {
    await simulateApiDelay()
    return [...mockCompanies].sort((a, b) => a.name.localeCompare(b.name))
  },

  // Obtener empresa por NIT
  getCompanyByNit: async (nit: string): Promise<Company | null> => {
    await simulateApiDelay()
    return mockCompanies.find(company => company.nit === nit) || null
  },

  // Crear nueva empresa
  createCompany: async (data: CreateCompanyRequest): Promise<Company> => {
    await simulateApiDelay()
    
    // Verificar si el NIT ya existe
    const existingCompany = mockCompanies.find(company => company.nit === data.nit)
    if (existingCompany) {
      throw new Error('Ya existe una empresa con este NIT')
    }

    const newCompany: Company = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    mockCompanies.push(newCompany)
    return newCompany
  },

  // Actualizar empresa
  updateCompany: async (nit: string, data: UpdateCompanyRequest): Promise<Company> => {
    await simulateApiDelay()
    
    const companyIndex = mockCompanies.findIndex(company => company.nit === nit)
    if (companyIndex === -1) {
      throw new Error('Empresa no encontrada')
    }

    const updatedCompany: Company = {
      ...mockCompanies[companyIndex],
      ...data,
      updatedAt: new Date()
    }

    mockCompanies[companyIndex] = updatedCompany
    return updatedCompany
  },

  // Eliminar empresa
  deleteCompany: async (nit: string): Promise<void> => {
    await simulateApiDelay()
    
    const companyIndex = mockCompanies.findIndex(company => company.nit === nit)
    if (companyIndex === -1) {
      throw new Error('Empresa no encontrada')
    }

    mockCompanies.splice(companyIndex, 1)
  }
} 