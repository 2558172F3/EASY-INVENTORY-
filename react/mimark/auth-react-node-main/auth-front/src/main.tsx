import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider.tsx";
import Categoria from "./routes/categoriaform.tsx";
import ClientesForm from "./routes/clientesform.tsx";
import ClienteInfo from "./routes/clientesId.tsx";
import Clients from "./routes/clients.tsx";
import Dashboard from "./routes/Dashboard.tsx";
import FacturaList from "./routes/FacturaList.jsx";
import { Login } from "./routes/Login.tsx";
import NewFactura  from "./routes/newFactura.tsx";
import Profile from "./routes/Profile.tsx";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";
import ProveedorList from "./routes/ProveedorList.jsx";
import Signup from "./routes/Signup.tsx";
import FacturaCompra from "./routes/facturaCompra.tsx"

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import PersonalList from "./routes/personalList.tsx";
import RolList from "./routes/RolList.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path:"/factura",
    element:<FacturaList/>
  },
  {
    path:"/clients",
    element:<Clients/>
  },
  {
    path:"/ClienteForm",
    element:<ClientesForm/>
  },
  {
    path:"/cliente/:id",
    element:<ClienteInfo/>
  },
  {
    path:"/personal",
     element:<PersonalList/>
   },  
   {
    path:"/rol",
     element:<RolList/>
   }, 
   {
    path:"/Categoria",
     element:<Categoria/>
   }, 
   {
    path:"/new-factura",
      element:<NewFactura />
   },
  {
   path:"/proveedor",
    element:<ProveedorList/>
  },

  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/me",
        element: <Profile />,
      },
      {
        path: "/facturaCompra",
        element: <FacturaCompra />,
      },

    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
