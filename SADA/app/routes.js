var bcrypt = require('bcrypt-nodejs');

// app/routes.js
module.exports = function(app, passport, connection, transporter,dbconfig) {

    var title = 'SADA';

    // =====================================
    // ADMIN PAGE  =========================
    // =====================================

    app.get('/admin',function(req,res){//Si no existe ningún admin, se puede ingresar a esta página
      connection.query("SELECT * FROM " + dbconfig.users_table + " WHERE Admin = 1 ", function(err, rows) {
        if (!rows.length){
          res.render('admin.ejs',{title:title});
        }
        else{
          res.redirect('/menu');
        }
      });
    });

    app.post('/admin',function(req,res){
          // Se crea el usuario
          var newUserMysql = {
              email: req.body.email,
              password: bcrypt.hashSync(req.body.password, null, null), // use the generateHash function in our user model
              name: req.body.username,
              rut:req.body.rut,
              admin:1,
              profesor:1
          };
          var insertQuery = "INSERT INTO " + dbconfig.users_table + " ( Rut, Nombre, Correo, Clave, Admin, Profesor) values (?,?,?,?,?,?)";
          connection.query(insertQuery, [newUserMysql.rut, newUserMysql.name, newUserMysql.email, newUserMysql.password, newUserMysql.admin, newUserMysql.profesor], function(err, rows) {
          });
          res.send('Se agregó Admin correctamente');
    });

     // =====================================
     // HOME PAGE  ==========================
     // =====================================

    app.get('/', function(req, res) {
      if(req.user==undefined){
          var messages = req.flash('error');
          res.render('index/index.ejs', {
              title: title,
              messages: messages,
              recover:false,
          }); // inicio
      }
      else{
          res.redirect('/menu');
      }
});

    // =====================================
    // EMAIL / RECOVER  ====================
    // =====================================

    app.get('/recover', function(req, res) {
      if(req.user==undefined){
        res.render('index/index.ejs', {
            message: [],
            title:title,
            recover:true
        });
      }
      else{
          res.redirect('/menu');
      }
    });

    app.post('/recover/changePass',function(req,res){

      if(req.body.password!=req.body.password2){
        res.render('index/change_pass.ejs', {
            message: 'Contraseñas tienen que ser iguales',
            title:title,
            email:req.body.email,
            form:true
        });
      }
      else{
        if(req.body.password.length<4 || req.body.password.length>20 ){
          res.render('index/change_pass.ejs', {
              message: 'Contraseña tiene que contener entre 4 a 20 caracteres',
              title:title,
              email:req.body.email,
              form:true
          });
        }
        else{
          console.log('SELECT * FROM '+dbconfig.users_table+' WHERE Correo = "'+req.body.email+'"');
          connection.query('SELECT * FROM '+dbconfig.users_table+' WHERE Correo = "'+req.body.email+'"',function (err,rows) {
            if (err) throw err;
            if(!rows.length){
              res.render('index/change_pass.ejs', {
                  message: 'Usuario no encontrado',
                  title:title,
                  email:req.body.email,
                  form:true
              });
            }
            else{
              var query = 'UPDATE '+dbconfig.users_table+' SET Clave = "'+bcrypt.hashSync( req.body.password, null, null)+'" WHERE Correo = "'+req.body.email+'"';
              connection.query(query,function (err,rows) {
                if (err) throw err;
              });
              res.render('index/change_pass.ejs', {
                  message: '',
                  title:title,
                  email:req.body.email,
                  form:false
              });
            }
          });
        }
      }
    });

    app.post('/recover/change_pass/form',function(req,res){

      res.render('index/change_pass.ejs', {
          message: [],
          title:title,
          email:req.body.email,
          form:true
      });

    });

    app.post('/recover', function(req, res) {

        connection.query('SELECT * FROM '+ dbconfig.users_table+' WHERE Correo = ?', [req.body.email], function(err, rows) {
            if (err) throw err;
            if (!rows.length) {
                res.render('index/index.ejs', {
                    message: ["Este email no está registrado aún.", 0],
                    recover:true,
                    title:title
                });
            } else {
                var mailOptions = {
                    from: '<SADA noreply@theBrutalCorp.com>', // sender address
                    to: /*'rodrigo.elicer1@gmail.com',*/ req.body.email, // list of receivers
                    subject: 'Solicitud recuperación de Contraseña', // Subject line
                    text: 'Se ha solicitado recuperar contraseña para el sitio SADA.\n Su contraseña es: ' + rows[0].Clave, // plaintext body
                    html: '<!DOCTYPE html>'+
                          '<html>'+
                          '<head>'+
                            '<title>Page Title</title>'+
                            '<style>'+
                              '.inline {display: inline;}'+
                              '.link-button {background: none;border: none;color: blue;text-decoration: underline;cursor: pointer;font-size: 1em;font-family: serif;}'+
                              '.link-button:focus {outline: none;}'+
                              '.link-button:active {color:red;}'+
                            '</style> '+
                          '</head>'+
                          '<body>'+

                            '<p>Se ha solicitado recuperar la contraseña del sitio SADA para el siguiente correo: '+rows[0].Correo+
                            '<form method="post" class="inline" action="http://localhost:8080/recover/change_pass/form">'+
                              '<input type="hidden" name="email" value='+rows[0].Correo+'>'+
                              '<button type="submit" class="link-button">Cambiar Contraseña<button>'+
                            '</form>'+
                            '</p><p> Su contraseña actual es: <b>' + rows[0].Clave + '</b></p>'+

                          '</body>'+
                          '</html>'
                    };
                // send mail with defined transport object
                transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Message sent: ' + info.response);
                    }
                });

                res.render('index/index.ejs', {
                    message: ["Email enviado satisfactoriamente.", 1],
                    recover:true,
                    title:title
                });
            }
        });

    });

    // =====================================
    // ABOUT ===============================
    // =====================================

    app.get('/about', isLoggedIn, function(req, res) {
        res.render('menu/about.ejs', {
            title: title,
            user: req.user
        }); // about
    });

    // =====================================
    // MENU ================================
    // =====================================

    app.get('/menu', isLoggedIn, function(req, res) {

        if (req.user.Profesor == 0) { //Es alumno
            if (req.user.perfil_idperfil == null) {
                res.render('menu/encuesta.ejs', { title: title }); //Te manda a encuesta
            }
            else {
                res.render('menu/menu.ejs', { title:title, user: req.user }); //Te redirige a menu
            }
        } //Es profe, manda directamente a menu
        else {
            res.render("menu/menu.ejs", { title:title, user: req.user });
        }
    });

    app.post('/menu', function(req, res) { //Respondiendo encuesta

        connection.query('UPDATE usuario SET perfil_idperfil= ? WHERE Rut = ?', [req.body.result, req.user.Rut], function(err, rows, fields) {
            if (err) throw err;
        });

        console.log("menu querypost");
        console.log(req.user);

        res.render('menu/menu.ejs', {
            title: title,
            perfil: req.body.result,
            user:req.user
        }); //
    });

    // =====================================
    // LOGIN ===============================
    // =====================================

    app.post('/login', passport.authenticate('local-login', {
            successRedirect: '/menu', // redirect to the secure profile section
            failureRedirect: '/', // redirect back to the signup page if there is an error
            failureFlash: true // allow flash messages
        }),
        function(req, res) {
            console.log("hello");

            if (req.body.remember) {
                req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
                req.session.cookie.expires = false;
            }
            res.redirect('/');
        });

    // =====================================
    // SIGNUP ==============================
    // =====================================

    // Alumno
    app.get('/signup/alumno', isLoggedIn, function(req, res) {
        // render the page and pass in any flash data if it exists
        if (req.user.Profesor != 0) {
            var messages = req.flash('error');
            var exito = req.flash('exito');
            res.render('menu/signup.ejs', {
                title: title,
                messages: messages,
                exito: exito,
                user: req.user,
                isAlumno:true
            });
        } else {
            res.redirect('/menu');
            //res.render('menu.ejs', { title:title, messages:messages,user:req.user });
        }
    });

    // process the signup form
    app.post('/signup/alumno', passport.authenticate('local-signupA', {
        successRedirect: '/signup/alumno', // redirect to the secure profile section
        failureRedirect: '/signup/alumno', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // Profesor
    app.get('/signup/profesor', isLoggedIn, function(req, res) {
        // render the page and pass in any flash data if it exists
        if (req.user.Profesor != 0) {
            var messages = req.flash('error');
            var exito = req.flash('exito');
            res.render('menu/signup.ejs', {
                title: title,
                messages: messages,
                exito: exito,
                user: req.user,
                isAlumno:false
            });
        } else {
            res.redirect('/menu');
            //res.render('menu.ejs', { title:title, messages:messages,user:req.user });
        }
    });

    // process the signup form
    app.post('/signup/profesor', passport.authenticate('local-signupP', {
        successRedirect: '/signup/profesor', // redirect to the secure profile section
        failureRedirect: '/signup/profesor', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // =====================================
    // PERFIL ==============================
    // =====================================

    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('menu/profile.ejs', {
            title: title,
            user: req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // =====================================
    // ERROR 404 NOT FOUND =================
    // =====================================

    app.get('/404', function(req, res, next){
      // trigger a 404 since no other middleware
      // will match /404 after this one, and we're not
      // responding here
      next();
    });

    app.use(function(req, res, next){
      res.status(404);

      // respond with html page
      if (req.accepts('html')) {
        res.render('404', { url: req.url });
        return;
      }

      // respond with json
      if (req.accepts('json')) {
        res.send({ error: 'Not found' });
        return;
      }

      // default to plain-text. send()
      res.type('txt').send('Not found');
    });

};

// route middleware to make sure
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
