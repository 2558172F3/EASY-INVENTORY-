import { useState, ChangeEvent, FormEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useGetCategoria } from '../api/categor';
import { Categoria,  } from '../types/types';
import    PortalLayout from '../layout/PortalLayout';





import React from 'react';
import DeleteModalCategoria from '../components/modalFormDeletecatego';

interface CustomerPage {
  data: Categoria[];
}

const CustomerPage = () => {
  const { data: categoria, refetch } = useQuery({
    queryKey: ['categoria'],
    queryFn: useGetCategoria,
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 60 * 30,
  });

  const [formData, setFormData] = useState({
    id_categoria: 0,
    nombre: ''
  });

 

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value === 'categoria' ? parseInt(value) : value
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await useGetCategoria();
      await refetch();
      setFormData({
        id_categoria: 0,
        nombre: ''
    }); ''
    alert("Registro creado con éxito ")
} catch (error) {
  console.error('Error al agregar registro:', error);
}
};
  const handleDelete = async (id: string) => {
    try {
      await useGetCategoria();
      await refetch();
      console.log(`Registro con ID ${id} eliminado exitosamente.`);
      
    } catch (error) {
      console.error('Error al eliminar el registro:', error);
    }
  };
  
  return (
    <PortalLayout>
      <div className="container categoria-list-container">
      <img className="imagen"  width="100px" src="https://media.giphy.com/media/UGEEeGSBUSgnQ9bdXc/giphy.gif" />

      <form onSubmit={handleSubmit}>
          <label>
            Id:
            <input type="text" name="id_categoria" value={formData.id_categoria} onChange={handleChange} />
          </label>
          <label>
            Nombre:
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
          </label>

          {/* Resto del formulario de entrada de datos */}
          <button type="submit">Agregar</button>
        </form>
      <br />
        <table className="table table-striped">
          <thead>
            <tr>
              <th>id_categoria</th>
              <th>Nombre</th>

            </tr>
          </thead>
          <tbody>
            {categoria?.map((categoria: Categoria) => (
              <React.Fragment key={categoria.id_categoria}>
   

  

                <tr>
                  <td>{categoria.id_categoria}</td>
                  <td>{categoria.nombre}</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      data-bs-toggle="modal"
                      data-bs-target={`#categoria-edit-${categoria.id_categoria}`}
                    >
                      Editar
                    </button>
                  </td>
                  <td>
                  {/* Delete button and modal */}
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(categoria.id_categoria.toString())}
                    data-bs-toggle="modal"
                    data-bs-target={`#delete-modal-${categoria.id_categoria}`}
                    
                  >
                   Eliminar
                  </button>
                  
                  <DeleteModalCategoria id={`delete-modal-${categoria.id_categoria}`} handleDelete={undefined} />
                </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </PortalLayout>
  );
}

export default CustomerPage;
