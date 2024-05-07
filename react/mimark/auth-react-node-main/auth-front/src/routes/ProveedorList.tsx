import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useGetProveedor, usePostProveedor, useDeleteProveedor, useUpdateProveedor } from '../api/proveedorlist.tsx';
import PortalLayout from '../layout/PortalLayout';

const CustomerPage = () => {
  const { data: proveedor, refetch, isLoading, isError } = useQuery({
    queryKey: ['proveedor'],
    queryFn: useGetProveedor,
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 60 * 30,
  });

  const [formData, setFormData] = useState({
    id_proveedor: '',
    nombre: '',
    direccion: '',
    telefono: '',
    ciudad: '',
  });

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);

  useEffect(() => {
    if (!mostrarFormulario) {
      resetFormData();
      setModoEdicion(false);
    }
  }, [mostrarFormulario]);

  const toggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (modoEdicion) {
        await handleUpdateProveedor();
      } else {
        await handleAgregarProveedor();
      }
    } catch (error) {
      console.error('Error al guardar proveedor:', error);
    }
  };

  const handleAgregarProveedor = async () => {
    try {
      await usePostProveedor(formData);
      await refetch();
      alert('¡Proveedor creado exitosamente!');
      toggleFormulario();
    } catch (error) {
      console.error('Error al agregar proveedor:', error);
    }
  };

  const handleUpdateProveedor = async () => {
    try {
      await useUpdateProveedor(formData.id_proveedor, formData);
      await refetch();
      alert('¡Proveedor actualizado exitosamente!');
      toggleFormulario();
    } catch (error) {
      console.error('Error al actualizar proveedor:', error);
    }
  };

  const resetFormData = () => {
    setFormData({
      id_proveedor: '',
      nombre: '',
      direccion: '',
      telefono: '',
      ciudad: '',
    });
  };

  const handleDeleteProveedor = async (id: number) => {
    try {
      const success = await useDeleteProveedor(id);
      if (success) {
        alert('Proveedor eliminado correctamente.');
        await refetch();
      } else {
        throw new Error('Error al eliminar el proveedor.');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const editarProveedor = async (id: number | string) => {
    console.log(`Editando proveedor con ID: ${id}`);
    const proveedorEditado = proveedor.find((prov) => prov.id_proveedor === id);
    if (proveedorEditado) {
      setFormData(proveedorEditado);
      setModoEdicion(true);
      toggleFormulario();
    } else {
      console.error(`Proveedor con ID ${id} no encontrado.`);
    }
  };

  if (isLoading || !proveedor) {
    return <div>Cargando...</div>;
  }

  if (isError) {
    return <div>Error al cargar los proveedores.</div>;
  }

  return (
    <PortalLayout>
      <div className="container">
        <button onClick={toggleFormulario}>Agregar Proveedor</button>
        {mostrarFormulario && (
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
            <button type="submit">{modoEdicion ? 'Actualizar Proveedor' : 'Agregar Proveedor'}</button>
          </form>
        )}
        {proveedor.length === 0 ? (
          <div>No hay proveedores disponibles.</div>
        ) : (
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
              {proveedor.map((prov) => (
                <tr key={prov.id_proveedor}>
                  <td>{prov.id_proveedor}</td>
                  <td>{prov.nombre}</td>
                  <td>{prov.direccion}</td>
                  <td>{prov.telefono}</td>
                  <td>{prov.ciudad}</td>
                  <td>
                    <button onClick={() => editarProveedor(prov.id_proveedor)}>Editar</button>
                    <button onClick={() => handleDeleteProveedor(prov.id_proveedor)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </PortalLayout>
  );
};

export default CustomerPage;
