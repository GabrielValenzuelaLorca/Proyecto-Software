// config/passport.js

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var bcrypt = require('bcrypt-nodejs');

// expose this function to our app using module.exports
module.exports = function(passport,connection,dbconfig) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.Rol);
        console.log("esto es serial");
        //console.log(user.Rol);
    });

    // used to deserialize the user
    passport.deserializeUser(function(rol, done) {
        connection.query("SELECT * FROM "+dbconfig.users_table+" WHERE Rol = ? ",[rol], function(err, rows){
            done(err, rows[0]);
            console.log("esto es deserial");
            //console.log(rows[0]);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================

    passport.use(
        'local-signup',
        new LocalStrategy({
                // by default, local strategy uses username and password, we will override with email
                usernameField : 'email',
                passwordField : 'password',
                passReqToCallback : true // allows us to pass back the entire request to the callback
            },
            function(req, email, password, done) {
                console.log('signup:');
                console.log("email: "+email);
                console.log("password: "+password);
                console.log("username: "+req.body.username);
                console.log("rol: "+req.body.rol);

                //Errores extras de formato
                var rolcheck = req.body.rol;
                if(rolcheck.length!=9) {
                    req.checkBody('rolcheck', 'Rol tiene que tener 9 dígitos').isLength(900);
                }
                //req.checkBody('req.body.rol', 'Rol tiene que tener 9 dígitos').isLength(9);
                req.checkBody('password','Contraseña tiene que tener al menos 4 carácteres').isLength({min:4});


                var errors = req.validationErrors();
                if(errors){
                    var messages2 = [];
                    errors.forEach(function (error) {
                        messages2.push(error.msg);
                    });
                    console.log("messages2: "+messages2);
                    //Filtra errores para que no salgan repetidos
                    var messages = messages2.filter(function(elem, index, self) {
                        return index == self.indexOf(elem);
                    });

                    //Envía los errores por flash
                    console.log("errores: "+errors);
                    console.log("messages: "+messages);
                    return done(null, false, req.flash('error',messages));
                }

                //Busca si hay alguien en la BD para luego agregarlo
                console.log("SELECT * FROM "+dbconfig.users_table+" WHERE Correo = ?",[email]);
                connection.query("SELECT * FROM "+dbconfig.users_table+" WHERE Correo = ? OR Rol = ?",[email,req.body.rol], function(err, rows) {
                    if (err)
                        return done(err);
                    if (rows.length) {//Busca si ya hay un email o rol registrado del form. Agrega errores correspondientes
                        var messages2 = []
                        for(var j=0;j<rows.length;j++){
                            console.log("entre1");
                            if(rows[j].Correo==email){
                                console.log("entremail");
                                messages2.push('Este Email ya está en uso.');
                            }
                            if(rows[j].Rol==req.body.rol){
                                console.log("entrerol");
                                messages2.push('El Rol ya está en uso');
                            }
                        }

                        //Filtra repetidos
                        var messages = messages2.filter(function(elem, index, self) {
                            return index == self.indexOf(elem);
                        });
                        console.log("mensajitos: "+messages);
                        return done(null, false, req.flash('error',messages));
                    } else {
                        // Se crea el usuario
                        var newUserMysql = {
                            email: email,
                            password: /*bcrypt.hashSync(*/password/*, null, null)*/  // use the generateHash function in our user model
                            ,username:req.body.username,
                            rol:req.body.rol
                        };

                        var insertQuery = "INSERT INTO "+dbconfig.users_table+" ( Rol, Nombre, Correo, Clave ) values (?,?,?,?)";
                        console.log(insertQuery,[newUserMysql.rol, newUserMysql.username,newUserMysql.email,newUserMysql.password]);
                        connection.query(insertQuery,[newUserMysql.rol, newUserMysql.username,newUserMysql.email,newUserMysql.password],function(err, rows) {
                            console.log("newUserMysql: "+newUserMysql);

                        });
                        connection.query("SELECT * FROM "+dbconfig.users_table+" WHERE Correo = ?",[newUserMysql.email],function(err, rows) {
                            return done(null, rows[0]);
                        });
                    }
                });
            })
    );

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================

    passport.use(
        'local-login',
        new LocalStrategy({
                // by default, local strategy uses username and password, we will override with email
                usernameField : 'email',
                passwordField : 'password',
                passReqToCallback : true // allows us to pass back the entire request to the callback
            },
            function(req, email, password, done) { // callback with email and password from our form
                console.log("login:");
                console.log("email: "+email);
                console.log("pass: "+password);
                console.log("SELECT * FROM "+dbconfig.users_table+" WHERE Correo = ?",[email]);
                connection.query("SELECT * FROM "+dbconfig.users_table+" WHERE Correo = ?",[email], function(err, rows){
                    if (err)
                        return done(err);
                    if (!rows.length) {
                        return done(null, false, {message:'Email inválido.'}); // req.flash is the way to set flashdata using connect-flash
                    }

                    // if the user is found but the password is wrong
                    /*if (!bcrypt.compareSync(password, rows[0].password))*/
                    console.log("pass1: "+password);
                    console.log("pass2: "+rows[0].Clave);
                    if(password!=rows[0].Clave)
                        return done(null, false, {message:'Contraseña incorrecta.'}); // create the loginMessage and save it to session as flashdata

                    // all is well, return successful user
                    console.log("rows[0]: "+rows[0]);
                    return done(null, rows[0]);
                });
            })
    );
};
