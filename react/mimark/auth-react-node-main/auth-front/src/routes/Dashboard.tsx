import { useEffect, useState } from "react";
import PortalLayout from "../layout/PortalLayout";
// import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/authConstants";
import { ModalFormEmploy } from "../components/modalFormEmploy";
import { ModalFormProducts } from "../components/modalFormProduct";
import { ModalFormEditProducts} from "../components/modalFormEditproduct";

interface producto {
  _id: string;
  producto: string;
  cantidad: number;
  price: number;
}


export default function Dashboard() {
  const auth = useAuth();
  

  const [productos, setProductos] = useState([]); 

  const ConsultarProductos= async () => {
    
    const response = await fetch(`${API_URL}/productos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json()).then((data) => {
      console.log(data);
      if (data.statuscode === 200) {
        setProductos(data.body.products);
      }
      else {
        alert(data.body.error);
      }
    });
  }

  const editProducto = async () => {
    ConsultarProductos();
  }


  useEffect(() => {
    ConsultarProductos();
  }, []);

 
  
  return (
    <>
    <PortalLayout>
      <ModalFormEmploy/>
      <ModalFormProducts/>
      
      
    
      <div className="dashboard">
        
      </div>
      
      
  <h1>{auth.getUser()?.name ?? ""}</h1>
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
                {productos.map((producto1:producto) => (
                  <>
                  <ModalFormEditProducts  producto={{
        
                    _id: producto1._id,
                    producto: producto1.producto,
                    cantidad: producto1.cantidad,
                    price: producto1.price,
                  }
                  
                } />
                  <tr key={producto1._id}>
                    <td>{producto1.producto}</td>
                    <td>{producto1.cantidad}</td>
                    <td>{producto1.price}</td>
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
