import { Download, Mail, Building2, Package } from 'lucide-react'
import { InventoryByCompany } from '../../../types/inventory'
import Button from '../../atoms/Button'

interface InventoryTableProps {
  inventoryData: InventoryByCompany[]
  selectedCompany: string
  onCompanyChange: (companyNit: string) => void
  onDownloadPDF: (companyNit?: string) => void
  onSendEmail: (companyNit?: string) => void
  isLoading?: boolean
}

const InventoryTable: React.FC<InventoryTableProps> = ({
  inventoryData,
  selectedCompany,
  onCompanyChange,
  onDownloadPDF,
  onSendEmail,
  isLoading = false
}) => {
  const filteredData = selectedCompany === 'all' 
    ? inventoryData 
    : inventoryData.filter(inv => inv.empresa.nit === selectedCompany)

  const totalProducts = filteredData.reduce((sum, inv) => sum + inv.totalProductos, 0)

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            <div className="h-4 bg-gray-300 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Header con filtros y acciones */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Package className="w-6 h-6 text-[#009689]" />
              Inventario de Productos
            </h2>
            <p className="text-gray-600 mt-1">
              Total: {totalProducts} productos
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Filtro por empresa */}
            <select
              value={selectedCompany}
              onChange={(e) => onCompanyChange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009689] bg-white"
            >
              <option value="all">Todas las empresas</option>
              {inventoryData.map((inventory) => (
                <option  key={inventory.empresa.nit} value={inventory.empresa.nit}>
                  {inventory.empresa.name}
                </option>
              ))}
            </select>

            {/* Botones de acción */}
            <div className="flex gap-2">
              <Button
                onClick={() => onDownloadPDF(selectedCompany === 'all' ? undefined : selectedCompany)}
                variant="secondary"
                size="sm"
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                PDF
              </Button>
              
              <Button
                onClick={() => onSendEmail(selectedCompany === 'all' ? undefined : selectedCompany)}
                variant="primary"
                size="sm"
                className="flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Enviar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido */}
      {filteredData.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No hay productos en el inventario</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {filteredData.map((inventory) => (
            <div key={inventory.empresa.nit} className="p-6">
              {/* Información de la empresa */}
              <div className="flex items-start gap-3 mb-4">
                <Building2 className="w-5 h-5 text-[#009689] mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {inventory.empresa.name}
                  </h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>NIT: {inventory.empresa.nit}</p>
                    <p>Dirección: {inventory.empresa.address}</p>
                    <p>Teléfono: {inventory.empresa.phone}</p>
                  </div>
                </div>
              </div>

              {/* Tabla de productos */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Código
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Producto
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Características
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Precio
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {inventory.productos.map((product) => (
                      <tr key={product.codigo} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">
                          {product.codigo}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {product.nombre}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {product.caracteristicas}
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-[#009689]">
                          {product.precio.toLocaleString()} {product.moneda}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-3 text-sm text-gray-600">
                Total productos: {inventory.totalProductos}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default InventoryTable 