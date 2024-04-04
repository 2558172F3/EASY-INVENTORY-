// 8-- Archivo de las rutas
import express from "express";
const proveedorlist = express.Router();


proveedorlist.get("/", (req, res) => {
  //   res.send("<h1>Lista completa de las piezas de la coleccion</h1>");
  req.getConnection((error, conexion) => {
    if (error) return res.send(error);
    conexion.query("SELECT * FROM proveedor", (err, piezasRows) => {
      if (err) return res.send(err);
      res.json(piezasRows);
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
  req.getConnection((error, conexion) => {
    if (error) return res.send(error);
    // console.log(req.body);
    conexion.query("INSERT INTO proveedor SET ?", [req.body], (err, piezasRows) => {
      if (err) return res.send(err);
      //   res.json(piezasRows);
      // 14 - cambiamos la respuesta
      res.json("<h2>proveedor agregado con éxito</h2>");
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
