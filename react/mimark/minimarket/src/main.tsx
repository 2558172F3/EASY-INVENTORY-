import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import {createBrowserRouter,RouterProvider} from 'react-router-dom'

import Login from './pages/login.tsx'
import Registro from './pages/signup.tsx'
import Dashboard from './pages/dashboard.tsx'
import ProtectRoute  from './protectRoute.jsx'
import { AuthProvider } from './auth/AuthProvider.jsx'

const router= createBrowserRouter([
  { path: '/', element: <Login /> },
  { path: '/signup', element: <Registro /> },
  { path: '/', element: <ProtectRoute/>, children: [
    { path: '/home', element: <App /> },
    { path: '/dashboard', element: <Dashboard /> },
  ] },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
    
  </React.StrictMode>,
)
