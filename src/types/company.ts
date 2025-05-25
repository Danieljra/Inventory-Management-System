export interface Company {
  nit: string // Llave primaria
  name: string
  address: string
  phone: string
  createdAt: Date
  updatedAt: Date
}

export interface CompanyFormData {
  nit: string
  name: string
  address: string
  phone: string
}

export interface CreateCompanyRequest extends CompanyFormData {}

export interface UpdateCompanyRequest extends Omit<CompanyFormData, 'nit'> {} 