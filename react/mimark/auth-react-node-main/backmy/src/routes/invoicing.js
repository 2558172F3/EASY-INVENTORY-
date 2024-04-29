import express from "express";
const factura = express.Router();

factura.get("/", (req, res) => {
  
  req.getConnection((error, conexion) => {
    if (error) return res.send(error);
    conexion.query(`select factura.ID_Factura, factura.fecha as fecha_compra, personal.nombre as vendedor,personal.apellidos, cliente.nombre as cliente,cliente.apellidos,cliente.ciudad,cliente.telefono,cliente.correo,producto_factura.id_producto,producto_factura.cantidad,producto.Nombre,producto.Precio
    from factura
      inner join personal on personal.id_personal=factura.ID_User_Vendedor
      inner join cliente on cliente.id_cliente=factura.ID_User_Cliente
      inner join producto_factura on producto_factura.id_factura=factura.ID_Factura
      inner join producto on producto.ID_Producto=producto_factura.id_producto;`
      , (err, piezasRows) => {
      if (err) return res.send(err);
      console.log(piezasRows);
      const facturasAgrupadas = {};
      piezasRows.forEach(factura => {
        const { ID_Factura } = factura;
      
        if (!facturasAgrupadas[ID_Factura]) {
          facturasAgrupadas[ID_Factura] = {
            ID_Factura,
            fecha_compra: factura.fecha_compra,
            vendedor: factura.vendedor,
            apellidos: factura.apellidos,
            cliente: factura.cliente,
            ciudad: factura.ciudad,
            telefono: factura.telefono,
            correo: factura.correo,
            productos: []
          };
        }
      
        facturasAgrupadas[ID_Factura].productos.push({
          id_producto: factura.id_producto,
          cantidad: factura.cantidad,
          Nombre: factura.Nombre,
          Precio: factura.Precio
        });
      });
      
      const facturas = Object.values(facturasAgrupadas);
      
      console.log(JSON.stringify(facturas, null, 2));
      res.json(facturas);
    });
  });
});


factura.get("/", (req, res) => {
  
  req.getConnection((error, conexion) => {
    if (error) return res.send(error);
    conexion.query("SELECT * FROM factura_producto ", (err, piezasRows) => {
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