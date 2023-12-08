
const express = require('express');
const router = express.Router();
const Product = require('../schema/products');
const { jsonResponse } = require("../lib/jsonResponse");

// Ruta para obtener un producto por su ID
router.delete('/', async (req, res) => {
  try {
    const product = new Product();
    const products = await product.deleteProducts();

    
    res.json(
      jsonResponse(200, {
        products,
      })
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al consultar el producto' });
  }
});

module.exports = router;
