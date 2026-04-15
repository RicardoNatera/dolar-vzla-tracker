'use client'

import { DollarSign } from 'lucide-react'
import type { DolarItem } from '@/lib/api'

interface Props {
  item: DolarItem | null
  title: string
}

export function CurrencyCard({ item, title }: Props) {
  if (!item) return null

  const value = item.promedio || item.venta || 0

  return (
    <div className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
      <div className="pb-4">
        <h3 className="flex items-center gap-2 text-2xl font-bold text-emerald-600 mb-1">
          <DollarSign className="h-8 w-8" />
          {value} Bs.
        </h3>
        <p className="text-lg font-semibold text-gray-700">{title}</p>
        <p className="text-sm text-gray-500 truncate">{item.nombre}</p>
      </div>
      <p className="text-xs text-gray-400 mt-3">
        {new Date(item.fechaActualizacion).toString()}
      </p>
    </div>
  )
}