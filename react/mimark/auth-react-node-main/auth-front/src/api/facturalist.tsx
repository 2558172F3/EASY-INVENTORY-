import { FacturaVenta } from '../types/types'
import apiClient from '../apiClient'

export const useGetfactura = async () => {
    try {
        const response = await apiClient.get<FacturaVenta[]>('/factura')
        return response.data
    } catch (error) {
        console.log(error)
        return
    }
  return 
}

export const usePutFactura = async () => {
    try {
        const response = await apiClient.put<FacturaVenta[]>('/factura/:id')
        return response.data
    } catch (error) {
        console.log(error)
        return
    }
  return 
}