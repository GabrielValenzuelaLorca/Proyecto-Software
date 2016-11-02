##Requerimientos

1. Tener instalado las últimas versiones de `MySql` y `NodeJS`. A continuación links de donde poder descargar:
  ```
  https://nodejs.org/en/
  ```

  ```
  https://www.mysql.com/
  ```

##Pre-requisitos antes de ejecutar
  1. Ir al directorio `/config` y ejecutar el comando `mysql -u "nombreusuario" -p < DB_SADA.sql` para crear la Base de Datos en caso de que no exista. Se le pedirá su contraseña. (Puede que el nombre de usuario sea 'root')
  \* Si el comando anterior no funciona (sería estando en Windows), importar de forma manual la Base de Datos a través de `MySql`.
  1. Editar `user` y `password` en `config/database.js`


##Instrucciones:

1. Clonar repositorio `git clone https://github.com/Drogabito/Proyecto-Software.git`
1. Moverse al directorio `SADA` ejecutando `cd SADA`
1. Ejecutar el comando `npm install`
1. Ejecutar `npm start`
1. Dirigirse al directorio `http://localhost:8080/`
