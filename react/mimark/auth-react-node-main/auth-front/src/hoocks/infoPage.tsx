
import { useQuery } from  '@tanstack/react-query';
import { useGetProducts } from "../api/products";
import {useGetClientes_1} from "../api/client";
import { useGetProveedor, useDeleteProveedor, usePostProveedor, useUpdateProveedor } from '../api/proveedorlist.tsx';


export const useProducts = ()=>{
    const { data:productos,refetch,error,isLoading} = useQuery({
      queryKey: ['productos'],
        queryFn: useGetProducts,
        staleTime: 1000 * 60 * 30,
        refetchOnWindowFocus: false,
        refetchInterval: 1000 * 60 * 30,
        });
        return  {productos,refetch,error,isLoading}
        }

export const useClientes = ()=>{
  const { data:clientes,refetch,error,isLoading} = useQuery({
    queryKey: ['clientes'],
      queryFn: useGetClientes_1,
      staleTime: 1000 * 60 * 30,
      refetchOnWindowFocus: false,
      refetchInterval: 1000 * 60 * 30,
      });
      return  {clientes,refetch,error,isLoading}
      }


export const useProveedor = ()=>{
  const { data:proveedor,refetch,error,isLoading} = useQuery({
    queryKey: ['proveedor'],
      queryFn: useGetProveedor,
      staleTime: 1000 * 60 * 30,
      refetchOnWindowFocus: false,
      refetchInterval: 1000 * 60 * 30,
      });
      return  {proveedor,refetch,error,isLoading}
      }
    