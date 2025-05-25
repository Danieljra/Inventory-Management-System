import React, { useState, useEffect } from 'react'

interface DateDisplayProps {
  showTime?: boolean
  compact?: boolean
  className?: string
}

const DateDisplay: React.FC<DateDisplayProps> = ({ 
  showTime = true,
  compact = false,
  className = '' 
}) => {
  const [currentDate, setCurrentDate] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date())
    }, 1000 * 60) // Actualizar cada minuto

    return () => clearInterval(timer)
  }, [])

  const formatDate = (date: Date) => {
    if (compact) {
      return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short'
      })
    }
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (compact) {
    return (
      <div className={`text-xs ${className}`}>
        <div className="text-neutral-black font-medium">
          {formatDate(currentDate)}
        </div>
        {showTime && (
          <div className="text-neutral-gray">
            {formatTime(currentDate)}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={`text-sm ${className}`}>
      <div className="text-neutral-black font-medium">
        {formatDate(currentDate)}
      </div>
      {showTime && (
        <div className="text-neutral-gray">
          {formatTime(currentDate)}
        </div>
      )}
    </div>
  )
}

export default DateDisplay 