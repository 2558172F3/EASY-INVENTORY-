const express = require("express");
const router = express.Router();
const Producto= require("../schema/products");
const { jsonResponse } = require("../lib/jsonResponse");

router.post("/", async (req, res) => {
  try {
    const {producto, cantidad, price} = req.body;
    const product = new Producto({producto, cantidad, price});
    const productInfo = await product.save();
    console.log({ productInfo });
    res.json(
        jsonResponse(200, {
            message: "Product created successfully",
        })
    );
    } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al crear el producto" });
    }
}
);  

module.exports = router;

