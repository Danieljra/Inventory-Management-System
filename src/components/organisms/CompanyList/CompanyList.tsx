import React, { useState } from 'react'
import { Building2, Search } from 'lucide-react'
import { Company } from '../../../types/company'
import CompanyCard from '../../molecules/CompanyCard'
import Input from '../../atoms/Input'
import ConfirmationModal from '../../molecules/ConfirmationModal'

interface CompanyListProps {
  companies: Company[]
  canEdit: boolean
  canDelete: boolean
  onEdit: (company: Company) => void
  onDelete: (nit: string) => Promise<void>
  loading?: boolean
}

const CompanyList: React.FC<CompanyListProps> = ({
  companies,
  canEdit,
  canDelete,
  onEdit,
  onDelete,
  loading = false
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean
    company: Company | null
    loading: boolean
  }>({
    isOpen: false,
    company: null,
    loading: false
  })

  // Filtrar empresas por término de búsqueda
  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.nit.includes(searchTerm) ||
    company.address.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDeleteClick = (nit: string) => {
    const company = companies.find(c => c.nit === nit)
    if (company) {
      setDeleteModal({
        isOpen: true,
        company,
        loading: false
      })
    }
  }

  const handleConfirmDelete = async () => {
    if (!deleteModal.company) return

    setDeleteModal(prev => ({ ...prev, loading: true }))
    
    try {
      await onDelete(deleteModal.company.nit)
      setDeleteModal({
        isOpen: false,
        company: null,
        loading: false
      })
    } catch (error) {
      console.error('Error al eliminar empresa:', error)
      setDeleteModal(prev => ({ ...prev, loading: false }))
    }
  }

  const handleCloseModal = () => {
    if (!deleteModal.loading) {
      setDeleteModal({
        isOpen: false,
        company: null,
        loading: false
      })
    }
  }

  return (
    <div className="bg-neutral-white rounded-lg shadow-sm border border-neutral-gray/20 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Building2 className="w-6 h-6 text-primary-teal" />
          <h2 className="text-xl font-semibold text-neutral-black">
            Empresas Registradas
          </h2>
          <span className="text-sm text-neutral-gray bg-neutral-gray/10 px-2 py-1 rounded-full">
            {filteredCompanies.length}
          </span>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-gray" />
          <Input
            type="text"
            placeholder="Buscar por nombre, NIT o dirección..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Companies Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-neutral-gray">Cargando empresas...</div>
        </div>
      ) : filteredCompanies.length === 0 ? (
        <div className="text-center py-12">
          <Building2 className="w-12 h-12 text-neutral-gray/40 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-neutral-gray mb-2">
            {searchTerm ? 'No se encontraron empresas' : 'No hay empresas registradas'}
          </h3>
          <p className="text-neutral-gray/60">
            {searchTerm 
              ? 'Intenta con otros términos de búsqueda' 
              : 'Registra la primera empresa para comenzar'
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
            <CompanyCard
              key={company.nit}
              company={company}
              canEdit={canEdit}
              canDelete={canDelete}
              onEdit={onEdit}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title="Eliminar Empresa"
        message={`¿Estás seguro de que deseas eliminar la empresa "${deleteModal.company?.name}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        isLoading={deleteModal.loading}
        variant="danger"
      />
    </div>
  )
}

export default CompanyList 