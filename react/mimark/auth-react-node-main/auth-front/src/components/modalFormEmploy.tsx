import React, { useState ,useEffect} from 'react';
import { API_URL } from '../auth/authConstants';

export const ModalFormEmploy = () => {
    const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [cc, setCc] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [role, setRole] = useState("employee"); // ["admin", "client", "employee"] "

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
      body: JSON.stringify({ username, password, name, surname, cc, email, phone , address, role}),
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

  useEffect(() => {
    handleSubmit;
    }, []);
    return (
        <>
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
              <div className="mb-3">
                <label htmlFor="recipient-name" className="col-form-label">Rol:</label>
                <select className="form-select" aria-label="Default select example" onChange={(e) => setRole(e.target.value)}>
                  <option value="employee">Empleado</option>
                  <option value="admin">Administrador</option>
                </select>
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
        </>
    )
}