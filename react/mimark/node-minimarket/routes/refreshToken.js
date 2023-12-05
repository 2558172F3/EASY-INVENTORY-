const router= require("express").Router();

router.get("/refreshToken", (req, res) => {
    res.send("Hello World!, desde refreshToken ");
    });

module.exports = router;