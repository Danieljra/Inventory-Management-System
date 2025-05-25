import React, { useState, useEffect } from 'react'
import { InventoryByCompany, EmailData } from '../types/inventory'
import { inventoryService } from '../services/inventoryService'
import { generateInventoryPDF, downloadPDF } from '../utils/pdfGenerator'
import InventoryTable from '../components/organisms/InventoryTable/InventoryTable'
import EmailModal from '../components/molecules/EmailModal/EmailModal'
import Header from '../components/organisms/Header/Header'

const InventoryPage: React.FC = () => {
  const [inventoryData, setInventoryData] = useState<InventoryByCompany[]>([])
  const [selectedCompany, setSelectedCompany] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)
  const [emailLoading, setEmailLoading] = useState(false)
  const [pendingEmailCompany, setPendingEmailCompany] = useState<string | undefined>()

  useEffect(() => {
    loadInventoryData()
  }, [])

  const loadInventoryData = async () => {
    setIsLoading(true)
    try {
      const data = await inventoryService.getInventoryByCompany()
      setInventoryData(data)
    } catch (error) {
      console.error('Error loading inventory:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownloadPDF = (companyNit?: string) => {
    try {
      const doc = generateInventoryPDF(inventoryData, companyNit)
      const filename = companyNit 
        ? `inventario-${inventoryData.find(inv => inv.empresa.nit === companyNit)?.empresa.name || companyNit}.pdf`
        : 'inventario-completo.pdf'
      
      downloadPDF(doc, filename)
    } catch (error) {
      console.error('Error generating PDF:', error)
    }
  }

  const handleSendEmail = (companyNit?: string) => {
    setPendingEmailCompany(companyNit)
    setIsEmailModalOpen(true)
  }

  const handleEmailSubmit = async (emailData: EmailData) => {
    setEmailLoading(true)
    try {
      const success = await inventoryService.sendInventoryByEmail(emailData, pendingEmailCompany)
      
      if (success) {
        console.log('Email enviado correctamente')
        setIsEmailModalOpen(false)
      } else {
        console.error('Error enviando email')
      }
    } catch (error) {
      console.error('Error sending email:', error)
    } finally {
      setEmailLoading(false)
    }
  }

  const handleCloseEmailModal = () => {
    setIsEmailModalOpen(false)
    setPendingEmailCompany(undefined)
  }

  const getCompanyName = (companyNit?: string) => {
    if (!companyNit) return undefined
    return inventoryData.find(inv => inv.empresa.nit === companyNit)?.empresa.name
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Inventario de Productos
          </h1>
          <p className="text-gray-600">
            Gestiona y visualiza el inventario de productos por empresa
          </p>
        </div>

        <InventoryTable
          inventoryData={inventoryData}
          selectedCompany={selectedCompany}
          onCompanyChange={setSelectedCompany}
          onDownloadPDF={handleDownloadPDF}
          onSendEmail={handleSendEmail}
          isLoading={isLoading}
        />

        <EmailModal
          isOpen={isEmailModalOpen}
          onClose={handleCloseEmailModal}
          onSend={handleEmailSubmit}
          isLoading={emailLoading}
          companyName={getCompanyName(pendingEmailCompany)}
        />
      </main>
    </div>
  )
}

export default InventoryPage 