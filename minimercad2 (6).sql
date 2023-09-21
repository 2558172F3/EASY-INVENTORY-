-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-09-2023 a las 01:49:00
-- Versión del servidor: 8.0.34
-- Versión de PHP: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `minimercad2`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `ID_Categoria` int NOT NULL,
  `Nombre` char(50) COLLATE utf8mb4_spanish_ci NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci COMMENT='Entidad de las categorias de los productos';

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`ID_Categoria`, `Nombre`) VALUES
(5, 'lacteos'),
(6, 'carnicos'),
(7, 'cereales'),
(8, 'aseo'),
(9, 'verduras');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `id_cliente` int NOT NULL,
  `nombre` varchar(30) COLLATE utf8mb4_spanish_ci NOT NULL,
  `apellidos` varchar(30) COLLATE utf8mb4_spanish_ci NOT NULL,
  `telefono` varchar(12) COLLATE utf8mb4_spanish_ci NOT NULL,
  `correo` varchar(40) COLLATE utf8mb4_spanish_ci NOT NULL,
  `ciudad` varchar(30) COLLATE utf8mb4_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`id_cliente`, `nombre`, `apellidos`, `telefono`, `correo`, `ciudad`) VALUES
(1, 'juan bautista ', 'chabadu', '3213152', 'mmasjk@', 'bogota'),
(2, 'antonio ', 'pereira', '3153235', '542165551@', 'bogota'),
(3, 'leonel', 'messi', '3182035', 'asfsdvf@', 'bogota'),
(4, 'james ', 'rodriguez', '3135218515', 'srfgrd@sd', 'ibague'),
(5, 'juan martin', 'del potro', '6513215', 'sresdc@ssd', 'bogota');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura`
--

CREATE TABLE `factura` (
  `ID_Factura` int NOT NULL,
  `ID_User_Vendedor` int NOT NULL,
  `ID_User_Cliente` int NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `factura`
--

INSERT INTO `factura` (`ID_Factura`, `ID_User_Vendedor`, `ID_User_Cliente`, `fecha`) VALUES
(1, 2, 4, '2023-09-20'),
(2, 3, 5, '2023-09-11'),
(3, 2, 1, '2023-09-13'),
(4, 3, 3, '2023-09-19'),
(5, 3, 2, '2023-09-20');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal`
--

