import express from "express";
const routes = express.Router();


routes.post('/', async (req, res) => {
    try {
        const { cliente, productos, fecha, vendedor } = req.body;

        // Convertir la fecha al formato YYYY-MM-DD
        const [day, month, year] = fecha.split('/');
        const formattedFecha = `${year}-${month}-${day}`;

        req.getConnection((error, conexion) => {
            if (error) {
                return res.status(500).send(error);
            }

            // Insertar en la tabla factura
            const facturaQuery = "INSERT INTO factura (ID_User_vendedor, ID_User_Cliente, fecha) VALUES (?, ?, ?)";
            conexion.query(facturaQuery, [vendedor, cliente, formattedFecha], (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }

                const facturaId = result.insertId;

                // Insertar en la tabla producto_factura
                const productoFacturaQuery = "INSERT INTO producto_factura (id_producto, id_factura, cantidad) VALUES ?";
                const values = productos.map(producto => [producto.id, facturaId, producto.cantidad]);

                conexion.query(productoFacturaQuery, [values], (err) => {
                    if (err) {
                        return res.status(500).send(err);
                    }

                    // Actualizar la cantidad en la tabla producto
                    const updateProductQuery = "UPDATE producto SET Cantidad = Cantidad - ? WHERE ID_Producto = ?";
                    productos.forEach(producto => {
                        conexion.query(updateProductQuery, [producto.cantidad, producto.id], (err) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                        });
                    });

                    res.status(201).json({ message: 'Sales invoice created successfully' });
                });
            });
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the sales invoice' });
    }
});

export default routes;