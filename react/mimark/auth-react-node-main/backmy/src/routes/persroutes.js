// 8-- Archivo de las rutas
import express from "express";
const routes = express.Router();

routes.get("/", (req, res) => {
  req.getConnection((error, conexion) => {
    console.log(req.params.id);
    if (error) return res.send(error
    );
    conexion.query(
      "SELECT * FROM personal",
      [req.params.id],
      (err, personalRows) => {
        if (err) return res.send(err);
        res.json(personalRows);
      }
    );
  });
});


routes.get("/:id", (req, res) => {
  req.getConnection((error, conexion) => {
    console.log(req.params.id);
    if (error) return res.send(error
    );
    conexion.query(
      "SELECT * FROM personal WHERE id_personal = ?",
      [req.params.id],
      (err, personalRows) => {
        if (err) return res.send(err);
        res.json(personalRows);
      }
    );
  });
});


// 11 - Ruta para insertar
routes.post("/", (req, res) => {
  req.getConnection((error, conexion) => {
    if (error) return res.send(error);
    // console.log(req.body);
    conexion.query("INSERT INTO personal SET ?", [req.body], (err, piezasRows) => {
      if (err) return res.send(err);
      //   res.json(piezasRows);
      // 14 - cambiamos la respuesta
      res.json("<h2>Registro realizado con éxito</h2>");
    });
  });
});

// 15 - Ruta para Eliminar
routes.delete("/:id", (req, res) => {
  req.getConnection((error, conexion) => {
    if (error) return res.send(error);
    conexion.query(
      "DELETE FROM personal WHERE id_personal = ?",
      [req.params.id],
      (err, piezasRows) => {
        if (err) return res.send(err);
        res.json("<h2>Registro eliminado con éxito</h2>");
      }
    );
  });
});


routes.put("/:id", (req, res) => {
  req.getConnection((error, conexion) => {
    if (error) return res.send(error);
    conexion.query(
      "UPDATE personal SET ? WHERE id_personal = ?",
      [req.body, req.params.id],
      (err, piezasRows) => {
        if (err) return res.send(err);
        res.json("<h2>Regsitro actualizado con éxito</h2>");
      }
    );
  });
});







/*
/**
 * @swagger
 * components:
 *   schemas:
 *     personal:
 *       type: object
 *       properties:
 *         Id_personal:
 *           type: integer
 *           description: Numero de registro que asigna el sistema a el dispositivo de manera automatica
 *         Rol:
 *           type: integer
 *           description: Numero asignado dependiendo el cargo a que va a ejercer
 *         nombre:
 *           type: varchar
 *           description: Nombre de la persona a registrar
 *         apellidos:
 *           type: varchar
 *           description: apellidos de la persona a registrar
 *         telefono:
 *           type: varchar
 *           description: Telefono de contacto de la persona a registrar         
 *         correo:
 *           type: varchar
 *           description: Correo electronico personal *          
 *       required:
 *         - Rol
 *         - Nombre
 *         - apellidos
 *         - telefono
 *         - correo          
 *       example:
 *         Id_personal: 9
 *         Rol: 3
 *         nombre: Jorge
 *         Apellidos: Marin
 *         Telefono: 4558585
 *         Correo: Jorg@gamil.con
 */

//mostrar
/**
 * @swagger
 * /personal:
 *   get:
 *     summary: Retorna todos los registros
 *     tags: [personal]
 *     responses:
 *       200:
 *         description: Esta es la lista del personal actual en la base de datos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/personal'
 */

/*routes.get("/", (req, res) => {
  //   res.send("<h1>Lista completa de las piezas de la coleccion</h1>");
  req.getConnection((error, conexion) => {
    if (error) return res.send(error);
    conexion.query("SELECT * FROM personal", (err, piezasRows) => {
      if (err) return res.send(err);
      res.json(piezasRows);
    });
  });
});


/*routes.get("/:id", (req, res) => {
  req.getConnection((error, conexion) => {
    console.log(req.params.id);
    if (error) return res.send(error
    );
    conexion.query(
      "SELECT * FROM personal WHERE id_personal = ?",
      [req.params.id],
      (err, personalRows) => {
        if (err) return res.send(err);
        res.json(personalRows);
      }
    );
  });
});



//insertar
/**
 * @swagger
 * /personal:
 *   post:
 *     summary: Registro  de un nuevo personal en la base de datos
 *     tags: [personal]
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:           
 *             $ref: '#/components/schemas/personal' 
 *     responses:
 *            200: 
 *              description: Nuevo registro insertado a la base de datos
 */

// 11 - Ruta para insertar
/*routes.post("/", (req, res) => {
  req.getConnection((error, conexion) => {
    if (error) return res.status(500).json({ error: "Error de conexión a la base de datos" });

    const nuevaTarea = req.body; // Suponiendo que req.body contiene los datos de la nueva tarea

    conexion.query("INSERT INTO personal SET ?", nuevaTarea, (err, resultado) => {
      if (err) return res.status(500).json({ error: "Error al insertar la tarea en la base de datos" });
      
      res.status(201).json({ message: "Registro creado exitosamente", tarea: nuevaTarea });
    });
  });
});


/**
 * @swagger
 * /personal/:{Id}:
 *   delete:
 *     summary: Emilinar un registro de las base de datos
 *     tags: [personal]
 *     parameters:
 *       - in : path
 *         name: Id_personal
 *         description: Id del personal
 *         schema:
 *          type: integer
 *         required: true
 *     responses: 
 *        200:
 *            description: Registro eliminado de la base de datos
 *            content:
 *              application/json:
 *                 schema:
 *                     type: object
 *                     $ref: '#/components/schemas/personal'
 */


// 15 - Ruta para Eliminar
/*routes.delete("/:id", (req, res) => {
  req.getConnection((error, conexion) => {
    if (error) return res.send(error);
    conexion.query(
      "DELETE FROM personal WHERE id_personal = ?",
      [req.params.id],
      (err, piezasRows) => {
        if (err) return res.send(err);
        res.json("Registro eliminado con éxito");
      }
    );
  });
});




//actualizar
/**
 * @swagger
 * /personal/{id}:
 *   put:
 *     summary: Actualiza un registro de la base de datos
 *     tags: [personal]
 *     parameters:
 *       - in : path
 *         name: Id_personal
 *         description: Id de la persona
 *         schema:
 *          type: integer
 *         required: true
 *     requestBody:
 *        required: true
 *        content:
 *           application/json:
 *              schema:
 *                $ref: '#/components/schemas/personal'
 *     responses: 
 *        200:
 *            description: Registro actualizado en la base de datos
 *            content:
 *              application/json:
 *                 schema:
 *                     type: object
 *                     $ref: '#/components/schemas/personal'
 *            404:
 *               description: No existe un registro con ese ID
 * 
 */

// 15 - Ruta para Actualizar
/*routes.put("/:id", (req, res) => {
  req.getConnection((error, conexion) => {
    if (error) return res.send(error);
    conexion.query(
      "UPDATE personal SET ? WHERE id_personal = ?",
      [req.body, req.params.id],
      (err, piezasRows) => {
        if (err) return res.send(err);
        res.json("Registro actualizado con éxito");
      }
    );
  });
});
*/
export default routes;

