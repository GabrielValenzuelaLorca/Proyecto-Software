CREATE DATABASE  IF NOT EXISTS `Sada_DB` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `Sada_DB`;
-- MySQL dump 10.13  Distrib 5.5.49, for debian-linux-gnu (x86_64)
--
-- Host: 127.0.0.1    Database: Sada_DB
-- ------------------------------------------------------
-- Server version	5.5.49-0ubuntu0.14.04.1

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
  `ramo_idRamo` int(11) NOT NULL,
  `usuario_Rut` int(11) NOT NULL,
  PRIMARY KEY (`ramo_idRamo`,`usuario_Rut`),
  KEY `fk_ramo_has_usuario_usuario1_idx` (`usuario_Rut`),
  KEY `fk_ramo_has_usuario_ramo1_idx` (`ramo_idRamo`),
  CONSTRAINT `fk_ramo_has_usuario_ramo1` FOREIGN KEY (`ramo_idRamo`) REFERENCES `ramo` (`idRamo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_ramo_has_usuario_usuario1` FOREIGN KEY (`usuario_Rut`) REFERENCES `usuario` (`Rut`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contrato`
--

LOCK TABLES `contrato` WRITE;
/*!40000 ALTER TABLE `contrato` DISABLE KEYS */;
/*!40000 ALTER TABLE `contrato` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ensamblaje`
--

DROP TABLE IF EXISTS `ensamblaje`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ensamblaje` (
  `Plantilla_idPlantilla` int(11) NOT NULL,
  `Modulo_idModulo` int(11) NOT NULL,
  `Columna` int(11) NOT NULL,
  `Posicion` int(11) NOT NULL,
  CONSTRAINT `fk_Plantilla_has_Modulo_Modulo1` FOREIGN KEY (`Modulo_idModulo`) REFERENCES `modulo` (`idModulo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Plantilla_has_Modulo_Plantilla1` FOREIGN KEY (`Plantilla_idPlantilla`) REFERENCES `plantilla` (`idPlantilla`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ensamblaje`
--

LOCK TABLES `ensamblaje` WRITE;
/*!40000 ALTER TABLE `ensamblaje` DISABLE KEYS */;
/*!40000 ALTER TABLE `ensamblaje` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modulo`
--

DROP TABLE IF EXISTS `modulo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `modulo` (
  `idModulo` int(11) NOT NULL AUTO_INCREMENT,
  `Tipo` varchar(45) NOT NULL,
  `Informacion` varchar(4000) NOT NULL,
  `Unidad_idUnidad` int(11) NOT NULL,
  PRIMARY KEY (`idModulo`),
  KEY `fk_Modulo_Unidad1_idx` (`Unidad_idUnidad`),
  CONSTRAINT `fk_Modulo_Unidad1` FOREIGN KEY (`Unidad_idUnidad`) REFERENCES `unidad` (`idUnidad`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modulo`
--

LOCK TABLES `modulo` WRITE;
/*!40000 ALTER TABLE `modulo` DISABLE KEYS */;
INSERT INTO `modulo` VALUES (1,'texto','sdfda',1),(2,'video','https://www.youtube.com/embed/i79M4nKW1Ms',45),(3,'imagen','http://www.mundoperro.net/wp-content/uploads/consejos-perro-feliz-verano-400x300.jpg',1);
/*!40000 ALTER TABLE `modulo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `perfil`
--

DROP TABLE IF EXISTS `perfil`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `perfil` (
  `idperfil` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`idperfil`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perfil`
--

LOCK TABLES `perfil` WRITE;
/*!40000 ALTER TABLE `perfil` DISABLE KEYS */;
INSERT INTO `perfil` VALUES (1,'Adaptador'),(2,'Divergente'),(3,'Convergente'),(4,'Asimilador');
/*!40000 ALTER TABLE `perfil` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plantilla`
--

DROP TABLE IF EXISTS `plantilla`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `plantilla` (
  `idPlantilla` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(45) NOT NULL,
  `Valoracion` float(1) DEFAULT 0,
  `Conteo` int(11) DEFAULT 0,
  `perfil_idperfil` int(11) NOT NULL,
  `Unidad_idUnidad` int(11) NOT NULL,
  `Activo` int(1) NOT NULL DEFAULT 0,
  `Propuesta` int(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`idPlantilla`),
  UNIQUE KEY `Nombre_UNIQUE` (`Nombre`),
  KEY `fk_Plantilla_perfil1_idx` (`perfil_idperfil`),
  KEY `fk_Plantilla_Unidad1_idx` (`Unidad_idUnidad`),
  CONSTRAINT `fk_Plantilla_Unidad1` FOREIGN KEY (`Unidad_idUnidad`) REFERENCES `unidad` (`idUnidad`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Plantilla_perfil1` FOREIGN KEY (`perfil_idperfil`) REFERENCES `perfil` (`idperfil`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plantilla`
--

LOCK TABLES `plantilla` WRITE;
/*!40000 ALTER TABLE `plantilla` DISABLE KEYS */;
/*!40000 ALTER TABLE `plantilla` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ramo`
--

DROP TABLE IF EXISTS `ramo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ramo` (
  `idRamo` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(45) NOT NULL,
  `Sigla` varchar(10) NOT NULL,
  PRIMARY KEY (`idRamo`),
  UNIQUE KEY `Sigla_UNIQUE` (`Sigla`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ramo`
--

LOCK TABLES `ramo` WRITE;
/*!40000 ALTER TABLE `ramo` DISABLE KEYS */;
INSERT INTO `ramo` VALUES (1,'FISICA100','fis100'),(2,'FISICA110','fis110'),(3,'FISICA120','fis120'),(4,'FISICA130','fis130'),(5,'FISICA140','fis140');
/*!40000 ALTER TABLE `ramo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unidad`
--

DROP TABLE IF EXISTS `unidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `unidad` (
  `idUnidad` int(11) NOT NULL AUTO_INCREMENT,
  `Ramo_idRamo` int(11) NOT NULL,
  `Nombre` varchar(45) NOT NULL,
  `Descripcion` varchar(3000) DEFAULT NULL,
  PRIMARY KEY (`idUnidad`),
  KEY `fk_Unidad_Ramo1_idx` (`Ramo_idRamo`),
  CONSTRAINT `fk_Unidad_Ramo1` FOREIGN KEY (`Ramo_idRamo`) REFERENCES `ramo` (`idRamo`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unidad`
--

LOCK TABLES `unidad` WRITE;
/*!40000 ALTER TABLE `unidad` DISABLE KEYS */;
INSERT INTO `unidad` VALUES (1,3,'Voltaje','es el voltaje'),(2,3,'Resistencia','viv la resistance'),(45,3,'Global','probando');
/*!40000 ALTER TABLE `unidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `Rut` int(11) NOT NULL,
  `Rol` int(1) DEFAULT NULL,
  `Nombre` varchar(45) NOT NULL,
  `Correo` varchar(45) NOT NULL,
  `Clave` varchar(150) NOT NULL,
  `Profesor` int(1) NOT NULL,
  `Admin` int(1) NOT NULL,
  `perfil_idperfil` int(11) DEFAULT NULL,
  PRIMARY KEY (`Rut`),
  UNIQUE KEY `Correo_UNIQUE` (`Correo`),
  UNIQUE KEY `Rol_UNIQUE` (`Rol`),
  KEY `fk_usuario_perfil1_idx` (`perfil_idperfil`),
  CONSTRAINT `fk_usuario_perfil1` FOREIGN KEY (`perfil_idperfil`) REFERENCES `perfil` (`idperfil`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (123456789,NULL,'max','max@usm.cl','$2a$10$KZvc16XxlBtTNmlYklVW6uFghfAICRP4RVkH741amsEFOejNYgxQC',1,1,NULL);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

DROP TABLE IF EXISTS `valoracion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `valoracion` (
  `Plantilla_idPlantilla` int(11) NOT NULL,
  `usuario_Rut` int(11) NOT NULL,
  CONSTRAINT FOREIGN KEY (`Plantilla_idPlantilla`) REFERENCES `plantilla` (`idPlantilla`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-11-19  2:03:14
