const express = require("express");
const Employ = require("../schema/empleado");
const User = require("../schema/user");
const { jsonResponse } = require("../lib/jsonResponse");
const log = require("../lib/trace");
const router = express.Router();

router.post("/", async function (req, res, next) {
  const { username, password, name,surname,cc,email,phone,address,role } = req.body;
  console.log(req.body);
  if (!username || !password ||!name || !surname || !cc  || !email || !phone || !address || !role)     {
    //return next(new Error("username and password are required"));
    return res.status(409).json(
      jsonResponse(409, {
        error: "username and password are required",
      })
    );
  }

  try {
    
    const employs = new Employ({
      cc,
      email,
    });
    console.log(employs);
    const employExists = await employs.employExists(cc);
    console.log(employExists);

    if (!employExists) {
      const employ= new Employ({ name, surname, cc, email, phone, address });
      const user = new User({ username, password, name, role });
      user.save();

      employ.save();

      res.json(
        jsonResponse(200, {
          message: "Employ created successfully",
        })
      );
      //return next(new Error("user already exists"));
    } else {
      return res.status(409).json(
        jsonResponse(409, {
          error: "username already exists",
        })
      );

      
    }
  } catch (err) {
    return res.status(500).json(
      jsonResponse(500, {
        error: err.message,
      })
    );
    //return next(new Error(err.message));
  }
});

module.exports = router;
