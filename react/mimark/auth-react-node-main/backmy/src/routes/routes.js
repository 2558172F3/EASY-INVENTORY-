// 8-- Archivo de las rutas
import express from "express";
const routes = express.Router();



routes.get("/", (req, res) => {
  //   res.send("<h1>Lista completa de las piezas de la coleccion</h1>");
  req.getConnection((error, conexion) => {
    if (error) return res.send(error);
    conexion.query(`SELECT producto.ID_Producto, producto.Nombre, producto.Precio, producto.Cantidad,producto.ID_categoria, categoria.Nombre AS Nombre_Categoria
    FROM producto
    INNER JOIN categoria ON producto.ID_Categoria = categoria.ID_Categoria;
    `, (err, productosRows) => {
      if (err) return res.send(err);
      res.json(productosRows);
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
  const {ID_categoria,Nombre,Precio,Cantidad}=req.body.producto
  console.log("estamos en el crear producto",ID_categoria,Nombre,Precio,Cantidad);
  req.getConnection((error, conexion) => {
    if (error) return res.send(error);
    // console.log(req.body);
    // "INSERT INTO producto SET `ID_Categoria` = 1, `Nombre` = 'azucar', `Precio` = 3000, `Cantidad` = 50"

    conexion.query("INSERT INTO producto (ID_categoria,Nombre,Precio,Cantidad)  values(?,?,?,?) ", [ID_categoria,Nombre,Precio,Cantidad], (err, piezasRows) => {
      if (err) {
        return res.status(500).json(err);
      }
      
      res.status(200).json("<h2>Producto agregado con éxito</h2>");
    }
    );
  });
});


routes.put("/editproduct/:id", (req, res) => {
  console.log(req.body);
  req.getConnection((error, conexion) => {
    const {ID_categoria,Nombre,Precio,Cantidad}=req.body.producto
    conexion.query(
      "UPDATE producto SET ID_categoria = ?, Nombre = ?, Precio = ?, Cantidad = ? WHERE id_Producto = ? ", [ID_categoria,Nombre,Precio,Cantidad,parseInt(req.params.id)],(err,editproducts)=>{
        if (err) {
          console.log(err);
          res.status(500).json(err);
        }
        res.status(200).json(editproducts);
      }
    )
        
      }
    );
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
        
        res.status(200).json("<h2>Producto ELIMINADO con éxito</h2>");
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
