import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient,QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {Login} from "./routes/Login.tsx";
import Signup from "./routes/Signup.tsx";
import Clients from "./routes/clients.tsx"
import { AuthProvider } from "./auth/AuthProvider.tsx";
import Dashboard from "./routes/Dashboard.tsx";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";
import Profile from "./routes/Profile.tsx";
import  ClientesForm  from "./routes/clientesform.tsx";
import  ClienteInfo  from "./routes/clientesId.tsx";
import  ProveedorList  from "./routes/ProveedorList.jsx";
import Categoria  from "./routes/categoriaform.tsx";
import  FacturaList    from "./routes/FacturaList.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./index.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
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
