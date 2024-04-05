import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useGetProveedorList } from '../api/proveedorlist';
import { ProveedorList } from '../types/types';
import PortalLayout from '../layout/PortalLayout';

interface Purchase {
  id: number;
  amount: number;
}

const CustomerPage = () => {
  const { data: proveedor } = useQuery({
    queryKey: ['proveedor'],
    queryFn: useGetProveedorList,
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 60 * 30,
  });

  let total = 0;
  if (!proveedor) {
    return <div>Cargando...</div>;
  }

  return (
    <PortalLayout>
      <div className="container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Ciudad</th>
            </tr>
          </thead>
          <tbody>
            {proveedor.map((proveedor) => (
              <tr key={proveedor.nombre}>
                <td>{proveedor.nombre}</td>
                <td>{proveedor.direccion}</td>
                <td>{proveedor.telefono}</td>
                <td>{proveedor.ciudad}</td>
              </tr>
           
            ))}
          </tbody>
        </table>
      </div>
    </PortalLayout>
  );
};

export default CustomerPage;








