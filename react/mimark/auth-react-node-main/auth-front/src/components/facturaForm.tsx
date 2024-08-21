import React, { useState } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import formatearMoneda from '../hoocks/convertMoneda';
import { useClientes, useProducts } from '../hoocks/infoPage';
import { usePostfactura } from '../api/facturaVenta';
import { ToastContainer, toast } from 'react-toastify';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import 'react-toastify/dist/ReactToastify.css';

const FacturaForm: React.FC = () => {
    const { productos, refetch } = useProducts();
    const { clientes } = useClientes();
    const [selectedClient, setSelectedClient] = useState<number | null>(0);
    const [selectedProducts, setSelectedProducts] = useState<{ [key: number]: number }>({});

    if (!productos || !clientes) {
        return <div>Loading...</div>;
    }
    console.log("clientes", clientes);

    const selectedProductList = productos.filter(product => selectedProducts[product.ID_Producto] > 0);
    const totalFactura = selectedProductList.reduce((acc, product) => {
        return acc + (product.Precio * selectedProducts[product.ID_Producto]);
    }, 0);

    const handleQuantityChange = (productId: number, quantity: number) => {
        const product = productos.find(p => p.ID_Producto === productId);
        if (product) {
            setSelectedProducts((prev) => ({
                ...prev,
                [productId]: Math.min(Math.max(0, quantity), product.Cantidad), // Ensure quantity is not negative and does not exceed stock
            }));
        }
    };

    const handleIncrement = (productId: number) => {
        const product = productos.find(p => p.ID_Producto === productId);
        if (product) {
            setSelectedProducts((prev) => ({
                ...prev,
                [productId]: Math.min((prev[productId] || 0) + 1, product.Cantidad), // Ensure quantity does not exceed stock
            }));
        }
    };

    const handleDecrement = (productId: number) => {
        setSelectedProducts((prev) => ({
            ...prev,
            [productId]: Math.max(0, (prev[productId] || 0) - 1),
        }));
    };

    const hadleSelectClient = async (clientId: number) => {
        console.log("Cliente seleccionado:", clientId);
        setSelectedClient(clientId);
    };

    const generatePDF = (facturaData: any) => {
        const doc = new jsPDF();
        doc.text('Factura', 20, 10);
        doc.text(`Cliente: ${clientes.find(c => c.id_cliente === facturaData.cliente)?.nombre}`, 20, 20);
        doc.text(`Vendedor: ${facturaData.vendedor}`, 20, 30);
        doc.text(`Fecha: ${facturaData.fecha}`, 20, 40);
        doc.text(`Hora: ${facturaData.hora}`, 20, 50);
    
        const tableColumn = ["Nombre", "Precio", "Cantidad", "Total"];
        const tableRows: any[] = [];
    
        facturaData.productos.forEach((product: any) => {
            const productData = [
                productos.find(p => p.ID_Producto === product.id)?.Nombre,
                formatearMoneda(productos.find(p => p.ID_Producto === product.id)?.Precio || 0),
                product.cantidad,
                formatearMoneda((productos.find(p => p.ID_Producto === product.id)?.Precio || 0) * product.cantidad)
            ];
            tableRows.push(productData);
        });
    
        doc.autoTable({ columns: tableColumn, body: tableRows, startY: 60 });
        doc.text(`Total Factura: ${formatearMoneda(totalFactura)}`, 20, doc.previousAutoTable.finalY + 10);
        doc.save('factura.pdf');
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Cliente seleccionado:", selectedClient);
        console.log("Productos seleccionados:", selectedProducts);
        const vendedorId = localStorage.getItem('personal_id');
        if (!vendedorId) {
            toast.error('No se ha iniciado sesión');
            return;
        }
        const facturaData = {
            cliente: selectedClient || 0,
            productos: selectedProductList.map((product) => ({
                id: product.ID_Producto,
                cantidad: selectedProducts[product.ID_Producto],
            })),
            fecha: new Date().toLocaleDateString(),
            hora: new Date().toLocaleTimeString(),
            vendedor: vendedorId,
        };

        try {
            const response = await usePostfactura(facturaData);
            console.log(response);
            toast.success(
                <div>
                    Factura registrada exitosamente
                    <Button variant="link" onClick={() => generatePDF(facturaData)}>Descargar Factura</Button>
                </div>
            );
        } catch (error) {
            console.error(error);
            toast.error('Error al registrar la factura');
        }
        refetch();
    };

    return (
        <div className="container">
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="clienteSelect">
                    <Form.Label>Seleccionar Cliente</Form.Label>
                    <Form.Control
                        as="select"
                        value={selectedClient || ''}
                        onChange={(e) => hadleSelectClient(parseInt(e.target.value, 10))}
                    >
                        <option value="">Seleccione un cliente</option>
                        {clientes.map((cliente) => (
                            <option key={cliente.id_cliente} value={cliente.id_cliente}>
                                {cliente.nombre}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Cantidad</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((product) => (
                            <tr key={product.ID_Producto}>
                                <td>{product.Nombre}</td>
                                <td>{formatearMoneda(product.Precio)}</td>
                                <td>{product.Cantidad}</td>
                                <td>
                                    <input
                                        type="number"
                                        value={selectedProducts[product.ID_Producto] || 0}
                                        onChange={(e) => handleQuantityChange(product.ID_Producto, parseInt(e.target.value, 10))}
                                        min="0"
                                        max={product.Cantidad} // Set max attribute to limit input
                                    />
                                </td>
                                <td>
                                    <Button variant="success" onClick={() => handleIncrement(product.ID_Producto)}>+</Button>
                                    <Button variant="danger" onClick={() => handleDecrement(product.ID_Producto)}>-</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <h3>Productos Seleccionados</h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedProductList.map((product) => (
                            <tr key={product.ID_Producto}>
                                <td>{product.Nombre}</td>
                                <td>{formatearMoneda(product.Precio)}</td>
                                <td>{selectedProducts[product.ID_Producto]}</td>
                                <td>{formatearMoneda(product.Precio * selectedProducts[product.ID_Producto])}</td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan={3} style={{ textAlign: 'right', fontWeight: 'bold' }}>Total Factura:</td>
                            <td style={{ fontWeight: 'bold' }}>{formatearMoneda(totalFactura)}</td>
                        </tr>
                    </tbody>
                </Table>

                <Button variant="primary" type="submit" disabled={
                    !selectedClient || selectedProductList.length === 0
                }>
                    Registrar Factura
                </Button>
            </Form>
            <button
            onClick={() => refetch()}
            >actualizar</button>
            <ToastContainer />
        </div>
    );
};

export default FacturaForm;