<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "minimercad2";
$error = "";

try {
  $conn = new mysqli($servername, $username, $password, $dbname);
  // Establece el modo de error de PDO en excepción
  $conn->set_charset("utf8");
  if ($conn->connect_error) {
    $error = "no se conecto". $conn->connect_error;
    die("error". $conn->connect_error);
    }
else {
  echo "conectado";
}
} catch(Exception $e) {
  echo "La conexión falló: " . $e->getMessage();
}
return $conn;
?>