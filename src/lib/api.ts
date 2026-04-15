export interface DolarItem {
  fuente: string
  nombre: string
  compra: number
  venta: number
  promedio: number
  fechaActualizacion: string
}

export type DolarResponse = DolarItem[]

export async function fetchDolarData(): Promise<DolarResponse> {
  const res = await fetch('https://ve.dolarapi.com/v1/dolares')
  if (!res.ok) throw new Error('Error fetching dolar data')
  return res.json()
}

export function getMainRates(data: DolarResponse) {
  const bcv = data.find(item => item.fuente.toLowerCase().includes('oficial'))
  const paralelo = data.find(item => 
    item.fuente.toLowerCase().includes('paralelo') 
  )
  
  return { bcv, paralelo }
}