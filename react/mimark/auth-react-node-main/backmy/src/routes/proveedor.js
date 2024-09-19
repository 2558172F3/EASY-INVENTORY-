// 8-- Archivo de las rutas
import express from "express";
const proveedorlist = express.Router();

proveedorlist.get("/", (req, res) => {
  req.getConnection((error, conexion) => {
    if (error) return res.status(500).send(error);
    conexion.query("SELECT * FROM proveedores", (err, usersRows) => {
      if (err) return
      res.json(usersRows);
    });
  });
});


proveedorlist.get("/compras", (req, res) => {
  req.getConnection((error, conexion) => {
    if (error) {
      console.error('Error al obtener la conexión:', error);
      return res.status(500).json({ error: 'Error al obtener la conexión a la base de datos' });
    }

    console.log("Obteniendo proveedores");

    const query = `
      SELECT 
        pr.*,
        c.id_compra,
        c.fecha_compra,
        c.cantidad,
        c.precio_compra,
        p.proveedor_id,
        p.nombre,
        p.direccion,
        p.telefono
      FROM proveedores p
      LEFT JOIN compras c ON p.proveedor_id = c.id_proveedor
      LEFT JOIN producto pr ON c.id_producto = pr.id_producto
      ORDER BY p.proveedor_id, c.id_compra, pr.id_producto;
    `;

    conexion.query(query, (err, rows) => {
      if (err) {
        console.error('Error al ejecutar la consulta:', err);
        return res.status(500).json({ error: 'Error al ejecutar la consulta' });
      }

      console.log('Resultados de la consulta:', rows);

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

        if (row.id_compra) {
          let factura = acc[row.proveedor_id].facturas.find(f => f.id_compra === row.id_compra);
          if (!factura) {
            factura = {
              id_compra: row.id_compra,
              fecha_compra: row.fecha_compra,
              productos: []
            };
            acc[row.proveedor_id].facturas.push(factura);
          }

          if (row.ID_Producto) {
            factura.productos.push({
              ID_Producto: row.ID_Producto,
              nombre_producto: row.Nombre,
              cantidad: row.cantidad,
              precio: row.Precio
            });
          }
        }

        return acc;
      }, {});

      console.log('Proveedores procesados:', proveedores);

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
    console.log("voy aqui");
    

    conexion.query("INSERT INTO proveedores SET ?", [req.body], (err, result) => {
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