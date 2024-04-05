
import { personal, personalDelete, personalPost } from '../types/types'
import apiClient from '../apiClient'

export const useGetPersonal = async () => {
    try {
        const response = await apiPers.get<personal[]>('/personal')
        return response.data
    } catch (error) {
        console.log(error)
        return
    }
  return 
}

export const usePutPersonal = async () => {
    try {
        const response = await apiPers.put<personal[]>('/personal')
        return response.data
    } catch (error) {
        console.log(error)
        return
    }
  return 
}

export const usePostPersonal = async (personal:personalPost) => {
    try {
        const response = await apiPers.post<personal[]>('/personal',personal)
        return response.data
    } catch (error) {
        console.log(error)
        return
    }
  return 
}
export const useDeletePersonal = async (personal:personalDelete) => {
    try {
        const response = await apiPers.post<personal[]>('/personal',personal)
        return response.data
    } catch (error) {
        console.log(error)
        return
    }
  return 
  
}
export const useGetPersonalById = async (id:string) => {
    try {
        const response = await apiPers.get<personal[]>(`/personal/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
        return
    }
  return 
}
export const getPersonalDataById = async (id:string) => {
    try {
        const response = await apiPers.get<personal[]>(`/personal/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
        return
    }
  return 
}