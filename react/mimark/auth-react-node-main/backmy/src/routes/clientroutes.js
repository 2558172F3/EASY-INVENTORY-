// 8-- Archivo de las rutas
import express from "express";
const routes = express.Router();





routes.get("/", (req, res) => {
  //   res.send("<h1>Lista completa de las piezas de la coleccion</h1>");
  req.getConnection((error, conexion) => {
    if (error) return res.send(error);
    conexion.query(`
    SELECT 
    c.nombre, 
    c.apellidos, 
    c.telefono, 
    c.correo, 
    c.ciudad, 
    f.id_factura,
    SUM(p.precio * pf.cantidad) AS total_factura
FROM 
    cliente c
JOIN 
    factura f ON c.id_cliente = f.id_user_cliente
JOIN 
    producto_factura pf ON f.id_factura = pf.id_factura
JOIN 
    producto p ON pf.id_producto = p.id_producto
GROUP BY 
    c.nombre, 
    c.apellidos, 
    c.telefono, 
    c.correo, 
    c.ciudad, 
    f.id_factura
    ORDER BY 
    total_factura DESC;
    `, (err, piezasRows) => {
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
      "SELECT * FROM cliente WHERE id_cliente = ?",
      [req.params.id],
      (err, clienteRows) => {
        if (err) return res.send(err);
        res.json(clienteRows);
      }
    );
  });
});


// 11 - Ruta para insertar
routes.post("/", (req, res) => {
  req.getConnection((error, conexion) => {
    if (error) return res.send(error);
    // console.log(req.body);
    conexion.query("INSERT INTO cliente SET ?", [req.body], (err, piezasRows) => {
      if (err) return res.send(err);
      //   res.json(piezasRows);
      // 14 - cambiamos la respuesta
      res.json("<h2>éxito</h2>");
    });
  });
});

// 15 - Ruta para Eliminar
routes.delete("/:id", (req, res) => {
  req.getConnection((error, conexion) => {
    if (error) return res.send(error);
    conexion.query(
      "DELETE FROM cliente WHERE id_cliente = ?",
      [req.params.id],
      (err, piezasRows) => {
        if (err) return res.send(err);
        res.json("<h2>Pieza ELIMINADA con éxito</h2>");
      }
    );
  });
});


routes.put("/:id", (req, res) => {
  req.getConnection((error, conexion) => {
    if (error) return res.send(error);
    conexion.query(
      "UPDATE cliente SET ? WHERE id_cliente = ?",
      [req.body, req.params.id],
      (err, piezasRows) => {
        if (err) return res.send(err);
        res.json("<h2>Pieza ACTUALIZADA con éxito</h2>");
      }
    );
  });
});

export default routes;


