import React, { useState ,useEffect} from 'react';
import { useSignupMutation } from '../api/user';
// import { API_URL } from '../auth/authConstants';

export const ModalFormEmploy = () => {
    const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [role, setRole] = useState("employee"); // ["admin", "client", "employee"] "
  const { mutateAsync: signup } = useSignupMutation()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(username, name, surname, email, password, phone, password_confirmation, role,"aqui estoy en handleSubmit");
    if (password !== password_confirmation) {
      alert("Las contraseñas no coinciden");
      return;
    }
   try {
    const response = await signup({ username, nombre:name, apellidos:surname, correo:email, password, telefono:phone, role:parseInt(role) })
    console.log(response);
    alert(response.message);
   } catch (error) {
    console.log(error);
   }

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
  <form onSubmit={handleSubmit} >
    <div className="mb-3">
      <label htmlFor="username" className="col-form-label">Usuario:</label>
      <input type="text" className="form-control" id="username" onChange={(e) => setUsername(e.target.value)}/>
    </div>
    <div className="mb-3">
      <label htmlFor="name" className="col-form-label"  >Nombre:</label>
      <input type="text" className="form-control" id="name" onChange={(e) => setName(e.target.value)}/>
    </div>
    <div className="mb-3">
      <label htmlFor="surname" className="col-form-label">Apellido:</label>
      <input type="text" className="form-control" id="surname" onChange={(e) => setSurname(e.target.value)}/>
    </div>
    <div className="mb-3">
      <label htmlFor="phone" className="col-form-label">Teléfono:</label>
      <input type="text" className="form-control" id="phone" onChange={(e) => setPhone(e.target.value)}/>
    </div>
    <div className="mb-3">
      <label htmlFor="email" className="col-form-label">Correo:</label>
      <input type="text" className="form-control" id="email" onChange={(e) => setEmail(e.target.value)}/>
    </div>
    <div className="mb-3">
      <label htmlFor="password" className="col-form-label">Contraseña:</label>
      <input type="password" className="form-control" id="password" onChange={(e) => setPassword(e.target.value)}/>
    </div>
    <div className="mb-3">
      <label htmlFor="password_confirmation" className="col-form-label">Confirmar contraseña:</label>
      <input type="password" className="form-control" id="password_confirmation" name="password_confirmation" onChange={(e) => setPassword_confirmation(e.target.value)}/>
    </div>
    <div className="mb-3">
      <label htmlFor="role" className="col-form-label">Rol:</label>
      <select className="form-select" id="role" aria-label="Default select example" onChange={(e) => setRole(e.target.value)}>
        <option value="3">cajero</option>
        <option value="4">Administrador</option>
        <option value="1">Cliente</option>
        <option value="2">proveedor</option>
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