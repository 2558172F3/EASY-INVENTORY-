import { useState, ChangeEvent, FormEvent } from 'react'; 
import { useQuery } from '@tanstack/react-query';
import { useGetPersonal, usePostPersonal, useDeletePersonal } from '../api/pers'; 
import { Personal } from '../types/types';
import PortalLayout from '../layout/PortalLayout';
import { EditModal } from '../components/EditModal';

;
import React from 'react';
import DeleteModalCorreo from '../components/modalFormDeletepers';

interface CustomerPage {
  data: Personal[];
}

const CustomerPage = () => {
  const { data: personal, refetch } = useQuery({
    queryKey: ['Personal'],
    queryFn: useGetPersonal,
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 60 * 30,
  });

  const [formData, setFormData] = useState({
    id_personal: 0,
    rol: 0,
    nombre: '',
    apellidos: '',
    telefono: '',
    correo: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value === 'rol' ? parseInt(value) : value
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await usePostPersonal(formData);
      await refetch();
      setFormData({
        id_personal: 0,
        rol: 0,
        nombre: '',
        apellidos: '',
        telefono: '',
        correo: ''
      });
      alert("Registro creado con éxito ")
    } catch (error) {
      console.error('Error al agregar registro:', error);
    }
  };

 
    
  const handleDelete = async (correo: string) => {
    try {
      await useDeletePersonal(correo);
      await refetch();
      console.log(`Registro con ID ${correo} eliminado exitosamente.`);
      
    } catch (error) {
      console.error('Error al eliminar el registro:', error);
    }
  };
  return (
    <PortalLayout>
      <div className="container">
      <form onSubmit={handleSubmit}>
          <label>
            Rol:
            <input type="text" name="rol" value={formData.rol} onChange={handleChange} />
          </label>
          <label>
            Nombre:
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
          </label>
          <label>
            Apellidos
            <input type="text" name="apellidos" value={formData.apellidos} onChange={handleChange} />
          </label>
          <label>
            Teléfono:
            <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} />
          </label>
          <label>
            Correo:
            <input type="text" name="correo" value={formData.correo} onChange={handleChange} />
          </label>
          {/* Resto del formulario de entrada de datos */}
          <button type="submit">Agregar</button>
        </form>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Id_personal</th>
              <th>Rol</th>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Telefono</th>
              <th>Correo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {personal?.map((personal1: Personal) => (
              <React.Fragment key={personal1.id_personal}>
                <EditModal
                  personal={{
                    _id: personal1.id_personal.toString(),
                    Rol: personal1.rol,
                    Nombre: personal1.nombre,
                    Apellidos: personal1.apellidos,
                    Telefono: personal1.telefono,
                    Correo: personal1.correo,
                  }}
                  refetch={refetch}
                />
                <tr>
                  <td>{personal1.id_personal}</td>
                  <td>{personal1.rol}</td>
                  <td>{personal1.nombre}</td>
                  <td>{personal1.apellidos}</td>
                  <td>{personal1.telefono}</td>
                  <td>{personal1.correo}</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      data-bs-toggle="modal"
                      data-bs-target={`#persons-edit-${personal1.id_personal}`}
                    >
                      Editar
                    </button>
                  </td>
                  <td>
                  {/* Delete button and modal */}
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(personal1.correo)}
                    data-bs-toggle="modal"
                    data-bs-target={`#delete-modal-${personal1.id_personal}`}
                  >
                    Eliminar
                  </button>
                  <DeleteModalCorreo id={`delete-modal-${personal1.correo}`} handleDelete={undefined} />
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