CREATE TABLE `personal` (
  `id_personal` int NOT NULL,
  `rol` int DEFAULT NULL,
  `nombre` varchar(30) COLLATE utf8mb4_spanish_ci NOT NULL,
  `apellidos` varchar(30) COLLATE utf8mb4_spanish_ci NOT NULL,
  `telefono` varchar(12) COLLATE utf8mb4_spanish_ci NOT NULL,
  `correo` varchar(40) COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `personal`
--

INSERT INTO `personal` (`id_personal`, `rol`, `nombre`, `apellidos`, `telefono`, `correo`) VALUES
(1, 4, 'pedro', 'de jesus', '3135215', 'dcslnvkfjb@svff'),
(2, 3, 'edgar', 'san martin', '145312321', 'mksd@ajshb'),
(3, 3, 'miguel', 'quiroga', '321513211', 'mljkahb@nijsdbh'),
(4, 2, 'claudia', 'duran', '3213513285', 'xdsdv@aksxbans'),
(5, 2, 'juan', 'quiroga', '3151351', 'sdbhvbjd@kanksj'),
(6, 3, 'elvia', 'britto', '323', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `ID_Producto` int NOT NULL,
  `ID_Categoria` int NOT NULL,
  `Nombre` char(50) COLLATE utf8mb4_spanish_ci NOT NULL DEFAULT '',
  `Precio` float NOT NULL DEFAULT '0',
  `Cantidad` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci COMMENT='entdad de los productos en el minimercado';

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`ID_Producto`, `ID_Categoria`, `Nombre`, `Precio`, `Cantidad`) VALUES
(2, 5, 'leche', 2000, 50),
(3, 6, 'carne de cerdo', 5500, 100),
(4, 8, 'jabon rey', 2000, 500),
(5, 9, 'tomates', 500, 500),
(6, 7, 'arroz', 2100, 300);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto_factura`
--

CREATE TABLE `producto_factura` (
  `id_producto` int DEFAULT NULL,
  `id_factura` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `producto_factura`
--

INSERT INTO `producto_factura` (`id_producto`, `id_factura`) VALUES
(6, 1),
(3, 1),
(5, 1),
(4, 2),
(2, 3),
(6, 5),
(2, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `ID_Rol` int NOT NULL,
  `Nombre` char(50) COLLATE utf8mb4_spanish_ci NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci COMMENT='Roles de los usuarios en el sistema';

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`ID_Rol`, `Nombre`) VALUES
(1, 'cliente'),
(2, 'proveedores'),
(3, 'cajero'),
(4, 'administrador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sucursal`
--

CREATE TABLE `sucursal` (
  `ID_Sucursal` int NOT NULL,
  `Ciudad` char(50) COLLATE utf8mb4_spanish_ci NOT NULL DEFAULT '',
  `Direccion` char(50) COLLATE utf8mb4_spanish_ci NOT NULL DEFAULT '',
  `Telefono` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci COMMENT='Entidad de las sucursales';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sucursal_producto`
--

CREATE TABLE `sucursal_producto` (
  `ID_Sucursal` int DEFAULT NULL,
  `ID_Producto` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci COMMENT='Entidad intermedia entre Sucursal y Productos';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id_usuario_cliente` int DEFAULT NULL,
  `id_usuario_personal` int DEFAULT NULL,
  `nombre_usuario` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `contraseña` blob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id_usuario_cliente`, `id_usuario_personal`, `nombre_usuario`, `contraseña`) VALUES
(NULL, 2, 'ed', 0x6a3cc5e052316a8a84f012127fb9cb9a),
(2, NULL, 'jucha', 0xa6633528fe438fb4cae55d36877beed5),
(3, NULL, 'leomes', 0x21310bd37ebe44e2f11a5f32061558a1),
(NULL, 3, 'maqui', 0xbb0356082b28fa3f9a16387097a04979),
(NULL, 1, 'pedrinchi', 0x72cf95ec354a7c52d2933882a22839c1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`ID_Categoria`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id_cliente`) USING BTREE,
  ADD UNIQUE KEY `correo` (`correo`);

--
-- Indices de la tabla `factura`
--
ALTER TABLE `factura`
  ADD PRIMARY KEY (`ID_Factura`),
  ADD KEY `ID_User_Vendedor` (`ID_User_Vendedor`),
  ADD KEY `ID_User_Cliente` (`ID_User_Cliente`);

--
-- Indices de la tabla `personal`
--
ALTER TABLE `personal`
  ADD PRIMARY KEY (`id_personal`),
  ADD UNIQUE KEY `correo` (`correo`),
  ADD KEY `fk_personal_rol` (`rol`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`ID_Producto`),
  ADD KEY `ID_Categoria` (`ID_Categoria`);

--
-- Indices de la tabla `producto_factura`
--
ALTER TABLE `producto_factura`
  ADD KEY `fk_factura_profactura` (`id_factura`),
  ADD KEY `fk_producto_profactura` (`id_producto`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`ID_Rol`);

--
-- Indices de la tabla `sucursal`
--
ALTER TABLE `sucursal`
  ADD PRIMARY KEY (`ID_Sucursal`);

--
-- Indices de la tabla `sucursal_producto`
--
ALTER TABLE `sucursal_producto`
  ADD KEY `ID_Sucursal` (`ID_Sucursal`),
  ADD KEY `ID_Producto` (`ID_Producto`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD UNIQUE KEY `nombre_usuario` (`nombre_usuario`),
  ADD KEY `id_usuario` (`id_usuario_cliente`) USING BTREE,
  ADD KEY `id-usuario_personal` (`id_usuario_personal`) USING BTREE;

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `ID_Categoria` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id_cliente` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `factura`
--
ALTER TABLE `factura`
  MODIFY `ID_Factura` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `personal`
--
ALTER TABLE `personal`
  MODIFY `id_personal` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `ID_Producto` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `ID_Rol` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `factura`
--
ALTER TABLE `factura`
  ADD CONSTRAINT `fk_cliente_factura` FOREIGN KEY (`ID_User_Cliente`) REFERENCES `cliente` (`id_cliente`),
  ADD CONSTRAINT `fk_personal_factura` FOREIGN KEY (`ID_User_Vendedor`) REFERENCES `personal` (`id_personal`);

--
-- Filtros para la tabla `personal`
--
ALTER TABLE `personal`
  ADD CONSTRAINT `fk_personal_rol` FOREIGN KEY (`rol`) REFERENCES `rol` (`ID_Rol`);

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `FK_producto_categoria` FOREIGN KEY (`ID_Categoria`) REFERENCES `categoria` (`ID_Categoria`);

--
-- Filtros para la tabla `producto_factura`
--
ALTER TABLE `producto_factura`
  ADD CONSTRAINT `fk_factura_profactura` FOREIGN KEY (`id_factura`) REFERENCES `factura` (`ID_Factura`),
  ADD CONSTRAINT `fk_producto_profactura` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`ID_Producto`);

--
-- Filtros para la tabla `sucursal_producto`
--
ALTER TABLE `sucursal_producto`
  ADD CONSTRAINT `FK2_producto` FOREIGN KEY (`ID_Producto`) REFERENCES `producto` (`ID_Producto`),
  ADD CONSTRAINT `FK__sucursal` FOREIGN KEY (`ID_Sucursal`) REFERENCES `sucursal` (`ID_Sucursal`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `FK_users_cliente` FOREIGN KEY (`id_usuario_cliente`) REFERENCES `cliente` (`id_cliente`),
  ADD CONSTRAINT `FK_users_personal` FOREIGN KEY (`id_usuario_personal`) REFERENCES `personal` (`id_personal`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
