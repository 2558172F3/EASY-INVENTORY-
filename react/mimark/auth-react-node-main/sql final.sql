-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         8.0.34 - MySQL Community Server - GPL
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para minimercad2
CREATE DATABASE IF NOT EXISTS `minimercad2` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `minimercad2`;

-- Volcando estructura para tabla minimercad2.categoria
CREATE TABLE IF NOT EXISTS `categoria` (
  `ID_Categoria` int NOT NULL AUTO_INCREMENT,
  `Nombre` char(50) COLLATE utf8mb4_spanish_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`ID_Categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci COMMENT='Entidad de las categorias de los productos';

-- Volcando datos para la tabla minimercad2.categoria: ~5 rows (aproximadamente)
INSERT INTO `categoria` (`ID_Categoria`, `Nombre`) VALUES
	(5, 'lacteos'),
	(6, 'carnicos'),
	(7, 'cereales'),
	(8, 'aseo'),
	(9, 'verduras');

-- Volcando estructura para tabla minimercad2.cliente
CREATE TABLE IF NOT EXISTS `cliente` (
  `id_cliente` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) COLLATE utf8mb4_spanish_ci NOT NULL,
  `apellidos` varchar(30) COLLATE utf8mb4_spanish_ci NOT NULL,
  `telefono` varchar(12) COLLATE utf8mb4_spanish_ci NOT NULL,
  `correo` varchar(40) COLLATE utf8mb4_spanish_ci NOT NULL,
  `ciudad` varchar(30) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id_cliente`) USING BTREE,
  UNIQUE KEY `correo` (`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- Volcando datos para la tabla minimercad2.cliente: ~5 rows (aproximadamente)
INSERT INTO `cliente` (`id_cliente`, `nombre`, `apellidos`, `telefono`, `correo`, `ciudad`) VALUES
	(1, 'juan bautista ', 'chabadu', '3213152', 'mmasjk@', 'bogota'),
	(2, 'antonio ', 'pereira', '3153235', '542165551@', 'bogota'),
	(3, 'leonel', 'messi', '3182035', 'asfsdvf@', 'bogota'),
	(4, 'james ', 'rodriguez', '3135218515', 'srfgrd@sd', 'ibague'),
	(5, 'juan martin', 'del potro', '6513215', 'sresdc@ssd', 'bogota');

-- Volcando estructura para tabla minimercad2.factura
CREATE TABLE IF NOT EXISTS `factura` (
  `ID_Factura` int NOT NULL AUTO_INCREMENT,
  `ID_User_Vendedor` int NOT NULL,
  `ID_User_Cliente` int NOT NULL,
  `fecha` date NOT NULL,
  PRIMARY KEY (`ID_Factura`),
  KEY `ID_User_Vendedor` (`ID_User_Vendedor`),
  KEY `ID_User_Cliente` (`ID_User_Cliente`),
  CONSTRAINT `fk_cliente_factura` FOREIGN KEY (`ID_User_Cliente`) REFERENCES `cliente` (`id_cliente`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_personal_factura` FOREIGN KEY (`ID_User_Vendedor`) REFERENCES `personal` (`id_personal`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- Volcando datos para la tabla minimercad2.factura: ~11 rows (aproximadamente)
INSERT INTO `factura` (`ID_Factura`, `ID_User_Vendedor`, `ID_User_Cliente`, `fecha`) VALUES
	(1, 2, 4, '2023-09-20'),
	(2, 3, 5, '2023-09-11'),
	(3, 2, 1, '2023-09-13'),
	(4, 3, 3, '2023-09-19'),
	(5, 3, 2, '2023-09-20'),
	(6, 3, 1, '2024-08-04'),
	(7, 1, 3, '2024-08-02'),
	(8, 7, 1, '2024-08-19'),
	(24, 7, 2, '2024-08-19'),
	(25, 7, 1, '2024-08-19'),
	(26, 7, 3, '2024-08-20');

-- Volcando estructura para tabla minimercad2.factura_compra
CREATE TABLE IF NOT EXISTS `factura_compra` (
  `id_factura_compra` int NOT NULL AUTO_INCREMENT,
  `proveedor_id` int NOT NULL,
  `fecha_compra` date NOT NULL,
  PRIMARY KEY (`id_factura_compra`),
  KEY `proveedor` (`proveedor_id`),
  CONSTRAINT `proveedor` FOREIGN KEY (`proveedor_id`) REFERENCES `proveedor` (`proveedor_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci COMMENT='tabla para compra de mercancias ';

-- Volcando datos para la tabla minimercad2.factura_compra: ~0 rows (aproximadamente)

-- Volcando estructura para tabla minimercad2.personal
CREATE TABLE IF NOT EXISTS `personal` (
  `id_personal` int NOT NULL AUTO_INCREMENT,
  `rol` int DEFAULT NULL,
  `nombre` varchar(30) COLLATE utf8mb4_spanish_ci NOT NULL,
  `apellidos` varchar(30) COLLATE utf8mb4_spanish_ci NOT NULL,
  `telefono` varchar(12) COLLATE utf8mb4_spanish_ci NOT NULL,
  `correo` varchar(40) COLLATE utf8mb4_spanish_ci NOT NULL,
  PRIMARY KEY (`id_personal`),
  UNIQUE KEY `correo` (`correo`),
  KEY `fk_personal_rol` (`rol`),
  CONSTRAINT `fk_personal_rol` FOREIGN KEY (`rol`) REFERENCES `rol` (`ID_Rol`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- Volcando datos para la tabla minimercad2.personal: ~8 rows (aproximadamente)
INSERT INTO `personal` (`id_personal`, `rol`, `nombre`, `apellidos`, `telefono`, `correo`) VALUES
	(1, 4, 'pedro', 'de jesus', '3135215', 'dcslnvkfjb@svff'),
	(2, 3, 'edgar', 'san martin', '145312321', 'mksd@ajshb'),
	(3, 3, 'miguel', 'quiroga', '321513211', 'mljkahb@nijsdbh.com'),
	(4, 2, 'claudia', 'duran', '3213513285', 'xdsdv@aksxbans'),
	(5, 2, 'juan', 'quiroga', '3151351', 'sdbhvbjd@kanksj'),
	(6, 3, 'elvia', 'britto', '323', ''),
	(7, 4, 'miguel angel', 'quiroga duran', '24215432', 'm@gmail.com'),
	(8, NULL, 'juan', 'tenorio', '24543', 'juant@easyinventory.co');

-- Volcando estructura para tabla minimercad2.producto
CREATE TABLE IF NOT EXISTS `producto` (
  `ID_Producto` int NOT NULL AUTO_INCREMENT,
  `ID_Categoria` int NOT NULL,
  `Nombre` char(50) COLLATE utf8mb4_spanish_ci NOT NULL DEFAULT '',
  `Precio` float NOT NULL DEFAULT '0',
  `Cantidad` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID_Producto`),
  KEY `ID_Categoria` (`ID_Categoria`),
  CONSTRAINT `FK_producto_categoria` FOREIGN KEY (`ID_Categoria`) REFERENCES `categoria` (`ID_Categoria`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci COMMENT='entdad de los productos en el minimercado';

-- Volcando datos para la tabla minimercad2.producto: ~5 rows (aproximadamente)
INSERT INTO `producto` (`ID_Producto`, `ID_Categoria`, `Nombre`, `Precio`, `Cantidad`) VALUES
	(2, 5, 'lache editada', 200000, 498),
	(3, 6, 'carne de cerdo', 5500, 110),
	(4, 8, 'jabon rey de reyes', 2000, 4998),
	(5, 9, 'tomaco', 500, 500),
	(9, 7, 'Arrox', 7283, 818282);

-- Volcando estructura para tabla minimercad2.producto_factura
CREATE TABLE IF NOT EXISTS `producto_factura` (
  `id_producto` int DEFAULT NULL,
  `id_factura` int DEFAULT NULL,
  `cantidad` int DEFAULT NULL,
  KEY `fk_factura_profactura` (`id_factura`),
  KEY `fk_producto_profactura` (`id_producto`),
  CONSTRAINT `fk_factura_profactura` FOREIGN KEY (`id_factura`) REFERENCES `factura` (`ID_Factura`),
  CONSTRAINT `fk_producto_profactura` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`ID_Producto`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- Volcando datos para la tabla minimercad2.producto_factura: ~13 rows (aproximadamente)
INSERT INTO `producto_factura` (`id_producto`, `id_factura`, `cantidad`) VALUES
	(3, 1, 45),
	(5, 1, 45),
	(4, 2, 45),
	(2, 3, 78),
	(2, 5, 36),
	(3, 6, 20),
	(5, 6, 45),
	(9, 7, 22),
	(2, 7, 1325),
	(2, 24, 500),
	(4, 24, 2),
	(2, 25, 1),
	(2, 26, 2);

-- Volcando estructura para tabla minimercad2.producto_factura_compra
CREATE TABLE IF NOT EXISTS `producto_factura_compra` (
  `id_factura_compra` int DEFAULT NULL,
  `id_producto` int DEFAULT NULL,
  `cantidad` int DEFAULT NULL,
  `Precio` int DEFAULT NULL,
  KEY `factura_compra` (`id_factura_compra`),
  KEY `producto` (`id_producto`),
  CONSTRAINT `factura_compra` FOREIGN KEY (`id_factura_compra`) REFERENCES `factura_compra` (`id_factura_compra`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `producto` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`ID_Producto`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci COMMENT='tabla intermedia para compra de mercancias entre producto y facturacompra';

-- Volcando datos para la tabla minimercad2.producto_factura_compra: ~0 rows (aproximadamente)

-- Volcando estructura para tabla minimercad2.proveedor
CREATE TABLE IF NOT EXISTS `proveedor` (
  `proveedor_id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `direccion` varchar(50) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `telefono` varchar(50) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`proveedor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci COMMENT='lista de proveedores';

-- Volcando datos para la tabla minimercad2.proveedor: ~2 rows (aproximadamente)
INSERT INTO `proveedor` (`proveedor_id`, `nombre`, `direccion`, `telefono`) VALUES
	(1, 'alejandro', 'mx 3 calle3', '3131315'),
	(2, 'lucas arnau', 'jjsud-5', '3135323');

-- Volcando estructura para tabla minimercad2.rol
CREATE TABLE IF NOT EXISTS `rol` (
  `ID_Rol` int NOT NULL AUTO_INCREMENT,
  `Nombre` char(50) COLLATE utf8mb4_spanish_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`ID_Rol`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci COMMENT='Roles de los usuarios en el sistema';

-- Volcando datos para la tabla minimercad2.rol: ~4 rows (aproximadamente)
INSERT INTO `rol` (`ID_Rol`, `Nombre`) VALUES
	(1, 'cliente'),
	(2, 'proveedores'),
	(3, 'cajero'),
	(4, 'administrador');

-- Volcando estructura para tabla minimercad2.sucursal
CREATE TABLE IF NOT EXISTS `sucursal` (
  `ID_Sucursal` int NOT NULL,
  `Ciudad` char(50) COLLATE utf8mb4_spanish_ci NOT NULL DEFAULT '',
  `Direccion` char(50) COLLATE utf8mb4_spanish_ci NOT NULL DEFAULT '',
  `Telefono` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID_Sucursal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci COMMENT='Entidad de las sucursales';

-- Volcando datos para la tabla minimercad2.sucursal: ~0 rows (aproximadamente)

-- Volcando estructura para tabla minimercad2.sucursal_producto
CREATE TABLE IF NOT EXISTS `sucursal_producto` (
  `ID_Sucursal` int DEFAULT NULL,
  `ID_Producto` int DEFAULT NULL,
  KEY `ID_Sucursal` (`ID_Sucursal`),
  KEY `ID_Producto` (`ID_Producto`),
  CONSTRAINT `FK2_producto` FOREIGN KEY (`ID_Producto`) REFERENCES `producto` (`ID_Producto`),
  CONSTRAINT `FK__sucursal` FOREIGN KEY (`ID_Sucursal`) REFERENCES `sucursal` (`ID_Sucursal`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci COMMENT='Entidad intermedia entre Sucursal y Productos';

-- Volcando datos para la tabla minimercad2.sucursal_producto: ~0 rows (aproximadamente)

-- Volcando estructura para tabla minimercad2.tokens
CREATE TABLE IF NOT EXISTS `tokens` (
  `id_token` int NOT NULL AUTO_INCREMENT,
  `refresh_token` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `access_token` varchar(255) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id_token`)
) ENGINE=InnoDB AUTO_INCREMENT=108 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci COMMENT='tabla para almacenar los tokens para la autenticacion';

-- Volcando datos para la tabla minimercad2.tokens: ~107 rows (aproximadamente)
INSERT INTO `tokens` (`id_token`, `refresh_token`, `access_token`) VALUES
	(1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDk2MDM2ODV9.oWqHIbXEP0IZDefTzOkOb8RbGbvuuTHIFmzjdRa-ZlA', NULL),
	(2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDk2MDM5MTl9.WZU0ZgP3VSs8C8bJ1-KzBWC3Ksm3E13YAcmOyfrRUB8', NULL),
	(3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDk2MDk4NTR9.l_DHGA61mrYl3y4zrIY2DdIH5_Km9ZgkKGK7uyzJ-EE', NULL),
	(4, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDk2MDk5Mjl9.Fzs1DJNK3IgHvtITb-q7uzd5CaeQpRqvDSR_wNV1jlo', NULL),
	(5, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDk2MTAwNjN9.B1H20KADsMq0cs7MhWuoW207tHYB4xEXK4sA_F6FRj8', NULL),
	(6, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDk2MTAxNDN9.gNMwTd2sOMSrq-Qsn1rjNY-Kux7RuaTYNQGwFEzvsng', NULL),
	(7, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDk2MTEzMzZ9.Q2RrNs00EpvpdxfdDopdk_Jesx-Bk2OxIJTQDQfpjXk', NULL),
	(8, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDk2MTIyNTh9.uYjo2EzC6QlRj6h0BlXbP1Cq129OAhW1NfTAQom7UY8', NULL),
	(9, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDk2MTIzNTF9.LEMMEAWQsZLJ0UpBVtByCAUuYKIKQ-DvJsqTgkt5cj0', NULL),
	(10, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDk2MTI3NDB9._TuhH5yIFmT8BPoFSe0kAPDbF1g-G6SDP9vEXSMt9YY', NULL),
	(11, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDk2MTI3OTV9.QjclUssl0miB6ameLxneF8mAeglU26P8zYMe7KUDLE0', NULL),
	(12, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDk2MTI4NzR9.XRBprrfZKwap4wiUBGVb1EBnPqErO-Xmx136wnffb08', NULL),
	(13, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDk2MTI5OTd9.20OV-Vsu7I_fzYHKLjDZ1zbd4y5-9uXPIis67R7Vs4I', NULL),
	(14, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDk2MTMwMjR9.Z7bfzFGNWtK_H9-3lgVuZiF7EqbcmVnc7LgOk0WXCIc', NULL),
	(15, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDk2MTMyMzl9.qPZIZrCjPxSYCBZ6XCiTvhXfL07hxBZuLlSoLH0DBfk', NULL),
	(16, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDk2MTQ1NDd9.7EWhBkNEXhADl5lxF_oXlRrYK-KUqH3985iUF686-W8', NULL),
	(17, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTExNDQ5NzR9.A8hSRn0m754_rocqfl_EkDkkRtJeP37XkgaETv-Pibg', NULL),
	(18, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTExNDY5OTZ9.kMQASTAjseXQ7DwWpSMaGo0jiubOS3e4lbnhe5B_PoI', NULL),
	(19, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTExNDgwODh9.zVLJ6ls8mWT9LayW076ArIZG0JrbEaWl36NkjDaSTIM', NULL),
	(20, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTExNDg5OTF9.VHG5tYK-XEBcCLuG7HKUxhOuNqTmNgT1KSMWoF5iNDk', NULL),
	(21, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTEyMDg0MDB9._41l16B2u6aEfoDUrDPpybqgYU04x8i6WG3ILZ5tYfY', NULL),
	(22, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTE1NzgwMzh9.x1hl4l-6N5H1hi63jssorHCAaOROh0zoCuICD69S6eg', NULL),
	(23, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTIxODYzNzF9.5gURDkEFf51V39BZUzInbus9X0EH1GvBWWOPwzE0V2Q', NULL),
	(24, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTIzNDE3NTR9.YuKndQwX14HPnxBLM7NZShj_pTeg1j7E0lW9HTjgQUo', NULL),
	(25, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTI2MzI0NTB9.A-orCput20n69DS9HbMVYcNIrVDGY1rzRQ4NNLs02ms', NULL),
	(26, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTI2Mzc3NTJ9.f1c-I2YFmDa_qbZKxzYu9dJmhAATNxkhd8csC1AFHQ0', NULL),
	(27, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTQxODQ5OTh9.nrN9meKZfpubp3M7bmjn7Mjwvv41lMEDRNKUr4tIRXY', NULL),
	(28, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTUyOTYzOTZ9.fSqZbnQ5BMrb1A7fDLFLdijOnIkcVHW4G_bLeaEGihU', NULL),
	(29, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTU0NDE4NDR9.RX9Oj_MvdJWCxUGR3k6gMppm7QHOKhZYKcwIOvgev4Q', NULL),
	(30, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTU0NDE4NDR9.RX9Oj_MvdJWCxUGR3k6gMppm7QHOKhZYKcwIOvgev4Q', NULL),
	(31, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTU0NDE4NDR9.RX9Oj_MvdJWCxUGR3k6gMppm7QHOKhZYKcwIOvgev4Q', NULL),
	(32, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTU0NDE4NDR9.RX9Oj_MvdJWCxUGR3k6gMppm7QHOKhZYKcwIOvgev4Q', NULL),
	(33, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTU0NDE4NDR9.RX9Oj_MvdJWCxUGR3k6gMppm7QHOKhZYKcwIOvgev4Q', NULL),
	(34, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTU0NDE4NDR9.RX9Oj_MvdJWCxUGR3k6gMppm7QHOKhZYKcwIOvgev4Q', NULL),
	(35, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTU0NDE4NDR9.RX9Oj_MvdJWCxUGR3k6gMppm7QHOKhZYKcwIOvgev4Q', NULL),
	(36, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTU0NDE4NDR9.RX9Oj_MvdJWCxUGR3k6gMppm7QHOKhZYKcwIOvgev4Q', NULL),
	(37, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTU0NDE4NDR9.RX9Oj_MvdJWCxUGR3k6gMppm7QHOKhZYKcwIOvgev4Q', NULL),
	(38, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTU0NDE4NDR9.RX9Oj_MvdJWCxUGR3k6gMppm7QHOKhZYKcwIOvgev4Q', NULL),
	(39, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTU0NDE4NDR9.RX9Oj_MvdJWCxUGR3k6gMppm7QHOKhZYKcwIOvgev4Q', NULL),
	(40, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTU0NDE4NDR9.RX9Oj_MvdJWCxUGR3k6gMppm7QHOKhZYKcwIOvgev4Q', NULL),
	(41, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTU0NDE4NDR9.RX9Oj_MvdJWCxUGR3k6gMppm7QHOKhZYKcwIOvgev4Q', NULL),
	(42, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTU0NDE4NDR9.RX9Oj_MvdJWCxUGR3k6gMppm7QHOKhZYKcwIOvgev4Q', NULL),
	(43, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTU0NDE4NDR9.RX9Oj_MvdJWCxUGR3k6gMppm7QHOKhZYKcwIOvgev4Q', NULL),
	(44, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTU0NDE4NDR9.RX9Oj_MvdJWCxUGR3k6gMppm7QHOKhZYKcwIOvgev4Q', NULL),
	(45, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTU0NDE4NDR9.RX9Oj_MvdJWCxUGR3k6gMppm7QHOKhZYKcwIOvgev4Q', NULL),
	(46, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTU0NDE4NDR9.RX9Oj_MvdJWCxUGR3k6gMppm7QHOKhZYKcwIOvgev4Q', NULL),
	(47, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTU0NDI4ODR9.30zv2YPOpo-O8UMfNp9qehN2aXjwXcQxaKWBqI1DaFE', NULL),
	(48, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTU0NDQyNjl9.uzt7igZ8bVTA5zxL0CYr5gbC-SEIVNXertg8ebNQN0Y', NULL),
	(49, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTU0NTM2MzV9.xQeP_NR0L1ufy2WetfyL4r07ywRBaQg5CfcDjZ4388g', NULL),
	(50, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTYyMTg5MzN9.miW3wWBfPS0hgPetSSloaZB5vIiJMDHzMQ1VCEwliCk', NULL),
	(51, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTY4MTA0Mjh9.tKRN_VtQviGxHHFBsDt89CaPbwAjBjUXu7UpksVW9q8', NULL),
	(52, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTY4MTA1Mjh9.suUevmzxsIUvW52nBHcUVDvVb09ERjC79QB3O1K2x7A', NULL),
	(53, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTY4MTA1NjJ9.tLSnok_o7pwSbg1YtkcwOyw-WaIe7AwSzKnOVizVjDk', NULL),
	(54, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTY4MTA1ODR9.k7GunHYP6zVMGK5Rvf1zfLtLFXRJgusfCG_iEKeG5GM', NULL),
	(55, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTY4MTA2MzJ9.KMoQ88m5ldwW8BjHRiMCYG5Jcusa6KF6dSC_0sJZ_aw', NULL),
	(56, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTY4MTA4MDd9.W9ODZTNe_4gs0CaB3h2wBJXkiMYEO62zbzk-UboNohg', NULL),
	(57, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTY4MTA4Mzl9._vslpK_i-ePnRfuOI3I9jwl-kOTmj1Vm0RRiC8Gw6zM', NULL),
	(58, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTY4MTA5Mjd9.-KBi6pQUpxebLWCtfX4FBTe9EwS7W9Mp8aVhUbL4lVI', NULL),
	(59, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTY4MTA5OTR9.jRWCza3VyKQK-PqBl2oVFTZpHEWW650dphZDvuGJ7vk', NULL),
	(60, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTY4MTEwNTN9.K5EDHkc0bUOT-pxB94Lf1xfLcCWFMs2XsRZJMnS69IY', NULL),
	(61, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTY4MTExMTV9.0eU7PLRFf7BklcdG6cKlh2ZcYd0B_gT5dgzVhTS6TfE', NULL),
	(62, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTY4MTExMzV9.L5BrLr9y1qUwtc-jpO68ZIbjQtVBmZZ2upIsx0YZNug', NULL),
	(63, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTY4MTE0MTN9.GoM-PtRw4gCUyW1KMY_Wfh77Dbmm37c3Vp1RZQnehqo', NULL),
	(64, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTY4MTE0MzR9.W2wZk9JuLQuguOgtm2fZezb6pgsYFKHRtmkq0H4RYoI', NULL),
	(65, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTY4MTE0NzJ9.kGSbPMLVshIKbbjqS8saNlCmmDBVKgViCfgJ_tR1p2I', NULL),
	(66, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTY4MTE3MjN9.yRmyeqFep1pImoNz2yKpE_rVtShrsBn9CEjarS7-cu8', NULL),
	(67, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTY4MTIwMTF9.dJdWH0-Ggxv9AOA27fVJHThjQ6UQIQndg1XaUfSCZQQ', NULL),
	(68, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTY4MTIwMTd9.VCf4Q-rdHv1rVHCsGRblY9XdkbdyPOCGV0lY96AMw2Q', NULL),
	(69, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTY4MTI4NDZ9.T56EcX7BzSXT030WC65mMqNzdgxTY5NM57zR8LijD5c', NULL),
	(70, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTY4MTI5MTN9.t-IRv6EHRdT68hCy6_QabyTQ9Nut1I8AImaa97akrU0', NULL),
	(71, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTY4MTI5ODR9.rtvG1CKai0MKPbRmzbPWH72o5wDpM-jNiArATz055nE', NULL),
	(72, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTY4MTMyNjB9.L7_-GTZWqqLydO9h5O2XxdEmZcugaxB7HtpWmGsfZ-o', NULL),
	(73, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTY4MTMzMDV9.P4miibtXbs8tnlZMdW9g-A340wqZc4qsQT9Ug7wQ5WM', NULL),
	(74, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTY4MTM3MjZ9.pWVXA1OO-xRnFvlHmIavceWU-UDLmSdjaHc-7D8ANXs', NULL),
	(75, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTY4MTQ0NTZ9.ijoNkVU0K_k4ZszGevQqmn9dg2ealNTcoL8R19xhOX0', NULL),
	(76, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTgyNTMzNTJ9.o9cxoE1HYdFykp1_W5DlvjhmByG834HK74tNN0ooGwc', NULL),
	(77, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTgyNTM2NjZ9.ONbhvI8IutzaiBJVYxABV0RthmEr4Nb39ewKBG5YA38', NULL),
	(78, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTgyNTQwNDB9.h-VSslawh8wssmHNlwHkHXXcjo0l_SiPmYGBbkNOaTA', NULL),
	(79, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTgyNTQ1MzZ9.ht8WCw62FdrSNyOiGW4cacKsS32R3V-YalnT_PwSa60', NULL),
	(80, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTgyNTUwMjF9.BMcKM6fa_1ZiwoC3HyaTSRu8jY4WBBhFkbXZPe4J8G0', NULL),
	(81, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTgyNTczMzZ9.sCjmWGdwVlrLI3ctrvlcWFoK02yZ_ICi2ubrZ9Pd_nU', NULL),
	(82, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTgyNTc3NzF9.QYGBkaxQJnC_xh5reOHcBZ_2gVnuG8ejyyV57kuQT3s', NULL),
	(83, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTgyNTg2NzB9.XTdL1lSAf1pgNs-zzS79zElEPPJBeP8hQ2t0Ax67ZmQ', NULL),
	(84, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTgyNTkyMTh9.LecwqpGwdFw3pO6bHgAvJ8-YWV_VbxH86i4yfx5grQU', NULL),
	(85, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTgyNTk5OTZ9.Eermp3gBoau9dXDODBc_k7JlhV6zMWklNvvLfomt2E8', NULL),
	(86, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTgyNjA0NjR9.vrNRJDMoHI3kM1TfA1xYNF9QgLGNka0U3XP5yzjxfGE', NULL),
	(87, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTgyNjIyMzV9.yhrFR7cyWKrBoI3tNc_4dGetKAYvFR_Val9q5ZOrrj4', NULL),
	(88, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTg2NjQ0NzR9.qoVrv7ider2GScGIQx2PupdZKvQ3XT9hAZzIlnDqKfA', NULL),
	(89, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTg2Njc2Nzd9.bpUwLUlf2mNDBT2-A1EyiyoIergnqaJkl65jV1Cto0M', NULL),
	(90, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTg2NzA4Nzh9.FsVs-0BqCKFihTfVZQngu-snYRLTG3dDX9iyMJkfyJ8', NULL),
	(91, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTg2NzA5ODF9.iHs1c4xgi1PnkQ6vRdtRpsamt7zBoJo0hEVZU1DY-fY', NULL),
	(92, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjI4MjI2Njd9.HMbukLP3EAJ9CikSMRJ8qGyazTpFjMrY6xqfLq-ml5E', NULL),
	(93, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjI4MjU1ODJ9.Px36d89AAdODs_MFMXcoGxIEZhVPT1PlwEKSzAIV-vc', NULL),
	(94, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjMyNTI5MjN9.8HJfC9wZtbS3yMNDwmMw947T3rnSvwKBuQFoYFmjea0', NULL),
	(95, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjMzMjMzOTh9.eGCoITz4iml52QkjnJlfdaA02dMd1Is7IYs-qpTbztM', NULL),
	(96, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjMzMjY1MDN9.EoaIbMdIju0TTzaxTomo2_rdEadSF1nYdE251Pg0-X0', NULL),
	(97, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjM5NDMyNzN9.XnDUBFwr80fLq5lWAGTERqYTIDJeK74cQoMhG-DLdcA', NULL),
	(98, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjQwOTk1Njd9.mulwoT17GSplADaLjMq7UJC8YHpJB82YlkOqUuGuG2U', NULL),
	(99, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjQxMDg5MTV9.s595slTCp_-6nqEsoXlMPpHoQgGRrFTZTUjDi2gxHdY', NULL),
	(100, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjQxMDg5OTN9.5s3dH0Cb5p-I1Ba6CHo87pbCTgW51pBW3QbxawGHkH8', NULL),
	(101, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjQxMDkwMzd9.JY_-_esUVbEaKYJZcLtoC5bp-XkHQ49ewERQ9z9GgCY', NULL),
	(102, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjQxMDk0MTF9.XvxYKLN7lIeysTP43V2t_rmKa0erXH_HtYSl7cc9XtY', NULL),
	(103, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjQxMTA0MTJ9.ZK3eoiYZXqj94N0hPmatAGIIMY2QO7eyBuRpPiaAvGU', NULL),
	(104, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjQxMTIzNjR9.Km0lQLTOp5sZyuLvYadGIXERXj765YSQky1cw_gXO5w', NULL),
	(105, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjQxMTY0Njh9._Is8_2gADbfbYHzSDJftLB2eWxdOgJQjH0N9R8Fq4fw', NULL),
	(106, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjQyMDI5MjZ9.yX1DAUb3E1gwoEGi--uZN5-rpEd6LjYuSf21AEYThUA', NULL),
	(107, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjQ2NDA2Nzl9.tUxidOEog7EzCaM12kVImO6rYC2kdLKgj0Jf91gRAKc', NULL);

-- Volcando estructura para tabla minimercad2.users
CREATE TABLE IF NOT EXISTS `users` (
  `id_usuario_cliente` int DEFAULT NULL,
  `id_usuario_personal` int DEFAULT NULL,
  `nombre_usuario` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `contraseña` longtext COLLATE utf8mb4_spanish_ci NOT NULL,
  UNIQUE KEY `nombre_usuario` (`nombre_usuario`),
  KEY `id_usuario` (`id_usuario_cliente`) USING BTREE,
  KEY `id-usuario_personal` (`id_usuario_personal`) USING BTREE,
  CONSTRAINT `FK_users_cliente` FOREIGN KEY (`id_usuario_cliente`) REFERENCES `cliente` (`id_cliente`),
  CONSTRAINT `FK_users_personal` FOREIGN KEY (`id_usuario_personal`) REFERENCES `personal` (`id_personal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- Volcando datos para la tabla minimercad2.users: ~7 rows (aproximadamente)
INSERT INTO `users` (`id_usuario_cliente`, `id_usuario_personal`, `nombre_usuario`, `contraseña`) VALUES
	(NULL, 2, 'ed', 'kljkljk'),
	(NULL, 8, 'juant', '$2b$10$zN8m7mQkXicV3hr0sX93cODi37R7OSkMcIfU.yOZO9HYvHbvomqDK'),
	(2, NULL, 'jucha', 'ljklj'),
	(3, NULL, 'leomes', 'jkljk'),
	(NULL, 3, 'maqui', 'hola'),
	(NULL, 7, 'maqui2807', '$2b$10$faHKAxS6pvnfRmyYy83j1.CYv9gqbMQUfPROIf8MEb421DlnB4uuq'),
	(NULL, 1, 'pedrinchi', 'jkkljk');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
