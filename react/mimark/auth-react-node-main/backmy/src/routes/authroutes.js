import express from "express";
const routes = express.Router();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
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
  console.log("Intentando iniciar sesión", req.body);

  const { username, password } = req.body;

  try {
    // Busca el usuario en la base de datos
    const user = await new Promise((resolve, reject) => {
      req.getConnection((error, conexion) => {
        if (error) {
          return reject(error);
        }
        conexion.query('SELECT * FROM users WHERE nombre_usuario = ?', [username], (err, result) => {
          if (err) {
            return reject(err);
          }
          resolve(result[0]);
        });
      });
    });

    if (!user) {
      console.log("Usuario no encontrado");
      return res.status(400).json({ error: 'Nombre de usuario o contraseña incorrectos' });
    }

    console.log("Usuario encontrado:", user);

    // Asegúrate de que password y user.contraseña sean cadenas
    if (typeof password !== 'string' || typeof user.contraseña !== 'string') {
      console.log("Datos de contraseña inválidos");
      return res.status(400).json({ error: 'Nombre de usuario o contraseña incorrectos' });
    }

    const validPassword = await bcrypt.compare(password, user.contraseña);
    if (!validPassword) {
      console.log("Contraseña incorrecta");
      return res.status(400).json({ error: 'Nombre de usuario o contraseña incorrectos' });
    }

    const accessToken = jwt.sign({ userId: user.id_usuario }, secretKey, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId: user.id_usuario }, secretKey);

    await new Promise((resolve, reject) => {
      req.getConnection((error, conexion) => {
        if (error) {
          return reject(error);
        }
        conexion.query('INSERT INTO Tokens (refresh_token) VALUES (?)', [refreshToken], (err) => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });
    });

    console.log("Usuario autenticado con éxito", { accessToken, refreshToken, user: { id: user.id_usuario, username: user.nombre_usuario, personal: user.id_usuario_personal, client: user.id_usuario_cliente } });

    res.status(200).json({ accessToken, refreshToken, user: { id: user.id_usuario, username: user.nombre_usuario, personal: user.id_usuario_personal, client: user.id_usuario_cliente } });
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

 // ruta para cerificar acces token
  routes.post('/verify_token', async (req, res) => {
    console.log("verificando token",req.body);
    try {
      const { accessToken } = req.body;
      console.log("token a verificar",accessToken);

      // Verifica el token de acceso
      const decoded = jwt.verify(accessToken, secretKey);
      console.log("token verificado",decoded);
      res.status(200).json({ message: 'Token de acceso válido' });
    } catch (error) {
      console.error('Error al verificar el token de acceso:', error);
      res.status(401).json({ error: 'Token de acceso inválido' });
    }
  });

// Ruta para registrar un nuevo usuario
routes.post('/register', async (req, res) => {
    console.log("estoy registrando", req.body)
    try {
        const { username, password, rol, nombre, apellidos, telefono, correo } = req.body;
        const hashedPassword = await encryptPassword(password);
        console.log("contraseña encriptada", hashedPassword);
        // Verifica si el usuario ya existe

        req.getConnection(async (error, conexion) => {
            conexion.query('SELECT * FROM users WHERE nombre_usuario = ?', [username], async (err, result) => {
                if (err) {
                    console.log("Error al buscar el usuario", err);
                } else {
                    console.log("Usuario encontrado:", result);
                    if (result.length > 0) {
                        return res.status(500).json({ error: 'El nombre de usuario ya está en uso' });
                    }
                    // Almacena el nuevo usuario en la base de datos
                    // Verifica si el usuario ya existe en la base de datos
                    conexion.query('INSERT INTO personal (rol, nombre, apellidos, telefono, correo) VALUES (?,?,?,?,?)', [rol, nombre, apellidos, telefono, correo], async (err, result) => {
                      if (err) {
                          console.log("Error al crear el personal", err);
                          return res.status(500).json({ error: err });
                      } else {
                        console.log("Personal creado con éxito, ID:", result.insertId);
                        const idPersonal = result.insertId;
                        // Ahora puedes usar idPersonal para crear un usuario
                        conexion.query('INSERT INTO users (id_usuario_personal, nombre_usuario, contraseña) VALUES (?,?,?)', [idPersonal, username,  hashedPassword], (err, result) => {
                          if (err) {
                              console.log("Error al crear el usuario", err);
                              return res.status(500).json({ error: err });
                          } else {
                              console.log("Usuario creado con éxito");
                              res.status(201).json({ message: 'Usuario registrado correctamente' });
                          }
                      });
  
                      }
    
                    });
                }
            });
        });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


    


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