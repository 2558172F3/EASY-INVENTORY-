import { Proveedor } from '../types/types'
import apiClient from '../apiClient'

export const useGetProveedor = async () => {
    try {
        const response = await apiClient.get<Proveedor[]>('/proveedor/')
        return response.data
    } catch (error) {
        console.log(error)
        return
    }
  return 
}



export const usePostProveedor = async (proveedor: Proveedor) => {
    try {
      const response = await apiClient.post<Proveedor[]>('/proveedor', proveedor);
      return response.data;
    } catch (error) {
      console.error('Error al crear proveedor:', error);
      throw error; // Lanzar el error para un manejo más explícito
    }
    
  };
  
// export const useproveedorById = async (id:string) => {
//     try {
//         const response = await apiClient.get<Proveedor[]>(`/proveedor/${id}`)
//         return response.data
//     } catch (error) {
//         console.log(error)
//         return
//     }
//   return 
// }

export const useDeleteProveedor = async (id: number ) => {
    try {
      await apiClient.delete(`/proveedor/${id}`);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  

export const useUpdateProveedor = async (id: number, newData: Partial<Proveedor>) => {
    try {
      const response = await apiClient.put(`/proveedor/${id}`, newData); // Realiza una solicitud PUT al endpoint /proveedor/{id} con los nuevos datos
      return response.data; // Devuelve los datos actualizados del proveedor
    } catch (error) {
      console.log(error); // Registra cualquier error en la consola
      return null; // Retorna null en caso de error
      throw error;
    }
  };

