##Requerimientos

1. Tener instalado `MySql` y `NodeJS`. A continuación links de donde poder descargar:
  ```
  https://nodejs.org/en/
  ```

  ```
  https://www.mysql.com/
  ```

##Instrucciones:

1. Clonar repositorio `https://github.com/Drogabito/Proyecto-Software.git`
1. Moverse al directorio `SADA` ejecutando `cd SADA`
1. Ejecutar el comando `npm install`
1. Editar `user` y `password` en `config/database.js`
1. Ejecutar `node server.js`
1. Ir al directorio `http://localhost:8080/`

##Pre-requisitos antes de ejecutar
1. Ir al directorio `/config` y ejecutar el comando `source DB_SADA.sql` para crear la Base de Datos en caso de que no exista.
1. Si el comando anterior no funciona, importar de forma manual la Base de Datos a través de `MySql`.
