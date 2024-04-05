import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { getPersonalDataById } from '../api/pers'; // Importa la función para obtener los datos personales por ID

interface PersonalData {
  id_personal: Number;
  rol: Number;
  nombre: string;
  apellidos: string;
  telefono: string;
  correo: string;
}

const EditModal: React.FC = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState<PersonalData>({
    id_personal: '',
    rol: '',
    nombre: '',
    apellidos: '',
    telefono: '',
    correo: '',
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    try {
      const personalData = await getPersonalDataById(data.id_personal);
      if (personalData && personalData.length > 0) {
        // Asignar el primer elemento de personalData
        setData(personalData[0]);
      } else {
        console.log('No se encontraron datos para el ID personal especificado.');
        // Puedes mostrar un mensaje de error al usuario u otro tipo de retroalimentación
      }
    } catch (error) {
      console.error('Error fetching personal data:', error);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Editar
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Datos Personales</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formIdPersonal">
              <Form.Label>ID Personal</Form.Label>
              <Form.Control type="text" name="id_personal" value={data.id_personal} onChange={handleChange} />
            </Form.Group>

            <Button variant="primary" onClick={handleSearch}>
              Buscar
            </Button>

            <Form.Group controlId="formRol">
              <Form.Label>Rol</Form.Label>
              <Form.Control type="text" name="rol" value={data.rol} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" name="nombre" value={data.nombre} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="formApellidos">
              <Form.Label>Apellidos</Form.Label>
              <Form.Control type="text" name="apellidos" value={data.apellidos} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="formTelefono">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control type="text" name="telefono" value={data.telefono} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="formCorreo">
              <Form.Label>Correo</Form.Label>
              <Form.Control type="email" name="correo" value={data.correo} onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditModal;
