const router= require("express").Router();

router.get("/users", (req, res) => {
    res.send("Hello World!, desde users ");
    });

module.exports = router;