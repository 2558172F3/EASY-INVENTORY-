import express from "express";
const categoria = express.Router();
  /**
   * @swagger
   * /categoria:
   *   get:
   *     description: Obtiene todos los categorias del minimercado
   *     responses:
   *       200:
   *         description: Retorna una lista de categorias
   *       500:
   *         description: Error interno del servidor
   */
categoria.get("/", (req, res) => {
       req.getConnection((error, conexion) => {
      if (error) return res.send(error);
      conexion.query("SELECT * FROM categoria", (err, piezasRows) => {
        if (err) return res.send(err);
        res.json(piezasRows);
      });
    });
  });

  
  /**
   * @swagger
   * /categoria/{id}:
   *   get:
   *     summary: Obtiene un categoria por su ID
   *     tags: [categorias]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID del categoria
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Retorna un categoria
   *       404:
   *         description: categoria no encontrado
   */
  
  categoria.get("/:id", (req, res) => {
    req.getConnection((error, conexion) => {
      console.log(req.params.id);
      if (error) return res.send(error
      );
      conexion.query(
        "SELECT * FROM categoria WHERE id_categoria = ?",
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
   * /categoria:
   *   post:
   *     summary: Inserta un nuevo categoria
   *     tags: [categorias]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/categoria'
   *     responses:
   *       200:
   *         description: categoria insertado con éxito
   *       500:
   *         description: Error interno del servidor
   */
  // 11 - Ruta para insertar
  categoria.post("/", (req, res) => {
    req.getConnection((error, conexion) => {
      if (error) return res.send(error);
      // console.log(req.body);
      conexion.query("INSERT INTO categoria SET ?", [req.body], (err, piezasRows) => {
        if (err) return res.send(err);
        //   res.json(piezasRows);
        // 14 - cambiamos la respuesta
        res.json("<h2>categoria agregado con éxito</h2>");
      });
    });
  });
  
  
  /**
   * @swagger
   * /categoria/{id}:
   *   delete:
   *     summary: Elimina un categoria por su ID
   *     tags: [categorias]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID del categoria a eliminar
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: categoria eliminado con éxito
   *       404:
   *         description: categoria no encontrado
   */
  
  // 15 - Ruta para Eliminar
  categoria.delete("/:id", (req, res) => {
    req.getConnection((error, conexion) => {
      if (error) return res.send(error);
      conexion.query(
        "DELETE FROM categoria WHERE id_categoria = ?",
        [req.params.id],
        (err, piezasRows) => {
          if (err) return res.send(err);
          res.json("<h2>categoria eliminado con éxito</h2>");
        }
      );
    });
  });
  
  /**
   * @swagger
   * /categoria/{id}:
   *   put:
   *     summary: Actualiza un categoria por su ID
   *     tags: [categorias]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID del categoria a actualizar
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/categoria'
   *     responses:
   *       200:
   *         description: categoria actualizado con éxito
   *       404:
   *         description: categoria no encontrado
   *       500:
   *         description: Error interno del servidor
   */
  
  categoria.put("/:id", (req, res) => {
    req.getConnection((error, conexion) => {
      if (error) return res.send(error);
      conexion.query(
        "UPDATE categoria SET ? WHERE id_categoria = ?",
        [req.body, req.params.id],
        (err, piezasRows) => {
          if (err) return res.send(err);
          res.json("<h2>actualizacion exitosa éxito</h2>");
        }
      );
    });
  });
export default categoria;