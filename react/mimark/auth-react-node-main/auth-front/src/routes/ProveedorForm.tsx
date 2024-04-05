import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import './ProveedorForm.css'; // Importa los estilos CSS personalizados

interface FormData {
  nombre: string;
  direccion: string;
  telefono: string;
  ciudad: string;
}

interface ProveedorFormProps {
  showModal: boolean;
  toggleModal: () => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  formData: FormData;
  editingId: string | null;
}

const ProveedorForm: React.FC<ProveedorFormProps> = ({
  showModal,
  toggleModal,
  handleSubmit,
  handleChange,
  formData,
  editingId
}) => {
  const [showForm, setShowForm] = useState(false);

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  return (
    <Modal show={showModal} onHide={toggleModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{editingId ? 'Editar Proveedor' : 'Agregar Proveedor'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formNombre">
            <Form.Label>Nombre:</Form.Label>
            <Form.Control type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="formDireccion">
            <Form.Label>Dirección:</Form.Label>
            <Form.Control type="text" name="direccion" value={formData.direccion} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="formTelefono">
            <Form.Label>Teléfono:</Form.Label>
            <Form.Control type="text" name="telefono" value={formData.telefono} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="formCiudad">
            <Form.Label>Ciudad:</Form.Label>
            <Form.Control type="text" name="ciudad" value={formData.ciudad} onChange={handleChange} />
          </Form.Group>
          <Button variant="primary" type="submit">{editingId ? 'Actualizar Proveedor' : 'Agregar Proveedor'}</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={toggleModal}>
          Cerrar
        </Button>
      </Modal.Footer>

      {/* Bloque condicional para el botón adicional */}
      {!showForm && (
        <div className="overlay">
          <div className="modal">
            <button onClick={toggleFormVisibility}>Agregar Proveedor</button>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default ProveedorForm;

