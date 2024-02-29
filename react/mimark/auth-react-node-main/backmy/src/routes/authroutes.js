import express from "express";
const routes = express.Router();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import db from "express-myconnection";
const secretKey="minimercado"

async function encryptPassword(password) {
    console.log(password,"llego las pass");
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Ruta para iniciar sesión
routes.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Busca al usuario en la base de datos
      const user = await db.query('SELECT * FROM users WHERE username = ?', [username]);
      if (user.length === 0) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }
  
      // Verifica la contraseña
      const validPassword = await bcrypt.compare(password, user[0].password);
      if (!validPassword) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }
  
      // Genera un token de acceso
      const accessToken = jwt.sign({ userId: user[0].id }, secretKey, { expiresIn: '15m' });
  
      // Genera un token de refresco
      const refreshToken = jwt.sign({ userId: user[0].id }, secretKey, { expiresIn: '7d' });
  
      // Almacena el token de refresco en la base de datos
      await db.query('INSERT INTO refresh_tokens (user_id, token) VALUES (?, ?)', [user[0].id, refreshToken]);
  
      res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  

// Ruta para renovar el token de acceso
routes.post('/refresh_token', async (req, res) => {
    try {
      const { refreshToken } = req.body;
  
      // Verifica el token de refresco
      const decoded = jwt.verify(refreshToken, secretKey);
  
      // Busca el token de refresco en la base de datos
      
      const storedRefreshToken = await db.query('SELECT * FROM refresh_tokens WHERE token = ?', [refreshToken]);
      if (storedRefreshToken.length === 0) {
        return res.status(401).json({ error: 'Token de refresco inválido' });
      }
  
      // Genera un nuevo token de acceso
      const newAccessToken = jwt.sign({ userId: decoded.userId }, secretKey, { expiresIn: '15m' });
  
      res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
      console.error('Error al renovar el token de acceso:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });

// Ruta para registrar un nuevo usuario
routes.post('/register', async (req, res) => {
    console.log("estoy registrando",req.body)
    try {
      const { username, password, rol,nombre, apellidos, telefono, correo } = req.body;
  
      // Verifica si el usuario ya existe en la base de datos
      req.getConnection(async (error, conexion) => {
        conexion.query('INSERT INTO personal (rol, nombre, apellidos, telefono, correo) VALUES (?,?,?,?,?)', [rol, nombre, apellidos, telefono, correo], async (err, result) => {
            if (err) {
                console.log("Error al crear el personal", err);
            } else {
                console.log("Personal creado con éxito, ID:", result.insertId);
                const idPersonal = result.insertId;
                // Ahora puedes usar idPersonal para crear un usuario
                const passEncript = await encryptPassword(password);
                conexion.query('INSERT INTO users (id_usuario_personal, nombre_usuario, contraseña) VALUES (?,?,?)', [idPersonal, username, passEncript], (err, result) => {
                    if (err) {
                        console.log("Error al crear el usuario", err);
                    } else {
                        console.log("Usuario creado con éxito");
                    }
                });
            }
        });
    });
    }
      catch{
        console.log("error ");
      }

})

    


        // if (error) return res.send(error);
        // conexion.query('SELECT * FROM users WHERE username = ?', [username], (err, piezasRows) => {
        //   if (err) return res.send(err);
        //   res.json(piezasRows);
        // });
    //   });
    //   const existingUser = await conexion.query('SELECT * FROM users WHERE username = ?', [username]);
    //   if (existingUser.length > 0) {
    //     return res.status(400).json({ error: 'El nombre de usuario ya está en uso' });
    //   }
  
      // Encripta la contraseña
    //   const hashedPassword = await bcrypt.hash(password, 10);
  
    //   // Almacena el nuevo usuario en la base de datos
    //   await db.query('INSERT INTO users (personal) VALUES (?)', [req.body]);
  
    //   res.status(201).json({ message: 'Usuario registrado correctamente' });
    // } catch (error) {
    //   console.error('Error al registrar el usuario:', error);
    //   res.status(500).json({ error: 'Error interno del servidor' });
    // }
//   });

  export default routes;