import { useEffect, useState } from "react";
import { useQuery } from  '@tanstack/react-query';
import { useGetProducts } from "../api/products";
import PortalLayout from "../layout/PortalLayout";
// import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
// import { API_URL } from "../auth/authConstants";
import { ModalFormEmploy } from "../components/modalFormEmploy";
import { ModalFormProducts } from "../components/modalFormProduct";
import { ModalFormEditProducts} from "../components/modalFormEditproduct";
import { Productos } from "../types/types";

interface producto {
  _id: string;
  producto: string;
  cantidad: number;
  price: number;
}


export default function Dashboard() {
  // const auth = useAuth();
  const { data:productos, isLoading, isError, error } = useQuery({
    queryKey: ['productos'],
    queryFn: useGetProducts,
    staleTime: 1000*60*30,refetchOnWindowFocus: false,refetchInterval: 1000*60*30,
  });

  // const [productos, setProductos] = useState([]); 

  const ConsultarProductos= async () => {
    
    // const response = await fetch(`${API_URL}/productos`, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // }).then((res) => res.json()).then((data) => {
    //   console.log(data);
    //   if (data.statuscode === 200) {
    //     setProductos(data.body.products);
    //   }
    //   else {
    //     alert(data.body.error);
    //   }
    // });
  }

  const editProducto = async () => {
    ConsultarProductos();
  }


  useEffect(() => {
    ConsultarProductos();
  }, []);
  if (!productos) {
    return <div>Loading...</div>
  }
 
  
  return (
    <>
    <PortalLayout>
      <ModalFormEmploy/>
      <ModalFormProducts/>
      
      
    
      <div className="dashboard">
        
      </div>
      
      
  {/* <h1>{auth.getUser()?.name ?? ""}</h1> */}
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <h2 className="card-header">Inventario</h2>
          <div className="card-body">
            <p>Información sobre el inventario de productos.</p>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto1:Productos) => (
                  <>
                  <ModalFormEditProducts  producto={{
        
                    _id: producto1.ID_Producto.toString(),
                    producto: producto1.Nombre,
                    cantidad: producto1.Cantidad,
                    price: producto1.Precio,
                  }
                  
                } />
                  <tr key={ producto1.ID_Producto.toString()}>
                    <td>{producto1.Nombre}</td>
                    <td>{producto1.Cantidad}</td>
                    <td>{producto1.Precio}</td>
                    <td><button className="btn btn-warning"  data-bs-toggle="modal" data-bs-target="#product-edit" id="shown.bs.modal" onClick={() => editProducto()}>editar</button></td>
                    <td><button  className="btn btn-danger">eliminar</button></td>
                  </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

  <footer className="bg-dark text-white footer">
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <p>Derechos de autor &copy; 2023 Minimercado</p>
        </div>
        <div className="col-md-6">
          <ul className="list-inline text-end">
            <li className="list-inline-item"><a href="#">Política de Privacidad</a></li>
            <li className="list-inline-item"><a href="#">Términos y Condiciones</a></li>
            <li className="list-inline-item"><a href="#">Contáctenos</a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
      </PortalLayout>
  </>

  );
}
