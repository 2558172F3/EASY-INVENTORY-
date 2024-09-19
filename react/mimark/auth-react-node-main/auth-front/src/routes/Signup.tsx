import { useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { useAuth } from "../auth/AuthProvider";
import { Navigate } from "react-router-dom";
import { AuthResponseError } from "../types/types";
import { useSignupMutation } from "../api/user";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {
  const [username, setUsername] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setName] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [telefono, setTelefono] = useState("");
  const [role, setRole] = useState("client"); // ["admin", "client", "employee"]
  const [errorResponse, setErrorResponse] = useState("");
  const [isSignupSuccessful, setIsSignupSuccessful] = useState(false);

  const auth = useAuth();
  const { mutateAsync } = useSignupMutation();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(username, nombre);

    try {
      const data = await mutateAsync({
        username,
        password,
        nombre,
        apellidos,
        correo,
        telefono,
        role: role === "client" ? 1 : role === "employee" ? 2 : 3,
      });

      if (data) {
        await auth.validateToken();
        toast.success("Signup successful!");
        setIsSignupSuccessful(true);
      }
    } catch (error) {
      const err = error as AuthResponseError;
      setErrorResponse(err.body.error);
      toast.error(`Signup failed: ${err.body.error}`);
    }
  }

  if (isSignupSuccessful) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <DefaultLayout>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="form">
        <h1>Signup</h1>
        {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
        
        <label>Name</label>
        <input
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
          value={nombre}
        />
        
        <label>Username</label>
        <input
          type="text"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        
        <label>Apellidos</label>
        <input
          type="text"
          name="apellidos"
          onChange={(e) => setApellidos(e.target.value)}
          value={apellidos}
        />
        
        <label>Correo</label>
        <input
          type="email"
          name="correo"
          onChange={(e) => setCorreo(e.target.value)}
          value={correo}
        />
        
        <label>Teléfono</label>
        <input
          type="tel"
          name="telefono"
          onChange={(e) => setTelefono(e.target.value)}
          value={telefono}
        />
        
        <label>Role</label>
        <select
          name="role"
          onChange={(e) => setRole(e.target.value)}
          value={role}
        >
          <option value="client">Client</option>
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
        </select>
        
        <button>Create account</button>
      </form>
    </DefaultLayout>
  );
}