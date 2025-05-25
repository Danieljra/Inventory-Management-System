import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { InventoryByCompany } from '../types/inventory'

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF
  }
}

export const generateInventoryPDF = (
  inventoryData: InventoryByCompany[],
  selectedCompany?: string
): jsPDF => {
  const doc = new jsPDF()

  // Configurar fuente
  doc.setFont('helvetica')

  // Título
  doc.setFontSize(20)
  doc.setTextColor(0, 150, 137) // Color #009689
  doc.text('Reporte de Inventario', 20, 25)

  // Fecha
  doc.setFontSize(10)
  doc.setTextColor(97, 115, 141) // Color #61738D
  doc.text(`Generado el: ${new Date().toLocaleDateString('es-ES')}`, 20, 35)

  let yPosition = 50

  const filteredData = selectedCompany 
    ? inventoryData.filter(inv => inv.empresa.nit === selectedCompany)
    : inventoryData

  filteredData.forEach((inventory, index) => {
    // Información de la empresa
    doc.setFontSize(14)
    doc.setTextColor(0, 0, 0)
    doc.text(`${inventory.empresa.name}`, 20, yPosition)
    
    doc.setFontSize(10)
    doc.setTextColor(97, 115, 141)
    doc.text(`NIT: ${inventory.empresa.nit}`, 20, yPosition + 8)
    doc.text(`Dirección: ${inventory.empresa.address}`, 20, yPosition + 16)
    doc.text(`Teléfono: ${inventory.empresa.phone}`, 20, yPosition + 24)

    // Tabla de productos
    const tableData = inventory.productos.map(product => [
      product.codigo,
      product.nombre,
      product.caracteristicas,
      `${product.precio.toLocaleString()} ${product.moneda}`
    ])

    autoTable(doc, {
      startY: yPosition + 35,
      head: [['Código', 'Producto', 'Características', 'Precio']],
      body: tableData,
      theme: 'grid',
      headStyles: {
        fillColor: [0, 150, 137], // Color #009689
        textColor: [255, 255, 255],
        fontSize: 10
      },
      bodyStyles: {
        fontSize: 9,
        textColor: [0, 0, 0]
      },
      alternateRowStyles: {
        fillColor: [248, 249, 250]
      },
      margin: { left: 20, right: 20 }
    })

    // Obtener la posición Y final de la tabla
    yPosition = (doc as any).lastAutoTable.finalY + 20

    // Nueva página si hay más empresas
    if (index < filteredData.length - 1 && yPosition > 250) {
      doc.addPage()
      yPosition = 30
    }
  })

  return doc
}

export const downloadPDF = (doc: jsPDF, filename: string = 'inventario.pdf') => {
  doc.save(filename)
} 