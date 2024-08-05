// import  { useState, useEffect } from 'react';
import { useQuery } from  '@tanstack/react-query';
import { useGetPersonal } from "../api/pers";
// import { personal } from '../types/types';
import PortalLayout from '../layout/PortalLayout';


// interface Purchase {
//   id_personal: number;
//   amount: number;
// }



const CustomerPage = () => {

  const { data:personal,  } = useQuery({
    queryKey: ['personal'],
    queryFn: useGetPersonal,
    staleTime: 1000*60*30,refetchOnWindowFocus: false,refetchInterval: 1000*60*30,
  });

 
    
  // let total =0
  if (!personal) {
    return <div>Cargando...</div>
  }
  return (
    <PortalLayout>
        <div className="container">
        <table className="table table-striped">
            <thead>
            <tr>
                
                <th>Rol </th>
                <th>Nombre </th>
                <th>Apellidos</th>
                <th>Telefono</th>
                <th>Correo</th>
                


            </tr>
            </thead>
            <tbody>
            {personal.map((personal) => (
              <tr key={personal.correo}>
                
                <td>{personal.rol}</td>
                <td>{personal.nombre}</td>
                <td>{personal.apellidos}</td>
                <td>{personal.telefono}</td>
                <td>{personal.correo}</td>
              </tr>
                
            ))}
            </tbody>
        </table>
        </div>
    </PortalLayout>
  );
};

export default CustomerPage;
