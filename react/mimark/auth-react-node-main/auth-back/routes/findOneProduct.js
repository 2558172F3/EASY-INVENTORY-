
const express = require('express');
const router = express.Router();
const Product = require('../schema/products');
const { jsonResponse } = require("../lib/jsonResponse");

// Ruta para obtener un producto por su ID
router.get('/', async (req, res) => {
    //recibir parametros
    const { id } = req.params;

  try {
    const product = new Product();
    const products = await product.getProduct();

    
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
