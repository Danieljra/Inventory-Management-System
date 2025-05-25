import React from 'react'
import { Building2, MapPin, Phone, Edit, Trash2, Calendar } from 'lucide-react'
import { Company } from '../../../types/company'
import Button from '../../atoms/Button'

interface CompanyCardProps {
  company: Company
  canEdit: boolean
  canDelete: boolean
  onEdit: (company: Company) => void
  onDelete: (nit: string) => void
}

const CompanyCard: React.FC<CompanyCardProps> = ({
  company,
  canEdit,
  canDelete,
  onEdit,
  onDelete
}) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="bg-neutral-white rounded-lg shadow-sm border border-neutral-gray/20 p-6 hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-12 h-12 bg-primary-teal/10 rounded-lg">
            <Building2 className="w-6 h-6 text-primary-teal" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-neutral-black">
              {company.name}
            </h3>
            <p className="text-sm text-neutral-gray">
              NIT: {company.nit}
            </p>
          </div>
        </div>

        {/* Actions */}
        {(canEdit || canDelete) && (
          <div className="flex space-x-2">
            {canEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(company)}
                className="text-primary-blue hover:text-primary-blue/80 hover:bg-primary-blue/10"
              >
                <Edit className="w-4 h-4" />
              </Button>
            )}
            {canDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(company.nit)}
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Company Info */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-sm text-neutral-gray">
          <MapPin className="w-4 h-4 text-neutral-gray/60" />
          <span>{company.address}</span>
        </div>

        <div className="flex items-center space-x-2 text-sm text-neutral-gray">
          <Phone className="w-4 h-4 text-neutral-gray/60" />
          <span>{company.phone}</span>
        </div>

        <div className="flex items-center space-x-2 text-sm text-neutral-gray">
          <Calendar className="w-4 h-4 text-neutral-gray/60" />
          <span>Registrada: {formatDate(company.createdAt)}</span>
        </div>

        {company.updatedAt.getTime() !== company.createdAt.getTime() && (
          <div className="flex items-center space-x-2 text-sm text-neutral-gray">
            <Calendar className="w-4 h-4 text-neutral-gray/60" />
            <span>Actualizada: {formatDate(company.updatedAt)}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default CompanyCard 