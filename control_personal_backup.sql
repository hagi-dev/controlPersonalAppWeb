-- MySQL dump 10.13  Distrib 5.7.44, for Linux (x86_64)
--
-- Host: localhost    Database: control_personal
-- ------------------------------------------------------
-- Server version	5.7.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `contrato`
--

DROP TABLE IF EXISTS `contrato`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contrato` (
  `CON_id` int(11) NOT NULL AUTO_INCREMENT,
  `CON_fecha_inn` date DEFAULT NULL,
  `CON_fehcha_out` date DEFAULT NULL,
  `CON_estado` char(1) DEFAULT NULL,
  `PER_id` int(11) NOT NULL,
  PRIMARY KEY (`CON_id`),
  KEY `FK_PER_id2` (`PER_id`),
  CONSTRAINT `FK_PER_id2` FOREIGN KEY (`PER_id`) REFERENCES `personal` (`PER_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contrato`
--

LOCK TABLES `contrato` WRITE;
/*!40000 ALTER TABLE `contrato` DISABLE KEYS */;
/*!40000 ALTER TABLE `contrato` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contrato_horario`
--

DROP TABLE IF EXISTS `contrato_horario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contrato_horario` (
  `CON_id` int(11) NOT NULL,
  `HOR_id` int(11) NOT NULL,
  PRIMARY KEY (`CON_id`,`HOR_id`),
  KEY `FK_HOR_id` (`HOR_id`),
  CONSTRAINT `FK_CON_id5` FOREIGN KEY (`CON_id`) REFERENCES `contrato` (`CON_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_HOR_id` FOREIGN KEY (`HOR_id`) REFERENCES `horario` (`HOR_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contrato_horario`
--

LOCK TABLES `contrato_horario` WRITE;
/*!40000 ALTER TABLE `contrato_horario` DISABLE KEYS */;
/*!40000 ALTER TABLE `contrato_horario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `horario`
--

DROP TABLE IF EXISTS `horario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `horario` (
  `HOR_id` int(11) NOT NULL AUTO_INCREMENT,
  `HOR_detalle` varchar(100) DEFAULT NULL,
  `HOR_entrada` time DEFAULT NULL,
  `HOR_salida` time DEFAULT NULL,
  `HOR_receso_inn` time DEFAULT NULL,
  `HOR_receso_out` time DEFAULT NULL,
  `Hor_estado` char(1) DEFAULT NULL,
  `Hor_dirigido` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`HOR_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `horario`
--

LOCK TABLES `horario` WRITE;
/*!40000 ALTER TABLE `horario` DISABLE KEYS */;
INSERT INTO `horario` VALUES (1,'Horario completo','09:00:00','18:00:00','13:00:00','14:00:00','1','user');
/*!40000 ALTER TABLE `horario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `huella`
--

DROP TABLE IF EXISTS `huella`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `huella` (
  `HUE_id` int(11) NOT NULL AUTO_INCREMENT,
  `HUE_huella` varchar(250) NOT NULL,
  `PER_id` int(11) NOT NULL,
  PRIMARY KEY (`HUE_id`),
  KEY `FK_PER_id` (`PER_id`),
  CONSTRAINT `FK_PER_id` FOREIGN KEY (`PER_id`) REFERENCES `personal` (`PER_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `huella`
--

LOCK TABLES `huella` WRITE;
/*!40000 ALTER TABLE `huella` DISABLE KEYS */;
/*!40000 ALTER TABLE `huella` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jornada_laboral`
--

DROP TABLE IF EXISTS `jornada_laboral`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jornada_laboral` (
  `JLAB_id` int(11) NOT NULL AUTO_INCREMENT,
  `JLAB_fecha` date DEFAULT NULL,
  `JLAB_observacion` varchar(45) DEFAULT NULL,
  `JLAB_asistencia` char(1) DEFAULT NULL,
  `CON_id` int(11) NOT NULL,
  PRIMARY KEY (`JLAB_id`,`CON_id`),
  KEY `FK_CON_id` (`CON_id`),
  CONSTRAINT `FK_CON_id` FOREIGN KEY (`CON_id`) REFERENCES `contrato` (`CON_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jornada_laboral`
--

LOCK TABLES `jornada_laboral` WRITE;
/*!40000 ALTER TABLE `jornada_laboral` DISABLE KEYS */;
/*!40000 ALTER TABLE `jornada_laboral` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nivel_sancion`
--

DROP TABLE IF EXISTS `nivel_sancion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nivel_sancion` (
  `NSA_id` int(11) NOT NULL AUTO_INCREMENT,
  `NSA_descripcion` varchar(50) DEFAULT NULL,
  `NSA_nivel` char(1) DEFAULT NULL,
  PRIMARY KEY (`NSA_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nivel_sancion`
--

LOCK TABLES `nivel_sancion` WRITE;
/*!40000 ALTER TABLE `nivel_sancion` DISABLE KEYS */;
/*!40000 ALTER TABLE `nivel_sancion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permiso`
--

DROP TABLE IF EXISTS `permiso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permiso` (
  `PER_id` int(11) NOT NULL AUTO_INCREMENT,
  `PER_detalle` varchar(200) DEFAULT NULL,
  `PER_fecha` date DEFAULT NULL,
  `PER_estado` char(1) DEFAULT NULL,
  `CON_id` int(11) NOT NULL,
  PRIMARY KEY (`PER_id`),
  KEY `FK_CON_id3` (`CON_id`),
  CONSTRAINT `FK_CON_id3` FOREIGN KEY (`CON_id`) REFERENCES `contrato` (`CON_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permiso`
--

LOCK TABLES `permiso` WRITE;
/*!40000 ALTER TABLE `permiso` DISABLE KEYS */;
/*!40000 ALTER TABLE `permiso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal`
--

DROP TABLE IF EXISTS `personal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `personal` (
  `PER_id` int(11) NOT NULL AUTO_INCREMENT,
  `PER_dni` char(8) NOT NULL,
  `PER_nombre` varchar(100) DEFAULT NULL,
  `PER_apaterno` varchar(45) DEFAULT NULL,
  `PER_amaterno` varchar(45) DEFAULT NULL,
  `PER_genero` char(1) DEFAULT NULL,
  `PER_fec_nacimiento` date DEFAULT NULL,
  `PER_foto` varchar(250) DEFAULT NULL,
  `PER_direccion` varchar(45) DEFAULT NULL,
  `PER_estado` tinyint(1) DEFAULT '1',
  `PER_contrasena` varchar(200) DEFAULT NULL,
  `PER_correo` varchar(100) NOT NULL,
  `TTR_id` int(11) NOT NULL,
  `PER_telefono` varchar(9) DEFAULT NULL,
  PRIMARY KEY (`PER_id`),
  UNIQUE KEY `PER_dni_UNIQUE` (`PER_dni`),
  UNIQUE KEY `PER_correo_UNIQUE` (`PER_correo`),
  KEY `FK_TTR_id` (`TTR_id`),
  CONSTRAINT `FK_TTR_id` FOREIGN KEY (`TTR_id`) REFERENCES `tipo_trabajador` (`TTR_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal`
--

LOCK TABLES `personal` WRITE;
/*!40000 ALTER TABLE `personal` DISABLE KEYS */;
INSERT INTO `personal` VALUES (1,'12345678','Juan','Pérez','González','M','1990-01-01','https://example.com/foto.jpg','Calle Falsa 123',1,'12345678','juan.perez@example.com',1,'123456789'),(4,'12345679','Juana','Pérez','González','M','1990-01-01','https://example.com/foto.jpg','Calle Falsa 123',1,'12345679','juana.perez@example.com',1,'123456783'),(5,'70609289','jako mujerzuela','Diaz','Lopez','F','2000-02-10','sdfcreghtukiyjthgrfedsfgrygt','jr . tupac amaru 511 caraz',1,'70609289','jako.dele@gmail.com',2,'978765656'),(6,'12345674','Hagi','Torres','Macedo','M','1995-02-11','sdfcreghtukiyjthgrfedsfgrygt','huaraz peru',1,'12345674','hagiraitorresmacedo@gmail.com',1,'973159686'),(8,'54543434','jako','dele ','huevo','F','2000-10-16','sdfcreghtukiyjthgrfedsfgrygt','jrt tupac amaru 511 caraz',1,'54543434','jalzx-deleo@gmail.com',2,'909878767');
/*!40000 ALTER TABLE `personal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registro_entrada`
--

DROP TABLE IF EXISTS `registro_entrada`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `registro_entrada` (
  `REGE_id` int(11) NOT NULL AUTO_INCREMENT,
  `REGE_hora_inn` time DEFAULT NULL,
  `REGE_justificacion` char(1) DEFAULT NULL,
  `JLAB_id` int(11) NOT NULL,
  `CON_id` int(11) NOT NULL,
  PRIMARY KEY (`REGE_id`),
  KEY `FK_REG` (`JLAB_id`,`CON_id`),
  CONSTRAINT `FK_REG` FOREIGN KEY (`JLAB_id`, `CON_id`) REFERENCES `jornada_laboral` (`JLAB_id`, `CON_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registro_entrada`
--

LOCK TABLES `registro_entrada` WRITE;
/*!40000 ALTER TABLE `registro_entrada` DISABLE KEYS */;
/*!40000 ALTER TABLE `registro_entrada` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sancion`
--

DROP TABLE IF EXISTS `sancion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sancion` (
  `CON_id` int(11) NOT NULL,
  `NSA_id` int(11) NOT NULL,
  `SAN_detalle` varchar(250) DEFAULT NULL,
  `SAN_absolucion` char(1) DEFAULT NULL,
  `SAN_estado` char(1) DEFAULT NULL,
  PRIMARY KEY (`CON_id`,`NSA_id`),
  KEY `FK_NSA_id` (`NSA_id`),
  CONSTRAINT `FK_CON_id4` FOREIGN KEY (`CON_id`) REFERENCES `contrato` (`CON_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_NSA_id` FOREIGN KEY (`NSA_id`) REFERENCES `nivel_sancion` (`NSA_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sancion`
--

LOCK TABLES `sancion` WRITE;
/*!40000 ALTER TABLE `sancion` DISABLE KEYS */;
/*!40000 ALTER TABLE `sancion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_trabajador`
--

DROP TABLE IF EXISTS `tipo_trabajador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo_trabajador` (
  `TTR_id` int(11) NOT NULL AUTO_INCREMENT,
  `TTR_descripcion` varchar(50) DEFAULT NULL,
  `TTR_estado` char(1) DEFAULT NULL,
  PRIMARY KEY (`TTR_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_trabajador`
--

LOCK TABLES `tipo_trabajador` WRITE;
/*!40000 ALTER TABLE `tipo_trabajador` DISABLE KEYS */;
INSERT INTO `tipo_trabajador` VALUES (1,'admin','1'),(2,'user','1');
/*!40000 ALTER TABLE `tipo_trabajador` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-11  5:15:38
