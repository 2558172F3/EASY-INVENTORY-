
import apiClient from '../apiClient'
import { toast } from 'react-toastify';

interface Producto {
    id: number;
    cantidad: number;
}

interface FacturaData {
    cliente: number;
    productos: Producto[];
    fecha: string;
    hora: string;
    vendedor: string;
}


export const usePostfactura = async (factura : FacturaData) => {
    try {
        const response = await apiClient.post('/facturaVenta', factura)
        return response.status
    }catch (error) {
    console.log(error)
    return error
}
return 
}