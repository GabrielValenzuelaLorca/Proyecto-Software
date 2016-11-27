#SADA
######*Sistema adaptativo de aprendizaje.*

##Requerimientos

* [MySql](https://www.mysql.com/) - Base de Datos
* [NodeJS](https://nodejs.org/en/) - JS runtime environment

##Pre-requisitos
1. Desde la terminal dirigirse al directorio `/config` ejecutando el comando `cd config`
1. Luego ejecutar el comando `mysql -u "nombreusuario" -p < DB_SADA.sql` para crear la Base de Datos en caso de que no exista. Se le pedirá su contraseña. (Puede que el nombre de usuario sea 'root')<br/>
\* Si el comando anterior no funciona (Windows u otro), importar de forma manual el archivo `DB_SADA.sql` a través de `MySql`.
1. Editar `user` y `password` en `config/database.js`

##Instrucciones:

1. Clonar repositorio `git clone https://github.com/Drogabito/Proyecto-Software.git`
1. Moverse al directorio `/SADA` ejecutando `cd SADA`
1. Ejecutar el comando `npm install`
1. Ejecutar el comando `npm start`
1. Dirigirse a `http://localhost:8080/` en su navegador.

##Funcionalidades y características del sitio Web

* El sitio consta de 3 tipos de usuarios: **Alumno**, **Profesor** y **Administrador/Coordinador** (A partir de ahora Admin).
* El manejo de inicio de sesión se basa con el uso de un mail bajo el dominio de la *Universidad Técnica Federico Santa María*. De momento estos incluyen `@usm.cl`, `@sansano.usm.cl` y `@alumnos.usm.cl`. Cualquier otro mail será indicado como inválido.
* En la página de inicio se puede solicitar recuperar contraseña, enviando un mail con los pasos a seguir.
* Cada usuario registrado tendrá una contraseña por defecto la cual será su RUT. Este deberá cambiarla ingresando al sitio, solicitando un cambio de contraseña.

####**Profesor** y **Admin**

* Al iniciar por primera vez el sitio, se tendrá que crear el primer usuario **Admin**. Para ello se deberá ingresar a la ruta `/admin` pidiéndole al usuario rellenar con los datos para luego Aceptar.
* **Admin** tiene los mismos permisos que **Profesor** pero además tiene menos restricciones al momento de manejar información general del sitio.
* **Admin** Puede agregar Profesores y Alumnos a la Base de Datos de manera individual. También existe la posibilidad de agregar solo alumnos desde un archivo Excel siguiendo un formato específico (viene incluido un archivo Excel para probar esta funcionalidad en la raiz del proyecto). (*Cabe destacar que esta es la única manera de ingresar usuarios a la BD*)
* En la sección `Administrar Usuarios`, el **Admin** podrá ver todos los alumnos y profesores ingresados en el sistema. Acá él podrá asignar una asignatura a un **Profesor** para que luego este tengá los permisos y así poder editar ciertas secciones de dicha asignatura.
* En la sección `Administrar Asignaturas`, tanto el **Admin** como un **Profesor** podrán acceder a administrar plantillas para una cierta Unidad de una Asignatura en específico. (*Cabe destacar que los profesores solo podrán ver las asignaturas que se les tienen asignadas, en cambio el administrador tendrá acceso a todas*)
* El sistema de plantillas funciona de la siguiente manera: Un **Profesor** o **Admin** podrá crear una nueva plantilla para un perfil en específico, indicando los distintos módulos que desea agregar para cada columna. Cada plantilla consta de 3 columnas. También existe la posibilidad de agregar un nuevo módulo, debiendo indicar si el contenido es un *link a imagen*, *link a video* o *texto plano*. Luego se deberá elegir como activa la plantilla que se desea mostrar a los alumnos de cierto perfil, pudiendo ver la valoración de cada plantilla hasta el momento además de poder ver un preview de cómo se ve la plantilla en el sitio. También se puede aprobar o eliminar una plantilla propuesta por algún alumno.
* Finalmente tanto **Profesor** como **Admin** pueden acceder a la sección `Ver asignaturas` y así ver lo mismo que están viendo los alumnos. Para ello se deberá seleccionar un perfil temporáneo en el menú principal.

####**Alumno**

* Un **Alumno** deberá ser previamente registrado por el **Admin** en el sitio.
* La primera vez que un **Alumno** ingresa a la plataforma, el sistema responderá con un test que deberá ser llenado y así asignarle un perfil de aprendizaje.
* Una vez respondido el test, el **Alumno** podrá ingresar libremente al sitio Web.
* Un **Alumno** podrá ver las asignaturas del sitio en `Ver asignaturas`. Una vez estando en una unidad de una asignatura en específico, el sistema mostrará la plantilla asociada al perfil de dicha unidad. El **Alumno** podrá calificar la plantilla del 1 al 5. Esto solo se podrá hacer una y solo una vez por plantilla, para así no abusar del sistema de valoración.
* Finalmente un **Alumno** podrá proponer una plantilla para cierta unidad, eligiendo los módulos disponibles, pudiendo ordenarlos a su antojo.
