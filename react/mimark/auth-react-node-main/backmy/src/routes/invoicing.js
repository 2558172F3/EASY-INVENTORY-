import express from "express";
const factura = express.Router();

factura.get("/", (req, res) => {
  
  req.getConnection((error, conexion) => {
    if (error) return res.send(error);
    conexion.query("SELECT * FROM factura ", (err, piezasRows) => {
      if (err) return res.send(err);
      res.json(piezasRows);
    });
  });
});


factura.get("/:id", (req, res) => {
  req.getConnection((error, conexion) => {
    console.log(req.params.id);
    if (error) return res.send(error
    );
    conexion.query(
      "SELECT * FROM factura WHERE id_factura = ?",
      [req.params.id],
      (err, clienteRows) => {
        if (err) return res.send(err);
        res.json(clienteRows);
      }
    );
  });
});



factura.post("/", (req, res) => {
  req.getConnection((error, conexion) => {
    if (error) return res.send(error);
    
    conexion.query("INSERT INTO cliente SET ?", [req.body], (err, piezasRows) => {
      if (err) return res.send(err);
           
      res.json("<h2>éxito</h2>");
    });
  });
});


factura.delete("/:id", (req, res) => {
  req.getConnection((error, conexion) => {
    if (error) return res.send(error);
    conexion.query(
      "DELETE FROM factura WHERE id_factura = ?",
      [req.params.id],
      (err, piezasRows) => {
        if (err) return res.send(err);
        res.json("<h2> ELIMINADA </h2>");
      }
    );
  });
});


factura.put("/:id", (req, res) => {
  req.getConnection((error, conexion) => {
    if (error) return res.send(error);
    conexion.query(
      "UPDATE factura SET ? WHERE id_factura = ?",
      [req.body, req.params.id],
      (err, piezasRows) => {
        if (err) return res.send(err);
        res.json("<h2> ACTUALIZADA </h2>");
      }
    );
  });
});

export default factura;