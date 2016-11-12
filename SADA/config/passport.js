// config/passport.js

// load all the things we need
var LocalStrategy = require('passport-local').Strategy;

// load up the user model
var bcrypt = require('bcrypt-nodejs');

// expose this function to our app using module.exports
module.exports = function(passport, connection, dbconfig) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        console.log("-> Esto es SERIAL");
        //console.log('user: ' + user);
        done(null, user.Rut);
    });


    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        connection.query("SELECT * FROM " + dbconfig.users_table + " WHERE Rut = ? ", [id], function(err, rows) {
            done(err, rows[0]);
            console.log("-> Esto es DESERIAL");
            //console.log("rows[0]: "+rows[0]);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================

    passport.use(
        'local-signup',
        new LocalStrategy({
                // by default, local strategy uses username and password, we will override with email
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true // allows us to pass back the entire request to the callback
            },
            function(req, email, password, done) {

                //Errores extras de formato
                //Agregar más errores...

                var errors = req.validationErrors();
                if (errors) {
                    var messages2 = [];
                    errors.forEach(function(error) {
                        messages2.push(error.msg);
                    });

                    //Filtra errores para que no salgan repetidos
                    var messages = messages2.filter(function(elem, index, self) {
                        return index == self.indexOf(elem);
                    });

                    //Envía los errores por flash
                    return done(null, false, req.flash('error', messages));
                }

                //Aquí empieza el viaje.
                if(req.body.isAlumno==='true'){//Alumno
                  console.log("ENTRO QUERY ALUMNO");
                  connection.query("SELECT * FROM " + dbconfig.users_table + " WHERE Correo = ? OR Rut = ? OR Rol = ?", [email, req.body.rut,req.body.rol], function(err, rows) {
                      if (err)
                          return done(err);
                      if (rows.length) { //Busca si ya hay un email o rol o rut registrado del form. Agrega errores correspondientes
                          var messages2 = [];
                          for (var j = 0; j < rows.length; j++) {
                              if (rows[j].Correo == email) {
                                  messages2.push('Este Email ya está en uso.');
                              }
                              if (rows[j].Rut == req.body.rut) {
                                  messages2.push('Ya hay una cuenta asociada a este Rut');
                              }
                              if (rows[j].Rol == req.body.rol) {
                                  messages2.push('Ya hay una cuenta asociada a este Rol');
                              }
                          }

                          //Filtra mensajes de error repetidos
                          var messages = messages2.filter(function(elem, index, self) {
                              return index == self.indexOf(elem);
                          });
                          console.log("mensajitos: " + messages);
                          return done(null, false, req.flash('error', messages));
                      } else {
                          // Se crea el usuario
                          var clave=req.body.rut.toString();
                          var newUserMysql = {
                              email: email,
                              password: bcrypt.hashSync(clave, null, null), // use the generateHash function in our user model
                              name: req.body.username,
                              rol: req.body.rol,
                              rut:req.body.rut,
                              admin:0,
                              profesor:0
                          };
                          var insertQuery = "INSERT INTO " + dbconfig.users_table + " ( Rut, Nombre, Correo, Clave, Admin, Profesor, Rol ) values (?,?,?,?,?,?,?)";
                          connection.query(insertQuery, [newUserMysql.rut, newUserMysql.name, newUserMysql.email, newUserMysql.password, newUserMysql.admin, newUserMysql.profesor, newUserMysql.rol], function(err, rows) {
                            console.log("newUserMysql: " + newUserMysql);

                          });
                          connection.query("SELECT * FROM " + dbconfig.users_table + " WHERE Correo = ?", [newUserMysql.email], function(err, rows) {
                              return done(null, false, req.flash('exito', ['Se agregó al alumno exitosamente.']));
                          });
                      }
                  });
                }
                else{//Profesor
                  console.log("ENTRO QUERY PROFE");
                  connection.query("SELECT * FROM " + dbconfig.users_table + " WHERE Correo = ? OR Rut = ?", [email, req.body.rut], function(err, rows) {
                      if (err)
                          return done(err);
                      if (rows.length) { //Busca si ya hay un email o rol registrado del form. Agrega errores correspondientes
                          var messages2 = [];
                          for (var j = 0; j < rows.length; j++) {
                              if (rows[j].Correo == email) {
                                  messages2.push('Este Email ya está en uso.');
                              }
                              if (rows[j].Rut == req.body.rut) {
                                  messages2.push('Ya hay una cuenta asociada a este Rut');
                              }
                          }

                          //Filtra repetidos
                          var messages = messages2.filter(function(elem, index, self) {
                              return index == self.indexOf(elem);
                          });
                          console.log("mensajitos: " + messages);
                          return done(null, false, req.flash('error', messages));
                      } else {
                          // Se crea el usuario
                          var clave=req.body.rut.toString();
                          var newUserMysql = {
                              email: email,
                              password: bcrypt.hashSync(clave, null, null), // use the generateHash function in our user model
                              name: req.body.username,
                              rut:req.body.rut,
                              admin:0,
                              profesor:1
                          };

                          var insertQuery = "INSERT INTO " + dbconfig.users_table + " ( Rut, Nombre, Correo, Clave, Admin, Profesor ) values (?,?,?,?,?,?)";
                          connection.query(insertQuery, [newUserMysql.rut, newUserMysql.name, newUserMysql.email, newUserMysql.password, newUserMysql.admin, newUserMysql.profesor], function(err, rows) {
                            console.log("newUserMysql: " + newUserMysql);

                          });
                          connection.query("SELECT * FROM " + dbconfig.users_table + " WHERE Correo = ?", [newUserMysql.email], function(err, rows) {
                              return done(null, false, req.flash('exito', ['Se agregó al profesor exitosamente.']));
                          });
                      }
                  });
                }

            })
    );

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================

    //Login
    passport.use(
        'local-login',
        new LocalStrategy({
                // by default, local strategy uses username and password, we will override with email
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true // allows us to pass back the entire request to the callback
            },
            function(req, email, password, done) { // callback with email and password from our form
                connection.query("SELECT * FROM " + dbconfig.users_table + " WHERE Correo = ?", [email], function(err, rows) {
                    if (err)
                        return done(err);
                    if (!rows.length) {
                        return done(null, false, {
                            message: 'Email inválido.'
                        }); // req.flash is the way to set flashdata using connect-flash
                    }

                    // if the user is found but the password is wrong
                    if (!bcrypt.compareSync(password, rows[0].Clave)){
                      return done(null, false, {
                        message: 'Contraseña incorrecta.'
                    })};

                    // all is well, return successful user
                    return done(null, rows[0]);
                });
            })
    );
};
