-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: fisw
-- ------------------------------------------------------
-- Server version	5.7.14-log

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
-- Table structure for table `alumno`
--

CREATE DATABASE sada;
USE sada;
DROP TABLE IF EXISTS `alumno`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `alumno` (
  `Rol` int(11) NOT NULL,
  `Nombre` varchar(45) NOT NULL,
  `Correo` varchar(45) NOT NULL,
  `Clave` varchar(45) NOT NULL,
  `perfil_idperfil` int(11) DEFAULT NULL,
  PRIMARY KEY (`Rol`),
  UNIQUE KEY `Correo_UNIQUE` (`Correo`),
  UNIQUE KEY `Rol_UNIQUE` (`Rol`),
  KEY `fk_alumno_perfil_idx` (`perfil_idperfil`),
  CONSTRAINT `fk_alumno_perfil` FOREIGN KEY (`perfil_idperfil`) REFERENCES `perfil` (`idperfil`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumno`
--

LOCK TABLES `alumno` WRITE;
/*!40000 ALTER TABLE `alumno` DISABLE KEYS */;
/*!40000 ALTER TABLE `alumno` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contrato`
--

DROP TABLE IF EXISTS `contrato`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contrato` (
  `Profesor_Rut` int(11) NOT NULL,
  `Ramo_idRamo` int(11) NOT NULL,
  PRIMARY KEY (`Profesor_Rut`,`Ramo_idRamo`),
  KEY `fk_Profesor_has_Ramo_Ramo1_idx` (`Ramo_idRamo`),
  KEY `fk_Profesor_has_Ramo_Profesor1_idx` (`Profesor_Rut`),
  CONSTRAINT `fk_Profesor_has_Ramo_Profesor1` FOREIGN KEY (`Profesor_Rut`) REFERENCES `profesor` (`Rut`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Profesor_has_Ramo_Ramo1` FOREIGN KEY (`Ramo_idRamo`) REFERENCES `ramo` (`idRamo`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
  `Módulo_idMódulo` int(11) NOT NULL,
  PRIMARY KEY (`Plantilla_idPlantilla`,`Módulo_idMódulo`),
  KEY `fk_Plantilla_has_Módulo_Módulo1_idx` (`Módulo_idMódulo`),
  KEY `fk_Plantilla_has_Módulo_Plantilla1_idx` (`Plantilla_idPlantilla`),
  CONSTRAINT `fk_Plantilla_has_Módulo_Módulo1` FOREIGN KEY (`Módulo_idMódulo`) REFERENCES `módulo` (`idMódulo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Plantilla_has_Módulo_Plantilla1` FOREIGN KEY (`Plantilla_idPlantilla`) REFERENCES `plantilla` (`idPlantilla`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
-- Table structure for table `módulo`
--

DROP TABLE IF EXISTS `módulo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `módulo` (
  `idMódulo` int(11) NOT NULL AUTO_INCREMENT,
  `Tipo` varchar(45) NOT NULL,
  `Información` varchar(4000) NOT NULL,
  `Unidad_idUnidad` int(11) NOT NULL,
  PRIMARY KEY (`idMódulo`),
  UNIQUE KEY `idMódulo_UNIQUE` (`idMódulo`),
  KEY `fk_Módulo_Unidad1_idx` (`Unidad_idUnidad`),
  CONSTRAINT `fk_Módulo_Unidad1` FOREIGN KEY (`Unidad_idUnidad`) REFERENCES `unidad` (`idUnidad`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `módulo`
--

LOCK TABLES `módulo` WRITE;
/*!40000 ALTER TABLE `módulo` DISABLE KEYS */;
/*!40000 ALTER TABLE `módulo` ENABLE KEYS */;
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
  PRIMARY KEY (`idperfil`),
  UNIQUE KEY `idperfil_UNIQUE` (`idperfil`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perfil`
--

LOCK TABLES `perfil` WRITE;
/*!40000 ALTER TABLE `perfil` DISABLE KEYS */;
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
  `Valoración` int(11) DEFAULT NULL,
  `perfil_idperfil` int(11) NOT NULL,
  `Unidad_idUnidad` int(11) NOT NULL,
  `Autor` int(1) NOT NULL,
  PRIMARY KEY (`idPlantilla`),
  UNIQUE KEY `idPlantilla_UNIQUE` (`idPlantilla`),
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
-- Table structure for table `profesor`
--

DROP TABLE IF EXISTS `profesor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profesor` (
  `Rut` int(11) NOT NULL,
  `Nombre` varchar(45) NOT NULL,
  `Correo` varchar(45) NOT NULL,
  `Clave` varchar(45) NOT NULL,
  `Admin?` int(1) NOT NULL,
  PRIMARY KEY (`Rut`),
  UNIQUE KEY `Rut_UNIQUE` (`Rut`),
  UNIQUE KEY `Correo_UNIQUE` (`Correo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profesor`
--

LOCK TABLES `profesor` WRITE;
/*!40000 ALTER TABLE `profesor` DISABLE KEYS */;
/*!40000 ALTER TABLE `profesor` ENABLE KEYS */;
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
  UNIQUE KEY `Sigla_UNIQUE` (`Sigla`),
  UNIQUE KEY `idRamo_UNIQUE` (`idRamo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ramo`
--

LOCK TABLES `ramo` WRITE;
/*!40000 ALTER TABLE `ramo` DISABLE KEYS */;
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
  `Descripción` varchar(3000) DEFAULT NULL,
  PRIMARY KEY (`idUnidad`),
  UNIQUE KEY `idUnidad_UNIQUE` (`idUnidad`),
  KEY `fk_Unidad_Ramo1_idx` (`Ramo_idRamo`),
  CONSTRAINT `fk_Unidad_Ramo1` FOREIGN KEY (`Ramo_idRamo`) REFERENCES `ramo` (`idRamo`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unidad`
--

LOCK TABLES `unidad` WRITE;
/*!40000 ALTER TABLE `unidad` DISABLE KEYS */;
/*!40000 ALTER TABLE `unidad` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-09-03 21:44:28
