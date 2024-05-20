import React, { useState } from 'react';

interface Vendedor {
    nombre: string;
    apellidos: string;
}

interface Cliente {
    nombre: string;
    apellidos: string;
    ciudad: string;
    telefono: string;
    correo: string;
}

interface Producto {
    nombre: string;
    precio: number;
}

const FacturaVenta: React.FC = () => {
    const [vendedor, setVendedor] = useState<Vendedor>({
        nombre: '',
        apellidos: '',
    });

    const [cliente, setCliente] = useState<Cliente>({
        nombre: '',
        apellidos: '',
        ciudad: '',
        telefono: '',
        correo: '',
    });

    const [productos, setProductos] = useState<Producto[]>([]);

    const agregarProducto = (nombre: string, precio: number) => {
        const nuevoProducto: Producto = {
            nombre,
            precio,
        };

        setProductos([...productos, nuevoProducto]);
    };

    return (
        <div className='container bg-light'>
            <h1>Formulario de Venta</h1>

            <h2>Vendedor</h2>
            <input
                type="text"
                value={vendedor.nombre}
                onChange={(e) => setVendedor({ ...vendedor, nombre: e.target.value })}
                placeholder="Nombre del vendedor"
            />
            <input
                type="text"
                value={vendedor.apellidos}
                onChange={(e) => setVendedor({ ...vendedor, apellidos: e.target.value })}
                placeholder="Apellidos del vendedor"
            />

            <h2>Cliente</h2>
            <input
                type="text"
                value={cliente.nombre}
                onChange={(e) => setCliente({ ...cliente, nombre: e.target.value })}
                placeholder="Nombre del cliente"
            />
            <input
                type="text"
                value={cliente.apellidos}
                onChange={(e) => setCliente({ ...cliente, apellidos: e.target.value })}
                placeholder="Apellidos del cliente"
            />
            <input
                type="text"
                value={cliente.ciudad}
                onChange={(e) => setCliente({ ...cliente, ciudad: e.target.value })}
                placeholder="Ciudad del cliente"
            />
            <input
                type="text"
                value={cliente.telefono}
                onChange={(e) => setCliente({ ...cliente, telefono: e.target.value })}
                placeholder="Teléfono del cliente"
            />
            <input
                type="text"
                value={cliente.correo}
                onChange={(e) => setCliente({ ...cliente, correo: e.target.value })}
                placeholder="Correo del cliente"
            />

            <h2>Productos</h2>
            <input type="text" placeholder="Nombre del producto" />
            <input type="number" placeholder="Precio del producto" />
            <button>Agregar Producto</button>

            <h3>Carrito de Compras</h3>
            {productos.map((producto, index) => (
                <div key={index}>
                    <p>{producto.nombre}</p>
                    <p>{producto.precio}</p>
                </div>
            ))}
        </div>
    );
};

export default FacturaVenta;