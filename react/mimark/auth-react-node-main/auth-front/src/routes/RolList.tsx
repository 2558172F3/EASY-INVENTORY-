import { useState, ChangeEvent, FormEvent } from 'react'; 
import { useQuery } from '@tanstack/react-query';
import { useGetRol,   } from '../api/rol'; // Importa las funciones de API
import { Rol } from '../types/types';
import PortalLayout from '../layout/PortalLayout';




interface CustomerPage {
  data: Rol[];
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
}

const CustomerPage = () => {
  const { data: rol, refetch } = useQuery({ // Añade refetch para actualizar los datos después de agregar un proveedor
    queryKey: ['Rol'],
    queryFn: useGetRol,
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 60 * 30,
  });

  const [formData, setFormData] = useState({

    id_rol: 0,
    nombre: ''
    
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value ==='rol' ? parseInt(value): value
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => { // Modifica handleSubmit para que sea asíncrono
    e.preventDefault();
    try {
      // Enviar los datos del nuevo proveedor al servidor
      // await usePostCategoria(formData);
      // Actualizar la lista de proveedores refetch
      await refetch();
      // Limpiar el formulario después de enviar
      setFormData({
        id_rol: 0,
        nombre: '',
        
      });
      alert("Registro creado con éxito ")
        } catch (error) {
      console.error('Error al agregar registro:', error);
    }
  };

  if (!rol) {
    return <div>Cargando...</div>;
  }  

  // const handleDelete = async (id_rol: number) => {
  //   try {
  //     await useDeleteRol(id_rol);
  //     await refetch();
  //     console.log(`Rol con ID ${id_rol} eliminado exitosamente.`);
  //     alert("Rol eliminado con éxito")
  //   } catch (error) {
  //     console.error('Error al eliminar el rol:', error);
  //   }
  // };

  {/*const editRol = (id: number) => {
    console.log(`Eliminando rol con ID: ${id}`);
    // Lógica para eliminar un rol...
  };*/}

 

  return (
    <PortalLayout>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <label>
            Nombre:
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
          </label>
          
          <button type="submit">Agregar</button>
        </form>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Id_rol</th>
              <th>Nombre</th>
              

              
            </tr>
          </thead>
          <tbody>
                {/* {rol.map((rol1:rol) => (
                  <>
                  < EditModalRol  rol={{
                    _id: rol1.id_rol.toString(),
                    Nombre:rol1.nombre,
                    
                  }
                }  */}
                {/* refetch={refetch} */}
                
                {/* /> */}
                  {/* <tr key={ rol1.id_rol.toString()}>
                    <td>{rol1.nombre}</td>
                    
                    <td><button className="btn btn-warning"  onClick={()=>handleSubmit(rol1.id_rol)} data-bs-toggle="modal" data-bs-target={`#rol-edit-${rol1.id_rol}`} id="shown.bs.modal" >editar</button></td>
                    <td><button className="btn btn-danger"  onClick={()=>handleDelete(rol1.id_rol)} data-bs-toggle="modal" data-bs-target={`#rol-delet-${rol1.id_roll}`} id="shown.bs.modal" >eliminar</button></td>

                  </tr>
                  </>
                ))} */}
              </tbody>
        </table>
      </div>
    </PortalLayout>
  );
}

export default CustomerPage;