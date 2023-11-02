<!DOCTYPE html>
<html>
<head>
  <title>Iniciar sesión</title>
  <link rel="stylesheet" href="statics/login.css">
</head>
<body>
  <?php
$mysqli = new mysqli("localhost", "root", "Ibague2023*", "minimercado");
if ($mysqli->connect_errno) {
    echo "Fallo al conectar a MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}
echo $mysqli->host_info . "\n";

$mysqli = new mysqli("127.0.0.1", "usuario", "contraseña", "basedatos", 3306);
if ($mysqli->connect_errno) {
    echo "Fallo al conectar a MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

echo $mysqli->host_info . "\n";
?>
  <div class="container">
    <h2>Iniciar sesión</h2>
    <form id="login-form">
      <!-- Campos del formulario -->
      <div class="form-group">
        <label for="username">Nombre de usuario:</label>
        <input type="text" id="username" name="username" required>
      </div>
      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input type="password" id="password" name="password" required>
      </div>
      <!-- Botón de "Iniciar sesión" -->
      <button type="submit">Iniciar sesión</button>
    </form>
    <div class="additional-links">
        <a href="registro_usuarios.html">¿No tienes cuenta? Regístrate</a>
        <a href="#forgot-password">¿Olvidaste tu contraseña?</a>
      </div>
  </div>

  <!-- Biblioteca SweetAlert2 -->
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.0.18/dist/sweetalert2.min.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11.0.18/dist/sweetalert2.min.css">

  <script>
    var form = document.getElementById("login-form");
    form.addEventListener("submit", function(event) {
      event.preventDefault();
      validateForm();
    });

    function validateForm() {
      var username = document.getElementById("username");
      var password = document.getElementById("password");

      // Validación del formulario de inicio de sesión
      if (username.value === "usuario" && password.value === "contraseña") {
        // Mostrar SweetAlert2 con mensaje de éxito
        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          text: 'Has iniciado sesión correctamente.'
        }).then(function() {
          window.location = "index.html";
        });
      } else {
        // Mostrar SweetAlert2 con mensaje de error
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Usuario o contraseña incorrectos.'
        });
      }
    }

    // Otras funciones
    // ...

  </script>
</body>
</html>
