
import apiClient from '../apiClient'
import { Productos } from '../types/types'

interface product {
    
    producto:{
        _id: string;
        ID_categoria:number;
        Nombre: string;
        Cantidad: number;
        Precio: number;
    }
  
}

export const useGetProducts = async () => {
    try {
        const response = await apiClient.get<Productos[]>('/productos')
        return response.data
    } catch (error) {
        console.log(error)
        return
    }
  return 
}

export const useCreateProduct = async (producto:product) => {
    try {
        const response = await apiClient.post<Productos>('/productos',producto)
        return response.status
    } catch (error) {
        console.log(error)
        return
    }
  return 
}

export const useEditProduct = async (id:string,producto:product) => {
    try {
        const response = await apiClient.put(`/productos/editproduct/${id}`,producto)
        return response.status
    } catch (error) {
        console.log(error)
        return error
    }
  return 
}


export const useDeleteProduct = async (id:number) => {
    try {
        const response = await apiClient.put(`/productos/delet/${id}`)
        return response.status
    } catch (error) {
        console.log(error)
        return error
    }
  return 
}

export const useDisminucion = async (id:number) => {
    try {
        const response = await apiClient.put(`/productos/disminuir/${id}`)
        return response.status
    } catch (error) {
        console.log(error)
        return error
    }
  return 
}

export const useAumento = async (id:number) => {
    try {
        const response = await apiClient.put(`/productos/aumentar/${id}`)
        return response.status
    } catch (error) {
        console.log(error)
        return error
    }
  return 
}





