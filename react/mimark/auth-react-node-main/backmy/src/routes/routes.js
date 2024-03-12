// 8-- Archivo de las rutas
import express from "express";
const routes = express.Router();



routes.get("/", (req, res) => {
  //   res.send("<h1>Lista completa de las piezas de la coleccion</h1>");
  req.getConnection((error, conexion) => {
    if (error) return res.send(error);
    conexion.query("SELECT * FROM producto", (err, piezasRows) => {
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
      "SELECT * FROM producto WHERE id_producto = ?",
      [req.params.id],
      (err, productosRows) => {
        if (err) return res.send(err);
        res.json(productosRows);
      }
    );
  });
});

routes.post("/", (req, res) => {
  req.getConnection((error, conexion) => {
    if (error) return res.send(error);
    // console.log(req.body);
    // "INSERT INTO producto SET `ID_Categoria` = 1, `Nombre` = 'azucar', `Precio` = 3000, `Cantidad` = 50"

    conexion.query("INSERT INTO producto SET ?", [req.body], (err, piezasRows) => {
      if (err) return res.send(err);
      
      res.json("<h2>Producto agregado con éxito</h2>");
    }
    );
  });
});

routes.delete("/del/:id", (req, res) => {
  req.getConnection((error, conexion) => {
    if (error) {
      return res.send(error);
    }
    conexion.query(
      "DELETE FROM producto WHERE id_producto = ?",
      [req.params.id],
      (err, productosRows) => {
        if (err) {
          return res.send(err);
        }
        res.json("<h2>Producto ELIMINADO con éxito</h2>");
      }
    );
  });
});

// buscar por categoria
routes.get("/categoria/:id", (req, res) => {
  req.getConnection((error, conexion) => {
    if (error) return res.send(error);
    conexion.query(
      "SELECT * FROM producto WHERE id_categoria = ?",
      [req.params.id],
      (err, productosRows) => {
        if (err
        ) return res.send(err);
        res.json(productosRows);
      }
    );
  });
});






// 11 - Ruta para insertar
// routes.post("/", (req, res) => {
//   req.getConnection((error, conexion) => {
//     if (error) return res.send(error);
//     // console.log(req.body);
//     conexion.query("INSERT INTO producto SET ?", [req.body], (err, piezasRows) => {
//       if (err) return res.send(err);
//       //   res.json(piezasRows);
//       // 14 - cambiamos la respuesta
//       res.json("<h2>Piexa agregada con éxito</h2>");
//     });
//   });
// });

// // 15 - Ruta para Eliminar
// routes.delete("/:id", (req, res) => {
//   req.getConnection((error, conexion) => {
//     if (error) return res.send(error);
//     conexion.query(
//       "DELETE FROM pieza WHERE codigo = ?",
//       [req.params.id],
//       (err, piezasRows) => {
//         if (err) return res.send(err);
//         res.json("<h2>Pieza ELIMINADA con éxito</h2>");
//       }
//     );
//   });
// });

// // 15 - Ruta para Eliminar
// routes.put("/:id", (req, res) => {
//   req.getConnection((error, conexion) => {
//     if (error) return res.send(error);
//     conexion.query(
//       "UPDATE pieza SET ? WHERE codigo = ?",
//       [req.body, req.params.id],
//       (err, piezasRows) => {
//         if (err) return res.send(err);
//         res.json("<h2>Pieza ACTUALIZADA con éxito</h2>");
//       }
//     );
//   });
// });

export default routes;
