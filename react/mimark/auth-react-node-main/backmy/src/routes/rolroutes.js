// 8-- Archivo de las rutas
import express from "express";
const routes = express.Router();

routes.get("/", (req, res) => {
  req.getConnection((error, conexion) => {
    console.log(req.params.id);
    if (error) return res.send(error
    );
    conexion.query(
      "SELECT * FROM rol WHERE id_rol = ?",
      [req.params.id],
      (err, rolRows) => {
        if (err) return res.send(err);
        res.json(rolRows);
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
      "SELECT * FROM rol WHERE id_rol = ?",
      [req.params.id],
      (err, rolRows) => {
        if (err) return res.send(err);
        res.json(rolRows);
      }
    );
  });
});


// 11 - Ruta para insertar
routes.post("/", (req, res) => {
  req.getConnection((error, conexion) => {
    if (error) return res.send(error);
    // console.log(req.body);
    conexion.query("INSERT INTO rol SET ?", [req.body], (err, piezasRows) => {
      if (err) return res.send(err);
      //   res.json(piezasRows);
      // 14 - cambiamos la respuesta
      res.json("<h2>Registro ingresado con éxito</h2>");
    });
  });
});

// 15 - Ruta para Eliminar
routes.delete("/:id", (req, res) => {
  req.getConnection((error, conexion) => {
    if (error) return res.send(error);
    conexion.query(
      "DELETE FROM rol WHERE id_rol = ?",
      [req.params.id],
      (err, piezasRows) => {
        if (err) return res.send(err);
        res.json("<h2>Rol ELIMINADO con éxito</h2>");
      }
    );
  });
});


routes.put("/:id", (req, res) => {
  req.getConnection((error, conexion) => {
    if (error) return res.send(error);
    conexion.query(
      "UPDATE rol SET ? WHERE id_rol = ?",
      [req.body, req.params.id],
      (err, piezasRows) => {
        if (err) return res.send(err);
        res.json("<h2>Rol ACTUALIZADO con éxito</h2>");
      }
    );
  });
});







/*
/**
 * @swagger
 * components:
 *   schemas:
 *     rol:
 *       type: object
 *       properties:
 *         Id_rol:
 *           type: integer
 *           description: Numero de rol que se le asigna en el sistema a el nuevo registro
 *         Nombre:
 *           type: varchar
 *           description: Nombre de la persona a registrar                 
 *       required:
 *         - Rol
 *         - Nombre                 
 *       example:
 *         Id_rol: 2
 *         Nombre: Proveedores
 *         
 */

//mostrar
/**
 * @swagger
 * /rol:
 *   get:
 *     summary: Retorna todos los registros
 *     tags: [rol]
 *     responses:
 *       200:
 *         description: Esta es la lista del personal actual en la base de datos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/rol'
 */

// Mostrar
/*routes.get("/", (req, res) => {
  //   res.send("<h1>Lista completa de las piezas de la coleccion</h1>");
  req.getConnection((error, conexion) => {
    if (error) return res.send(error);
    conexion.query("SELECT * FROM rol", (err, piezasRows) => {
      if (err) return res.send(err);
      res.json(piezasRows);
    });
  });
});


routes.get("/:id", (req, res) => {
  req.getConnection((error, conexion) => {
    console.log(req.params.id);
    if (error) return res.send(error
    );
    conexion.query(
      "SELECT * FROM rol WHERE id_rol = ?",
      [req.params.id],
      (err, rolRows) => {
        if (err) return res.send(err);
        res.json(rolRows);
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
      "SELECT * FROM rol WHERE id_rol = ?",
      [req.params.id],
      (err, rolRows) => {
        if (err) return res.send(err);
        res.json(rolRows);
      }
    );
  });
});



//insertar
/**
 * @swagger
 * /rol:
 *   post:
 *     summary: Registro del nuevo rol en la base de datos
 *     tags: [rol]
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:           
 *             $ref: '#/components/schemas/rol' 
 *     responses:
 *            200: 
 *              description: Nuevo rol insertado a la base de datos
 */

// 11 - Ruta para insertar
/*routes.post("/", (req, res) => {
  req.getConnection((error, conexion) => {
    if (error) return res.status(500).json({ error: "Error de conexión a la base de datos" });

    const nuevaTarea = req.body; // Suponiendo que req.body contiene los datos de la nueva tarea

    conexion.query("INSERT INTO rol SET ?", nuevaTarea, (err, resultado) => {
      if (err) return res.status(500).json({ error: "Error al insertar la tarea en la base de datos" });
      
      res.status(201).json({ message: "Rol creado exitosamente", tarea: nuevaTarea });
    });
  });
});


/**
 * @swagger
 * /rol/:{Id}:
 *   delete:
 *     summary: Eliminar rol de las base de datos
 *     tags: [rol]
 *     parameters:
 *       - in : path
 *         name: Id_rol
 *         description: Id del rol
 *         schema:
 *          type: integer
 *         required: true
 *     responses: 
 *        200:
 *            description: Rol eliminado de la base de datos
 *            content:
 *              application/json:
 *                 schema:
 *                     type: object
 *                     $ref: '#/components/schemas/rol'
 */


// 15 - Ruta para Eliminar
/*routes.delete("/:id", (req, res) => {
  req.getConnection((error, conexion) => {
    if (error) return res.send(error);
    conexion.query(
      "DELETE FROM rol WHERE id_rol = ?",
      [req.params.id],
      (err, piezasRows) => {
        if (err) return res.send(err);
        res.json("Rol eliminado con éxito");
      }
    );
  });
});




//actualizar
/**
 * @swagger
 * /rol/{id_rol}:
 *   put:
 *     summary: Actualiza un rol de la base de datos
 *     tags: [rol]
 *     parameters:
 *       - in : path
 *         name: Id_rol
 *         description: Id_rol de la persona
 *         schema:
 *          type: integer
 *         required: true
 *     requestBody:
 *        required: true
 *        content:
 *           application/json:
 *              schema:
 *                $ref: '#/components/schemas/rol'
 *     responses: 
 *        200:
 *            description: Rol actualizado en la base de datos
 *            content:
 *              application/json:
 *                 schema:
 *                     type: object
 *                     $ref: '#/components/schemas/rol'
 *            404:
 *               description: No existe un rol con ese ID
 * 
 */

// 15 - Ruta para Actualizar
/*routes.put("/:id", (req, res) => {
  req.getConnection((error, conexion) => {
    if (error) return res.send(error);
    conexion.query(
      "UPDATE rol SET ? WHERE id_rol = ?",
      [req.body, req.params.id],
      (err, piezasRows) => {
        if (err) return res.send(err);
        res.json("Rol actualizado con éxito");
      }
    );
  });
});*/

export default routes;



