const { jsonResponse } = require("../lib/jsonResponse");

const router= require("express").Router();

router.post("/", (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json(jsonResponse(400,"fail", {
            Error: "Bad Request",
            message: "Username, email and password are required"

        }));
    }

    res.json(jsonResponse(200, "ok",{
        message: "User created",
    }));

    });

module.exports = router;