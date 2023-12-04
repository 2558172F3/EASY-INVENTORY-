import { useEffect, useState } from "react";
import PortalLayout from "../layout/PortalLayout";
// import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/authConstants";

export default function Dashboard() {
  const auth = useAuth();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [cc, setCc] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");

  const crearEmpleado = async () => {
    
    console.log(username,name, surname, cc, email, password, address, phone, password_confirmation);
    
    
    

  }
 
  // async function getTodos() {
  //   const accessToken = auth.getAccessToken();
  //   try {
  //     const response = await fetch(`${API_URL}/posts`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });

  //     if (response.ok) {
  //       const json = await response.json();
  //       setTodos(json);
  //       console.log(json);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // async function createTodo() {
  //   if (value.length > 3) {
  //     try {
  //       const response = await fetch(`${API_URL}/posts`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${auth.getAccessToken()}`,
  //         },
  //         body: JSON.stringify({ title: value }),
  //       });
  //       if (response.ok) {
  //         const todo = (await response.json()) as Todo;
  //         setTodos([...todos, todo]);
  //       }
  //     } catch (error) {}
  //   }
  // }

  useEffect(() => {
    crearEmpleado();
    handleSubmit;
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (password !== password_confirmation) {
      alert("Las contraseñas no coinciden");
      return;
    }
    const response = await fetch(`${API_URL}/employSignup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, name, surname, cc, email, phone , address}),
    }).then((res) => res.json()).then((data) => {
      console.log(data);
      if (data.statuscode === 200) {
        alert(data.body.message);
        
        
      }
      else {
        alert(data.body.error);
      }

    
    });
    
  }

  return (
    <>
    <PortalLayout>

    {/* modal formulario de registro de empleado en bootstrap */}
    <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Registrar un empleado</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="recipient-name" className="col-form-label">Usuario:</label>
                <input type="text" className="form-control" id="recipient-name" onChange={(e) => setUsername(e.target.value)}/>
              </div>
              <div className="mb-3">
                <label htmlFor="recipient-name" className="col-form-label"  >Nombre:</label>
                <input type="text" className="form-control" id="recipient-name" onChange={(e) => setName(e.target.value)}/>
              </div>
              <div className="mb-3">
                <label htmlFor="recipient-name" className="col-form-label">Apellido:</label>
                <input type="text" className="form-control" id="recipient-name" onChange={(e) => setSurname(e.target.value)}/>
              </div>
              <div className="mb-3">
                <label htmlFor="recipient-name" className="col-form-label">Cédula:</label>
                <input type="text" className="form-control" id="recipient-name" onChange={(e) => setCc(e.target.value)}/>
              </div>
              <div className="mb-3">
                <label htmlFor="recipient-name" className="col-form-label">Dirección:</label>
                <input type="text" className="form-control" id="recipient-name" onChange={(e) => setAddress(e.target.value)}/>
              </div>
              <div className="mb-3">
                <label htmlFor="recipient-name" className="col-form-label">Teléfono:</label>
                <input type="text" className="form-control" id="recipient-name" onChange={(e) => setPhone(e.target.value)}/>
              </div>
              <div className="mb-3">
                <label htmlFor="recipient-name" className="col-form-label">Correo:</label>
                <input type="text" className="form-control" id="recipient-name" onChange={(e) => setEmail(e.target.value)}/>
              </div>
              <div className="mb-3">
                <label htmlFor="recipient-name" className="col-form-label">Contraseña:</label>
                <input type="password" className="form-control" id="recipient-name" onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <div className="mb-3">
                <label htmlFor="recipient-name" className="col-form-label">Confirmar contraseña:</label>
                <input type="password" className="form-control" id="recipient" name="recipient" onChange={(e) => setPassword_confirmation(e.target.value)}/>
              </div>
              <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" id="save">Guardar</button>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id="close">Cerrar</button>
            
          </div>
        </div>
      </div>
    </div>


    
    {/* end modal */}
      <div className="dashboard">
        
      </div>
      
      
  <h1>{auth.getUser()?.name ?? ""}</h1>
  <div className="container">
    <div className="row">
      <div className="col-md-6">
        <div className="card">
          <h2 className="card-header">InhtmlFormación de Ventas</h2>
          <div className="card-body">
            <p>Estadísticas de ventas del mes actual.</p>
            <canvas id="sales-chart" width="100%" height="100px"></canvas>
            
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="card">
          <h2 className="card-header">Inventario</h2>
          <div className="card-body">
            <p>InhtmlFormación sobre el inventario de productos.</p>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Leche</td>
                  <td>100</td>
                  <td>$5.000</td>
                </tr>
                <tr>
                  <td>Pan</td>
                  <td>200</td>
                  <td>$2.000</td>
                </tr>
                <tr>
                  <td>Arroz</td>
                  <td>300</td>
                  <td>$3.000</td>
                </tr>
                <tr>
                  <td>Frutas</td>
                  <td>400</td>
                  <td>$4.000</td>
                </tr>
                <tr>
                  <td>Verduras</td>
                  <td>500</td>
                  <td>$5.000</td>
                </tr>
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
