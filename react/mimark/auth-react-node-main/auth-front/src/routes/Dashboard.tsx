
import { useQuery } from  '@tanstack/react-query';
import { useState } from 'react';
import { useGetProducts } from "../api/products";
import PortalLayout from "../layout/PortalLayout";
// import { Link } from "react-router-dom";
// import { API_URL } from "../auth/authConstants";
import { ModalFormEmploy } from "../components/modalFormEmploy";
import { ModalFormEditProducts} from "../components/modalFormEditproduct";
import { Productos } from "../types/types";
import { useProducts } from '../hoocks/infoPage';


export default function Dashboard() {

  const [ordenCantidad, setOrdenCantidad] = useState<'asc' | 'desc' | null>(null);
  const {productos,refetch,error,isLoading} = useProducts();
  
  if (!productos) {
    
    return <div>Loading...</div>

    
  
  }
  const filtroCategoriaFn = () => {
    const filter= productos.sort((a, b) => {
      if (a.Nombre_Categoria < b.Nombre_Categoria) {
          return -1;
      }
      if (a.Nombre_Categoria > b.Nombre_Categoria) {
          return 1;
      }
      return 0;
  });
    console.log(filter);
  }

  const filtroCantidadFn = (cantidad:'asc' | 'desc' | null ) => {
    setOrdenCantidad(cantidad);
    if (cantidad === 'asc') {
      const filter= productos.sort((a, b) => a.Cantidad - b.Cantidad);
      console.log(filter);
    } else {
      const filter= productos.sort((a, b) => b.Cantidad - a.Cantidad);
      console.log(filter);

  }
  }

  const filtroPrecioFn = (precio:'asc' | 'desc' | null ) => {
    setOrdenCantidad(precio);
    if (precio === 'asc') {
      const filter= productos.sort((a, b) => a.Precio - b.Precio);
      console.log(filter);
    } else {
      const filter= productos.sort((a, b) => b.Precio - a.Precio);
      console.log(filter);

  }
  }

  return (
    <>
    <PortalLayout>
      <ModalFormEmploy/>
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
            <table className="table table-striped" >
              <thead>
                <tr>
                  <th>Producto</th>
                  <th 
                  onClick={ordenCantidad === 'asc' ? () => filtroCantidadFn('desc') : () => filtroCantidadFn('asc')}
                  style={{ cursor: 'pointer' }}
                  >
                    Cantidad
                    {ordenCantidad === 'asc' ? <span>&#8595;</span>: <span>&#8593;</span> }
                  </th>

                  <th
                  onClick={ordenCantidad === 'asc' ? () => filtroPrecioFn('desc') : () => filtroPrecioFn('asc')}
                  style={{ cursor: 'pointer' }}
                  >
                    Precio
                    {ordenCantidad === 'asc' ? <span>&#8595;</span>: <span>&#8593;</span> }
                  </th>
                  <th onClick={() => filtroCategoriaFn()}
                  style={{ cursor: 'pointer' }}
                  >Categoría</th>
                  <th>Editar</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto1:Productos) => (
                  <>
                  <ModalFormEditProducts  producto={{
                    _id: producto1.ID_Producto.toString(),
                    ID_categoria:producto1.ID_categoria,
                    Nombre: producto1.Nombre,
                    Cantidad: producto1.Cantidad,
                    Precio: producto1.Precio,
                  }
                } 
                refetch={refetch}
                
                />
                  <tr key={ producto1.ID_Producto.toString()}>
                    <td>{producto1.Nombre}</td>
                    <td>{producto1.Cantidad}</td>
                    <td>$ {producto1.Precio}</td>
                    <td>{producto1.Nombre_Categoria}</td>
                    <td><button className="btn btn-warning"  data-bs-toggle="modal" data-bs-target={`#product-edit-${producto1.ID_Producto}`} id="shown.bs.modal" >editar</button></td>
                    <td><button className="btn btn-danger"  data-bs-toggle="modal" data-bs-target={`#product-delet-${producto1.ID_Producto}`} id="shown.bs.modal" >eliminar</button></td>
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
          <p>Derechos de autor &copy; 2024 Minimarck</p>
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
