import React, { useState, ChangeEvent, FormEvent } from 'react'; 
import { useQuery } from '@tanstack/react-query';
import { useGetProveedor, usePostProveedor } from '../api/proveedorlist'; // Importa las funciones de API
import { Proveedor } from '../types/types';
import PortalLayout from '../layout/PortalLayout';

interface ProveedorListProps {
  data: Proveedor[];
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
}

const CustomerPage = () => {
  const { data: proveedor, refetch } = useQuery({ // Añade refetch para actualizar los datos después de agregar un proveedor
    queryKey: ['proveedor'],
    queryFn: useGetProveedor,
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 60 * 30,
  });

  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
    ciudad: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => { // Modifica handleSubmit para que sea asíncrono
    e.preventDefault();
    try {
      // Enviar los datos del nuevo proveedor al servidor
      await usePostProveedor(formData);
      // Actualizar la lista de proveedores refetch
      await refetch();
      // Limpiar el formulario después de enviar
      setFormData({
        nombre: '',
        direccion: '',
        telefono: '',
        ciudad: ''
      });
    } catch (error) {
      console.error('Error al agregar proveedor:', error);
    }
  };

  if (!proveedor) {
    return <div>Cargando...</div>;
  }

  const eliminarProveedor = (id: number) => {
    console.log(`Eliminando proveedor con ID: ${id}`);
    // Lógica para eliminar un proveedor...
  };

  const editarProveedor = (id: number) => {
    console.log(`Editando proveedor con ID: ${id}`);
    // Lógica para editar un proveedor...
  };

  return (
    <PortalLayout>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <label>
            Nombre:
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
          </label>
          <label>
            Dirección:
            <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} />
          </label>
          <label>
            Teléfono:
            <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} />
          </label>
          <label>
            Ciudad:
            <input type="text" name="ciudad" value={formData.ciudad} onChange={handleChange} />
          </label>
          <button type="submit">Agregar Proveedor</button>
        </form>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>id_proveedor</th>
              <th>nombre</th>
              <th>Direccion</th>
              <th>Telefono</th>
              <th>Ciudad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {proveedor.map((proveedor) => (
              <tr key={proveedor.id_proveedor}>
                <td>{proveedor.id_proveedor}</td>
                <td>{proveedor.nombre}</td>
                <td>{proveedor.direccion}</td>
                <td>{proveedor.telefono}</td>
                <td>{proveedor.ciudad}</td>
                <td>
                  <button onClick={() => editarProveedor(proveedor.id_proveedor)}>Editar</button>
                </td>
                <td>
                  <button onClick={() => eliminarProveedor(proveedor.id_proveedor)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PortalLayout>
  );
}

export default CustomerPage;
