import { useEffect, useState } from "react";
import PortalLayout from "../layout/PortalLayout";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/authConstants";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export default function Dashboard() {
  const auth = useAuth();

  const [todos, setTodos] = useState<Todo[]>([]);
  const [value, setValue] = useState("");

  async function getTodos() {
    const accessToken = auth.getAccessToken();
    try {
      const response = await fetch(`${API_URL}/posts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const json = await response.json();
        setTodos(json);
        console.log(json);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function createTodo() {
    if (value.length > 3) {
      try {
        const response = await fetch(`${API_URL}/posts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.getAccessToken()}`,
          },
          body: JSON.stringify({ title: value }),
        });
        if (response.ok) {
          const todo = (await response.json()) as Todo;
          setTodos([...todos, todo]);
        }
      } catch (error) {}
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    createTodo();
  }

  return (
    <>
    <PortalLayout>

    {/* modal */}

    
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
