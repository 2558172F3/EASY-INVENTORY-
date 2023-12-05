const router= require("express").Router();

router.get("/todo", (req, res) => {
    res.send("Hello World!, desde todo ");
    });

module.exports = router;