import { Link } from "react-router-dom";
import React, { MouseEvent } from "react";
import { useAuth } from "../auth/AuthProvider";
// import { API_URL } from "../auth/authConstants";

interface PortalLayoutProps {
  children?: React.ReactNode;
}
export default function PortalLayout({ children }: PortalLayoutProps) {
  const auth = useAuth();

  async function handleSignOut(e: MouseEvent) {
    e.preventDefault();
    auth.logout();
  }
  return (
    <>
      <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      <Link  className="navbar-brand" to="/dashboard">Dashboard de administrador</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link" href="#"  data-bs-toggle="modal" data-bs-target="#exampleModal" id="shown.bs.modal">Creación de usuario</a>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/factura">invoicing</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/clients">Ver clientes</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/ClienteForm">Agregar clientes</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/personal">Gestion del Personal</Link>
          </li>
          
          <li className="nav-item">
            <Link className="nav-link" to="/proveedor">Gestion Proveedor</Link>
          </li>
          <li>
            <Link to="/facturaCompra" className="nav-link">Compra</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/categoria">Categoria</Link>
          </li>
          <li>
            {/* <Link to="/me" className="nav-link">{auth.getUser()?.username ?? ""}</Link> */}
          </li>
          <li>
              <Link to="#" onClick={handleSignOut}  className="nav-link" >
                Sign out
              </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  
      </header>

      <main>{children}</main>
    </>
  );
}
