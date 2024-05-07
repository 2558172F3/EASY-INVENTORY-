import { useQuery } from '@tanstack/react-query';
import { useGetfactura, } from '../api/facturalist.tsx';
import PortalLayout from '../layout/PortalLayout';


const CustomerPage = () => {
  const { data: factura,  } = useQuery({
    queryKey: ['factura'],
    queryFn: useGetfactura,
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 60 * 30,
  });
    
  if (!factura) {
    return <div>Cargando...</div>;
  }
  
  console.log(factura);
  
  return (
    <PortalLayout>
      <div className="container">
        
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID_Factura</th>
              <th>Vendedor</th>
              <th>apellidos</th>
              <th>Cliente</th>
              <th>fecha_compra</th>
              <th>ciudad</th>
              <th>telefono</th>
              <th>correo</th>
              <th>productos</th>
                                          
            </tr>
          </thead>
          <tbody>
            {factura.map((fact) => (
              <tr key={fact.ID_Factura}>
                <td>{fact.ID_Factura}</td>
                             
                <td>{fact.vendedor}</td>
                <td>{fact.apellidos}</td>
                <td>{fact.cliente}</td>
                <td>{fact.fecha_compra ? new Date(fact.fecha_compra).toLocaleDateString() : ''}</td>
                <td>{fact.ciudad}</td>
                <td>{fact.telefono}</td>
                <td>{fact.correo}</td>
                {       
              <td>
              {fact.productos.map((product, index) => (
                <div key={index}>
                  <span> - ID: {product.id_producto}</span>
                  <span>{product.Nombre}</span>
                  <span> - Precio: {product.Precio}</span>
                  
                  {index < fact.productos.length - 1 && ", "}
                </div>
              ))}
            </td>
            
             
                
                
                /* <td>{
                  
                    fact.productos.map((product:Producto) =>(<td>product.nombre</td>))
                  
                  }</td> */}
          
                                             
                <td>
                </td>
                <td>
                            
                </td>
              </tr>
              
            ))}
          </tbody>
          
        </table>
      </div>
    </PortalLayout>
  );
};

export default CustomerPage;

