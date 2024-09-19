import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import {usePostProveedor} from '../api/proveedorlist'
import { Proveedor } from '../types/types';
import 'react-toastify/dist/ReactToastify.css';

interface ModalProveedorProps {
    show: boolean;
    handleClose: () => void;
    refecth: () => void;
}

const ModalProveedor: React.FC<ModalProveedorProps> = ({ show, handleClose,refecth }) => {
    const [nombre, setNombre] = useState<string>('');
    const [direccion, setDireccion] = useState<string>('');
    const [telefono, setTelefono] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const proveedorData = {
            proveedor_id:null,
            nombre,
            direccion,
            telefono,
            email,
        };

        try {
            const response = await usePostProveedor(proveedorData as Proveedor);
            console.log(response.success);
            

            if (!response.success) {
                throw new Error('Error al agregar el proveedor');
            }
            refecth();
            toast.success('Proveedor agregado con éxito');
            handleClose();
        } catch (error: any) {
            toast.error(`Error: ${error.message}`);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Proveedor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formNombre">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese el nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formDireccion">
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese la dirección"
                                value={direccion}
                                onChange={(e) => setDireccion(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formTelefono">
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese el teléfono"
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Ingrese el email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Agregar
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            <ToastContainer />
        </>
    );
};

export default ModalProveedor;