import { useState, ChangeEvent, FormEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useGetProveedor, usePostProveedor, useDeleteProveedor, usePutProveedor } from '../api/proveedorlist.tsx';
import PortalLayout from '../layout/PortalLayout';

const CustomerPage = () => {
  const { data: proveedor, refetch } = useQuery({
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      await usePostProveedor(formData);
      await refetch();
      alert('¡Proveedor creado exitosamente!');
      setFormData({
        id_proveedor: '',
        nombre: '',
        direccion: '',
        telefono: '',
        ciudad: '',
      });
    } catch (error) {
      console.error('Error al agregar proveedor:', error);
    }
  };

  if (!proveedor) {
    return <div>Cargando...</div>;
  }

  const handleDeleteProveedor = async (id: number) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const success = await useDeleteProveedor(id);

    if (success) {
      alert('Proveedor eliminado correctamente.');
      await refetch();
    } else {
      alert('Error al eliminar el proveedor.');
    }
  };

  const editarProveedor = async (id: number | string) => {
    console.log(`Editando proveedor con ID: ${id}`);
    const proveedorEditado = proveedor.find((prov) => prov.id_proveedor === id);
    if (proveedorEditado) {
      setFormData(proveedorEditado);
    }
  };

  const handleUpdateProveedor = async () => {
    try {
      const hasChanged =
        formData.id_proveedor !== '' ||
        formData.nombre !== '' ||
        formData.direccion !== '' ||
        formData.telefono !== '' ||
        formData.ciudad !== '';

      if (hasChanged) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        await usePutProveedor(formData);
        await refetch();
        alert('Proveedor actualizado exitosamente!');
      }

      setFormData({
        id_proveedor: '',
        nombre: '',
        direccion: '',
        telefono: '',
        ciudad: '',
      });
    } catch (error) {
      console.error('Error al actualizar proveedor:', error);
    }
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
          <button type="button" onClick={handleUpdateProveedor}>Actualizar Proveedor</button>
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
            {proveedor.map((prov) => (
              <tr key={prov.id_proveedor}>
                <td>{prov.id_proveedor}</td>
                <td>{prov.nombre}</td>             
                <td>{prov.direccion}</td>
                <td>{prov.telefono}</td>
                <td>{prov.ciudad}</td>
                <td>
                  <button onClick={() => editarProveedor(prov.id_proveedor)}>Editar</button>
                </td>
                <td>
                <button onClick={() => handleDeleteProveedor(prov.id_proveedor)}>Eliminar</button>
                    
                </td>
              </tr>
              
            ))}
          </tbody>
          
        </table>
      </div>
    </PortalLayout>
  );
};

export default CustomerPage;

