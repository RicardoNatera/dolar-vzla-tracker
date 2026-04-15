'use client'

import { useEffect, useState } from 'react'
import { fetchDolarData, getMainRates } from '@/lib/api'
import { CurrencyCard } from '@/components/ui/CurrencyCard'
import { RefreshCw, AlertCircle } from 'lucide-react'

export default function CotizacionPage() {
  const [data, setData] = useState<any[]>([])
  const [rates, setRates] = useState<{ bcv: any | null, paralelo: any | null }>({ bcv: null, paralelo: null })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetchDolarData()
      setData(response)
      const mainRates = getMainRates(response)
      setRates(mainRates)
    } catch (err) {
      setError('Error cargando datos. Revisa tu conexión.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
    // Refresh cada 5 minutos
    const interval = setInterval(loadData, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-12 w-12 animate-spin mx-auto mb-4 text-indigo-600" />
          <p className="text-xl font-medium text-gray-600">Cargando cotizaciones...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-4">
            💱 Cotización Hoy
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tasas oficiales y paralelas del dólar en Venezuela
          </p>
          <button
            onClick={loadData}
            disabled={loading}
            className="mt-6 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2 mx-auto transition-all disabled:opacity-50"
          >
            <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Actualizando...' : 'Actualizar Ahora'}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8 max-w-2xl mx-auto">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-6 w-6 text-red-500" />
              <div>
                <p className="text-red-800 font-medium">{error}</p>
                <button onClick={loadData} className="text-red-600 hover:underline text-sm mt-1">
                  Reintentar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Cards Principales */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <CurrencyCard item={rates.bcv} title="BCV Oficial" />
          <CurrencyCard item={rates.paralelo} title="Mercado Paralelo" />
        </div>
        
      </div>
    </div>
  )
}