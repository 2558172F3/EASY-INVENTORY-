import express from "express";
const clientelist = express.Router();
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
clientelist.get("/", (req, res) => {
       req.getConnection((error, conexion) => {
      if (error) return res.send(error);
      conexion.query("SELECT * FROM cliente", (err, piezasRows) => {
        if (err) return res.send(err);
        res.json(piezasRows);
      });
    });
  });

  
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
  
  clientelist.get("/:id", (req, res) => {
    req.getConnection((error, conexion) => {
      console.log(req.params.id);
      if (error) return res.send(error
      );
      conexion.query(
        "SELECT * FROM cliente WHERE id_cliente = ?",
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
  clientelist.post("/", (req, res) => {
    req.getConnection((error, conexion) => {
      if (error) return res.send(error);
      // console.log(req.body);
      conexion.query("INSERT INTO cliente SET ?", [req.body], (err, piezasRows) => {
        if (err) return res.send(err);
        //   res.json(piezasRows);
        // 14 - cambiamos la respuesta
        res.json("<h2>cliente agregado con éxito</h2>");
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
  clientelist.delete("/:id", (req, res) => {
    req.getConnection((error, conexion) => {
      if (error) return res.send(error);
      conexion.query(
        "DELETE FROM cliente WHERE id_cliente = ?",
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
  
  clientelist.put("/:id", (req, res) => {
    req.getConnection((error, conexion) => {
      if (error) return res.send(error);
      conexion.query(
        "UPDATE cliente SET ? WHERE id_cliente = ?",
        [req.body, req.params.id],
        (err, piezasRows) => {
          if (err) return res.send(err);
          res.json("<h2>actualizacion exitosa éxito</h2>");
        }
      );
    });
  });
export default clientelist;