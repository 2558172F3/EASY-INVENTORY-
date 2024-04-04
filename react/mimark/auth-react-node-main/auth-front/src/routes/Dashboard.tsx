
import { useQuery } from  '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useGetProducts,useDisminucion, useAumento } from "../api/products";
import PortalLayout from "../layout/PortalLayout";
// import { Link } from "react-router-dom";
// import { API_URL } from "../auth/authConstants";
import { ModalFormEmploy } from "../components/modalFormEmploy";
import { ModalFormProducts } from "../components/modalFormProduct";
import { ModalFormEditProducts} from "../components/modalFormEditproduct";
import { Productos } from "../types/types";


export default function Dashboard() {
  // const auth = useAuth();
  // const [, setProductos] = useState<Productos[]>([]);
  const [filtroCategoria, setFiltroCategoria] = useState<string | null>(null);
  const [ordenCantidad, setOrdenCantidad] = useState<'asc' | 'desc' | null>(null);
  const { data:productos, isLoading, isError, error ,refetch} = useQuery({
    queryKey: ['productos'],
    queryFn: useGetProducts,
  });
  
  if (!productos) {
    
    return <div>Loading...</div>
  }
  let productosFiltrados = productos;

  // Filtrar por categoría
  // if (filtroCategoria) {
  //   productosFiltrados = productosFiltrados.filter(producto => producto.ID_Categoria === filtroCategoria);
  // }

  // Ordenar por cantidad
  if (ordenCantidad) {
    productosFiltrados.sort((a, b) => ordenCantidad === 'asc' ? a.Cantidad - b.Cantidad : b.Cantidad - a.Cantidad);
  }

  const disminuir = async (id:number)=>{
    let producto = productos.find(producto => producto.ID_Producto === id);
    if (producto) {
      if (producto.Cantidad===0) {
        alert("Ya no hay stock para este producto")
        return
      }
      
    }
    const response = await useDisminucion(id)
    if (response===200) {
      refetch()
    }
    console.log("error",response);
  }

  const aumentar = async (id:number)=>{
    const response = await useAumento(id)
    if (response===200) {
      refetch()
    }
    console.log("error",response);
  }
  return (
    <>
    <PortalLayout>
      <ModalFormEmploy/>
      <ModalFormProducts refetch={refetch} />
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
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Editar</th>
                  <th>Aumentar/Disminuir cantidad</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto1:Productos) => (
                  <>
                  <ModalFormEditProducts  producto={{
                    _id: producto1.ID_Producto.toString(),
                    ID_categoria:producto1.ID_Categoria,
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
                    <td>{producto1.Precio}</td>
                    <td><button className="btn btn-warning"  data-bs-toggle="modal" data-bs-target={`#product-edit-${producto1.ID_Producto}`} id="shown.bs.modal" >editar</button></td>
                    <td>
                    <button  className="btn btn-danger" onClick={()=>disminuir(producto1.ID_Producto)}> {producto1.Cantidad===0 ? "no hay stock" : "-"} </button>
                    <button  className="btn btn-success" onClick={()=>aumentar(producto1.ID_Producto)}> + </button>
                    </td>
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
