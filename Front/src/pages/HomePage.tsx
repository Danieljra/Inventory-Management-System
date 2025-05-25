import React from 'react'
import Header from '../components/organisms/Header/Header'


const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-neutral-black mb-4">
            Dashboard Principal
          </h1>
          <p className="text-neutral-gray mb-8">
            Bienvenido al sistema de gestión
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-neutral-white rounded-lg shadow-sm border border-neutral-gray/20 p-6">
              <h3 className="text-xl font-semibold text-neutral-black mb-2">Empresas</h3>
              <p className="text-neutral-gray">Gestiona las empresas del sistema</p>
            </div>
            <div className="bg-neutral-white rounded-lg shadow-sm border border-neutral-gray/20 p-6">
              <h3 className="text-xl font-semibold text-neutral-black mb-2">Productos</h3>
              <p className="text-neutral-gray">Administra el catálogo de productos</p>
            </div>
            <div className="bg-neutral-white rounded-lg shadow-sm border border-neutral-gray/20 p-6">
              <h3 className="text-xl font-semibold text-neutral-black mb-2">Inventario</h3>
              <p className="text-neutral-gray">Controla el stock y movimientos</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default HomePage 