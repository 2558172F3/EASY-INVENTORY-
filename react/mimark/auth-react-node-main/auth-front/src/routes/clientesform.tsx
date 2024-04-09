import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { usePostClientes } from '../api/client';
import PortalLayout from '../layout/PortalLayout';

const ClienteForm: React.FC = () => {
  const [formState, setFormState] = useState({
    nombre: '',
    apellidos: '',
    telefono: '',
    correo: '',
    ciudad: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit= async (e: any) => {
    e.preventDefault();
    
        
           
    const response = await usePostClientes(formState)
    console.log(response,"===================== status code response");
    
   
  }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log(formState);
//   };

  return (
    <PortalLayout>
    <div className="container">
        <Form onSubmit={handleSubmit}>
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

        <Form.Group controlId="formCiudad">
            <Form.Label>Ciudad</Form.Label>
            <Form.Control type="text" name="ciudad" onChange={handleChange} />
        </Form.Group>

        <Button variant="primary" type="submit">
            Enviar
        </Button>
        </Form>
    </div>
    </PortalLayout>
  );
};

export default ClienteForm;
