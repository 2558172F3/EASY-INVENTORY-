const { jsonResponse } = require("../lib/jsonResponse");
const jwt = require('jsonwebtoken');

const router= require("express").Router();

router.post("/", (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    if (!email || !password) {
        return res.status(400).json(jsonResponse(400, {
            Error: "Bad Request",
            message: "Username and password are required"

        }));
    }
    //autenticacion
    // const accessToken = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20s' });
    // const refreshToken = jwt.sign({ email: email }, process.env.REFRESH_TOKEN_SECRET);
    const user = { email: email, password: password };
    res.json(jsonResponse(200, "ok",{
        message: "User logged in",
        // accessToken: accessToken,
        // refreshToken: refreshToken,
        user: user
    }));

    });

module.exports = router;