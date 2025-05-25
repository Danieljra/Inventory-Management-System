import React from 'react'

interface LoginTemplateProps {
  children: React.ReactNode
}

const LoginTemplate: React.FC<LoginTemplateProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-neutral-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="bg-neutral-white rounded-2xl shadow-2xl border border-neutral-gray/10 p-8">
          {children}
        </div>
      </div>
    </div>
  )
}

export default LoginTemplate 