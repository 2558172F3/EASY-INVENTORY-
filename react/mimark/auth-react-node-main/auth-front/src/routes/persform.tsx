import React, { useState, useEffect } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
// import { usePostPersonal, useGetPersonal, useDeletePersonal } from '../api/pers'; // Importa la función de consulta
import "./style/styles.css";
// import ModalFormEditPersonal from '../components/modalFormEditpersonal'; 
import PortalLayout from '../layout/PortalLayout';

const PersForm: React.FC = () => {
  // const [showModal, setShowModal] = useState(false);
  const [records, setRecords] = useState<any[]>([]); // Estado para almacenar los registros
  const [formState, setFormState] = useState({
    id_personal:'',
    rol: 0,
    nombre: '',
    apellidos: '',
    telefono: '',
    correo: '',
  });

// Estado para controlar la visibilidad del modal de eliminación

// Estado para almacenar el id_personal del registro a eliminar


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();



    // Agregar el nuevo registro al estado de registros
    setRecords([...records, formState]);

    // Limpiar el formulario después de enviar
    setFormState({
      id_personal:'',
      rol: 0,
      nombre: '',
      apellidos: '',
      telefono: '',
      correo: '',
    });
  }

  const handleDelete = async (id: string) => {
    try {
      // await useDeletePersonal(id); // Asume que useDeletePersonal es una función que elimina un registro por id
      setRecords(records.filter(record => record.id_personal !== id)); // Actualiza el estado de los registros
    } catch (error) {
      console.error('Error deleting personal data:', error);
    }
  };
  

  // const toggleModal = () => {
  //   setShowModal(!showModal);
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const data = await useGetPersonal(); // Realiza la consulta para obtener los registros

      } catch (error) {
        console.error('Error fetching personal data:', error);
      }
    };

    fetchData(); // Llama a la función fetchData al montar el componente
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez, al montar el componente

  return (

    <PortalLayout>
    
    
    <div className="container">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formRol">
            <Form.Label>Rol</Form.Label>
            <Form.Control type="number" name="rol" onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="formNombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" name="nombre" onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="formApellidos">
            <Form.Label>Apellidos</Form.Label>
            <Form.Control type="text" name="apellidos" onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="formTelefono">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control type="tel" name="telefono" onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="formCorreo">
            <Form.Label>Correo</Form.Label>
            <Form.Control type="email" name="correo" onChange={handleChange} />
        </Form.Group>

        <div className='botones'>
          <Button variant="primary" type="submit" className="m-2">
            Agregar
          </Button>
          {/* Modal para editar */}
          {/* <ModalFormEditPersonal show={showModal} onHide={toggleModal} /> */}
        </div>  

        {/* Tabla para mostrar registros */}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id_personal</th>
              <th>Rol</th>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Teléfono</th>
              <th>Correo</th>
            </tr>
          </thead>
          <tbody>
  {records.map((record, index) => (
    <tr key={index}>
      <td>{record.id_personal}</td>
      <td>{record.rol}</td>
      <td>{record.nombre}</td>
      <td>{record.apellidos}</td>
      <td>{record.telefono}</td>
      <td>{record.correo}</td>
      <td>
        <Button variant="danger" onClick={() => handleDelete(record.id_personal)}>
          Eliminar
        </Button>
      </td>
    </tr>
  ))}
</tbody>
        </Table>
      </Form>
      <div className='gif'>
      <img src="https://giphy.com/gifs/animacion-cityarts-motion-gracphis-3o72EXEfAoFRXnzDvG" alt="GIF" className="gif-image" />

      </div>

    </div>
    </PortalLayout>
  );
};

export default PersForm;
