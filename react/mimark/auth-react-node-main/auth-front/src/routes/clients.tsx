
import { useQuery } from  '@tanstack/react-query';
import { useGetClientes } from "../api/client";
import PortalLayout from '../layout/PortalLayout';



const CustomerPage = () => {

  const { data:clientes,  } = useQuery({
    queryKey: ['clintes'],
    queryFn: useGetClientes,
    staleTime: 1000*60*30,refetchOnWindowFocus: false,refetchInterval: 1000*60*30,
  });

 
  if (!clientes) {
    return <div>cargando...</div>
  }
  return (
    <PortalLayout>
        <div className="container">
        <table className="table table-striped">
            <thead>
            <tr>
                <th>Nombre del Cliente</th>
                <th>Total de Compras $</th>

            </tr>
            </thead>
            <tbody>
            {clientes.map((customer) => (
                <tr key={customer.correo}>
                <td>{customer.nombre}</td>
                <td>{customer.total_factura}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    </PortalLayout>
  );
};

export default CustomerPage;
