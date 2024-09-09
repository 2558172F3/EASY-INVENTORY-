// 8-- Archivo de las rutas
import express from "express";
const proveedorlist = express.Router();


proveedorlist.get("/", (req, res) => {
  req.getConnection((error, conexion) => {
    if (error) return res.send(error);
    
    const query = `
      SELECT 
        p.*,
        fc.id_factura_compra,
        fc.fecha_compra,
        pfc.cantidad,
        pfc.Precio,
        pr.ID_Producto,
        pr.Nombre AS nombre_producto,
        pr.Precio AS precio_producto
      FROM proveedor p
      LEFT JOIN factura_compra fc ON p.proveedor_id = fc.proveedor_id
      LEFT JOIN producto_factura_compra pfc ON fc.id_factura_compra = pfc.id_factura_compra
      LEFT JOIN producto pr ON pfc.id_producto = pr.ID_Producto
      ORDER BY p.proveedor_id, fc.id_factura_compra, pr.ID_Producto
    `;

    conexion.query(query, (err, rows) => {
      if (err) return res.send(err);

      // Procesamos los resultados para agrupar por proveedor
      const proveedores = rows.reduce((acc, row) => {
        if (!acc[row.proveedor_id]) {
          acc[row.proveedor_id] = {
            proveedor_id: row.proveedor_id,
            nombre: row.nombre,
            direccion: row.direccion,
            telefono: row.telefono,
            facturas: []
          };
        }
        
        if (row.id_factura_compra) {
          let factura = acc[row.proveedor_id].facturas.find(f => f.id_factura_compra === row.id_factura_compra);
          if (!factura) {
            factura = {
              id_factura_compra: row.id_factura_compra,
              fecha_compra: row.fecha_compra,
              productos: []
            };
            acc[row.proveedor_id].facturas.push(factura);
          }
          
          if (row.ID_Producto) {
            factura.productos.push({
              ID_Producto: row.ID_Producto,
              nombre_producto: row.nombre_producto,
              cantidad: row.cantidad,
              Precio: row.Precio,
              precio_producto: row.precio_producto
            });
          }
        }

        return acc;
      }, {});

      res.json(Object.values(proveedores));
    });
  });
});
/**
 * @swagger
 * /cliente:
 *   get:
 *     description: Obtiene todos los clientes del minimercado
 *     responses:
 *       200:
 *         description: Retorna una lista de clientes
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /cliente/{id}:
 *   get:
 *     summary: Obtiene un cliente por su ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del cliente
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Retorna un cliente
 *       404:
 *         description: Cliente no encontrado
 */

proveedorlist.get("/:id", (req, res) => {
  req.getConnection((error, conexion) => {
    console.log(req.params.id);
    if (error) return res.send(error
    );
    conexion.query(
      "SELECT * FROM proveedor WHERE id_proveedor = ?",
      [req.params.id],
      (err, usersRows) => {
        if (err) return res.send(err);
        res.json(usersRows);
      }
    );
  });
});

/**
 * @swagger
 * /cliente:
 *   post:
 *     summary: Inserta un nuevo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *     responses:
 *       200:
 *         description: Cliente insertado con éxito
 *       500:
 *         description: Error interno del servidor
 */
// 11 - Ruta para insertar
proveedorlist.post("/", (req, res) => {
  console.log(req.body);
  
  req.getConnection((error, conexion) => {
    if (error) {
      return res.status(500).json({
        success: false,
        message: "Error al obtener la conexión a la base de datos",
        error: error.message,
      });
    }

    conexion.query("INSERT INTO proveedor SET ?", [req.body], (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Error al insertar el proveedor",
          error: err.message,
        });
      }

      res.status(201).json({
        success: true,
        message: "Proveedor agregado con éxito",
        data: result,
      });
    });
  });
});


/**
 * @swagger
 * /cliente/{id}:
 *   delete:
 *     summary: Elimina un cliente por su ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del cliente a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cliente eliminado con éxito
 *       404:
 *         description: Cliente no encontrado
 */

// 15 - Ruta para Eliminar
proveedorlist.delete("/:id", (req, res) => {
  req.getConnection((error, conexion) => {
    if (error) return res.send(error);
    conexion.query(
      "DELETE FROM proveedor WHERE id_proveedor = ?",
      [req.params.id],
      (err, piezasRows) => {
        if (err) return res.send(err);
        res.json("<h2>cliente eliminado con éxito</h2>");
      }
    );
  });
});

/**
 * @swagger
 * /cliente/{id}:
 *   put:
 *     summary: Actualiza un cliente por su ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del cliente a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *     responses:
 *       200:
 *         description: Cliente actualizado con éxito
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error interno del servidor
 */

proveedorlist.put("/:id", (req, res) => {
  req.getConnection((error, conexion) => {
    if (error) return res.send(error);
    conexion.query(
      "UPDATE proveedor SET ? WHERE id_proveedor = ?",
      [req.body, req.params.id],
      (err, piezasRows) => {
        if (err) return res.send(err);
        res.json("<h2>actualizacion exitosa éxito</h2>");
      }
    );
  });
});

export default proveedorlist;