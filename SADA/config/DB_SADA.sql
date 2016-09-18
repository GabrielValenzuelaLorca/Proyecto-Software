-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';


-- -----------------------------------------------------
-- Schema Sada_DB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Sada_DB` DEFAULT CHARACTER SET utf8 ;
USE `Sada_DB` ;

-- -----------------------------------------------------
-- Table `Sada_DB`.`perfil`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Sada_DB`.`perfil` ;

CREATE TABLE IF NOT EXISTS `Sada_DB`.`perfil` (
  `idperfil` INT(11) NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idperfil`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table `Sada_DB`.`ramo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Sada_DB`.`ramo` ;

CREATE TABLE IF NOT EXISTS `Sada_DB`.`ramo` (
  `idRamo` INT(11) NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(45) NOT NULL,
  `Sigla` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`idRamo`),
  UNIQUE INDEX `Sigla_UNIQUE` (`Sigla` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `Sada_DB`.`usuario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Sada_DB`.`usuario` ;

CREATE TABLE IF NOT EXISTS `Sada_DB`.`usuario` (
  `Rut` INT(11) NOT NULL,
  `Nombre` VARCHAR(45) NOT NULL,
  `Correo` VARCHAR(45) NOT NULL,
  `Clave` VARCHAR(45) NOT NULL,
  `Admin` INT(1) NOT NULL,
  `Profesor` INT(1) NOT NULL,
  `Rol` INT(1) NULL DEFAULT NULL,
  `perfil_idperfil` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`Rut`),
  UNIQUE INDEX `Correo_UNIQUE` (`Correo` ASC),
  INDEX `fk_usuario_perfil1_idx` (`perfil_idperfil` ASC),
  CONSTRAINT `fk_usuario_perfil1`
    FOREIGN KEY (`perfil_idperfil`)
    REFERENCES `Sada_DB`.`perfil` (`idperfil`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `Sada_DB`.`contrato`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Sada_DB`.`contrato` ;

CREATE TABLE IF NOT EXISTS `Sada_DB`.`contrato` (
  `ramo_idRamo` INT(11) NOT NULL,
  `usuario_Rut` INT(11) NOT NULL,
  PRIMARY KEY (`ramo_idRamo`, `usuario_Rut`),
  INDEX `fk_ramo_has_usuario_usuario1_idx` (`usuario_Rut` ASC),
  INDEX `fk_ramo_has_usuario_ramo1_idx` (`ramo_idRamo` ASC),
  CONSTRAINT `fk_ramo_has_usuario_ramo1`
    FOREIGN KEY (`ramo_idRamo`)
    REFERENCES `Sada_DB`.`ramo` (`idRamo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ramo_has_usuario_usuario1`
    FOREIGN KEY (`usuario_Rut`)
    REFERENCES `Sada_DB`.`usuario` (`Rut`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table `Sada_DB`.`unidad`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Sada_DB`.`unidad` ;

CREATE TABLE IF NOT EXISTS `Sada_DB`.`unidad` (
  `idUnidad` INT(11) NOT NULL AUTO_INCREMENT,
  `Ramo_idRamo` INT(11) NOT NULL,
  `Nombre` VARCHAR(45) NOT NULL,
  `Descripción` VARCHAR(3000) NULL DEFAULT NULL,
  PRIMARY KEY (`idUnidad`),
  INDEX `fk_Unidad_Ramo1_idx` (`Ramo_idRamo` ASC),
  CONSTRAINT `fk_Unidad_Ramo1`
    FOREIGN KEY (`Ramo_idRamo`)
    REFERENCES `Sada_DB`.`ramo` (`idRamo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `Sada_DB`.`módulo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Sada_DB`.`módulo` ;

CREATE TABLE IF NOT EXISTS `Sada_DB`.`módulo` (
  `idMódulo` INT(11) NOT NULL AUTO_INCREMENT,
  `Tipo` VARCHAR(45) NOT NULL,
  `Información` VARCHAR(4000) NOT NULL,
  `Unidad_idUnidad` INT(11) NOT NULL,
  PRIMARY KEY (`idMódulo`),
  INDEX `fk_Módulo_Unidad1_idx` (`Unidad_idUnidad` ASC),
  CONSTRAINT `fk_Módulo_Unidad1`
    FOREIGN KEY (`Unidad_idUnidad`)
    REFERENCES `Sada_DB`.`unidad` (`idUnidad`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `Sada_DB`.`plantilla`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Sada_DB`.`plantilla` ;

CREATE TABLE IF NOT EXISTS `Sada_DB`.`plantilla` (
  `idPlantilla` INT(11) NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(45) NOT NULL,
  `Valoración` INT(11) NULL DEFAULT NULL,
  `perfil_idperfil` INT(11) NOT NULL,
  `Unidad_idUnidad` INT(11) NOT NULL,
  `Autor` INT(1) NOT NULL,
  PRIMARY KEY (`idPlantilla`),
  INDEX `fk_Plantilla_perfil1_idx` (`perfil_idperfil` ASC),
  INDEX `fk_Plantilla_Unidad1_idx` (`Unidad_idUnidad` ASC),
  CONSTRAINT `fk_Plantilla_Unidad1`
    FOREIGN KEY (`Unidad_idUnidad`)
    REFERENCES `Sada_DB`.`unidad` (`idUnidad`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Plantilla_perfil1`
    FOREIGN KEY (`perfil_idperfil`)
    REFERENCES `Sada_DB`.`perfil` (`idperfil`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `Sada_DB`.`ensamblaje`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Sada_DB`.`ensamblaje` ;

CREATE TABLE IF NOT EXISTS `Sada_DB`.`ensamblaje` (
  `Plantilla_idPlantilla` INT(11) NOT NULL,
  `Módulo_idMódulo` INT(11) NOT NULL,
  PRIMARY KEY (`Plantilla_idPlantilla`, `Módulo_idMódulo`),
  INDEX `fk_Plantilla_has_Módulo_Módulo1_idx` (`Módulo_idMódulo` ASC),
  INDEX `fk_Plantilla_has_Módulo_Plantilla1_idx` (`Plantilla_idPlantilla` ASC),
  CONSTRAINT `fk_Plantilla_has_Módulo_Módulo1`
    FOREIGN KEY (`Módulo_idMódulo`)
    REFERENCES `Sada_DB`.`módulo` (`idMódulo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Plantilla_has_Módulo_Plantilla1`
    FOREIGN KEY (`Plantilla_idPlantilla`)
    REFERENCES `Sada_DB`.`plantilla` (`idPlantilla`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

INSERT INTO `sada_db`.`perfil` (`idperfil`, `Nombre`) VALUES ('1', 'Adaptador');
INSERT INTO `sada_db`.`perfil` (`idperfil`, `Nombre`) VALUES ('2', 'Divergente');
INSERT INTO `sada_db`.`perfil` (`idperfil`, `Nombre`) VALUES ('3', 'Convergente');
INSERT INTO `sada_db`.`perfil` (`idperfil`, `Nombre`) VALUES ('4', 'Asimilador');


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
