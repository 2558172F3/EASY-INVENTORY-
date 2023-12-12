
const express = require('express');
const router = express.Router();
const Product = require('../schema/products');
const { jsonResponse } = require("../lib/jsonResponse");

// Ruta para obtener un producto por su ID
router.put('/', async (req, res) => {
  const { id, producto, cantidad, price } = req.body;
  console.log(id, producto, cantidad, price, req.body,"req.body");
  try {
    // Encuentra el producto por id y actualízalo
    const updatedProduct = await Product.findByIdAndUpdate(id, { producto, cantidad, price }, { new: true });
  
    console.log("Producto actualizado exitosamente: ", updatedProduct);
    res.json(
      jsonResponse(200, {
        updatedProduct,
      })
    );
  } catch (err) {
    console.log(error);
    res.status(500).json({ error: "Error al crear el producto" });
  }
}
);
//   try {
//     await Product.findByIdAndUpdate(id, { producto, cantidad, price }, { new: true }, (err, doc) => {
//       if (err) {
//         console.log("Error al actualizar el producto");
//       } else {
//         console.log("Producto actualizado exitosamente: ", doc);
//       }
//     });

    
//     res.json(
//       jsonResponse(200, {
//         products,
//       })
//     );
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error al consultar el producto' });
//   }
// });

module.exports = router;
