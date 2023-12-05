<!DOCTYPE html>
<html>
<head>
  <title>Iniciar sesión</title>
  <link rel="stylesheet" href="statics/login.css">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta charset="utf-8">
  
</head>
<body>
<<<<<<<< HEAD:login.php
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
========
<!-- importar switalert2 -->
<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <?php
    include("conexion.php");
    if(isset($_POST['username']) && isset($_POST['password'])){
      $username = $_POST['username'];
      $password = $_POST['password'];
      $query = "SELECT * FROM users WHERE nombre_usuario = '$username' AND cast(aes_decrypt(contraseña,'asdf') as char) = '$password'";
      $result = mysqli_query($conn, $query);
      if(mysqli_num_rows($result) == 1){
        $row = mysqli_fetch_array($result);
        $_SESSION['username'] = $username;
        echo '<script> swal.fire({
          title: "Bienvenido",
          text: "Has iniciado sesión correctamente",
          icon: "success",
          confirmButtonText: "Aceptar"
        }).then(function() {
          window.location = "dashboard/index.html";
        });</script>';
      }else{
        echo "<script>swal.fire({
          title: 'Error',
          text: 'Usuario o contraseña incorrectos',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });</script>";
      }
    }
    ?>
>>>>>>>> a39c41fe2d7ca377ee11903d877e0a9f939c0cdf:index.php
  <div class="container">
    <h2>Iniciar sesión</h2>
    <form id="login" method="post" action="index.php">
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

      form.submit();
      

    // Otras funciones
    // ...

  </script>
</body>
</html>
