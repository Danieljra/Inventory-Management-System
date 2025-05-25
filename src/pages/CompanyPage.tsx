import React, { useState, useEffect } from 'react'
import { Plus, Users } from 'lucide-react'
import CompanyForm from '../components/molecules/CompanyForm'
import CompanyList from '../components/organisms/CompanyList'
import Button from '../components/atoms/Button'
import { useUserPermissions } from '../hooks/useUserPermissions'
import { Company, CompanyFormData } from '../types/company'
import { companyService } from '../services/companyService'
import Header from '../components/organisms/Header/Header'

const CompanyPage: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [formLoading, setFormLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingCompany, setEditingCompany] = useState<Company | null>(null)
  const { canCreateCompany, canEditCompany, canDeleteCompany, userRole } = useUserPermissions()

  // Cargo las  empresas al montar el componente
  useEffect(() => {
    loadCompanies()
  }, [])

  const loadCompanies = async () => {
    try {
      setLoading(true)
      const data = await companyService.getAllCompanies()
      setCompanies(data)
    } catch (error) {
      console.error('Error al cargar empresas:', error)
      alert('Error al cargar las empresas')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateCompany = async (data: CompanyFormData) => {
    try {
      setFormLoading(true)
      const newCompany = await companyService.createCompany(data)
      setCompanies(prev => [...prev, newCompany].sort((a, b) => a.name.localeCompare(b.name)))
      setShowForm(false)
      alert('Empresa registrada exitosamente')
    } catch (error: any) {
      console.error('Error al crear empresa:', error)
      alert(error.message || 'Error al registrar la empresa')
    } finally {
      setFormLoading(false)
    }
  }

  const handleEditCompany = async (data: CompanyFormData) => {
    if (!editingCompany) return

    try {
      setFormLoading(true)
      const updatedCompany = await companyService.updateCompany(editingCompany.nit, {
        name: data.name,
        address: data.address,
        phone: data.phone
      })
      
      setCompanies(prev => 
        prev.map(company => 
          company.nit === editingCompany.nit ? updatedCompany : company
        ).sort((a, b) => a.name.localeCompare(b.name))
      )
      
      setEditingCompany(null)
      alert('Empresa actualizada exitosamente')
    } catch (error: any) {
      console.error('Error al actualizar empresa:', error)
      alert(error.message || 'Error al actualizar la empresa')
    } finally {
      setFormLoading(false)
    }
  }

  const handleDeleteCompany = async (nit: string) => {
    try {
      await companyService.deleteCompany(nit)
      setCompanies(prev => prev.filter(company => company.nit !== nit))
      alert('Empresa eliminada exitosamente')
    } catch (error: any) {
      console.error('Error al eliminar empresa:', error)
      alert(error.message || 'Error al eliminar la empresa')
    }
  }

  const handleEditClick = (company: Company) => {
    setEditingCompany(company)
    setShowForm(true)
  }

  const getUserTypeLabel = () => {
    switch (userRole) {
      case 'admin':
        return 'Administrador'
      case 'external':
        return 'Usuario Externo'
      default:
        return 'Usuario'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-neutral-black mb-2">
              Gestión de Empresas
            </h1>
            <div className="flex items-center space-x-2 text-sm text-neutral-gray">
              <Users className="w-4 h-4" />
              <span>Tipo de usuario: {getUserTypeLabel()}</span>
            </div>
          </div>

          {canCreateCompany && (
            <div className="mt-4 sm:mt-0">
              <Button
                variant="primary"
                onClick={() => {
                  setEditingCompany(null)
                  setShowForm(!showForm)
                }}
                className="flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Nueva Empresa</span>
              </Button>
            </div>
          )}
        </div>

        {/* Form Section */}
        {showForm && canCreateCompany && (
          <div className="mb-8">
            <CompanyForm
              onSubmit={editingCompany ? handleEditCompany : handleCreateCompany}
              initialData={editingCompany || undefined}
              isEditing={!!editingCompany}
              loading={formLoading}
            />
          </div>
        )}

        {/* Companies List */}
        <CompanyList
          companies={companies}
          canEdit={canEditCompany}
          canDelete={canDeleteCompany}
          onEdit={handleEditClick}
          onDelete={handleDeleteCompany}
          loading={loading}
        />
      </main>
    </div>
  )
}

export default CompanyPage 