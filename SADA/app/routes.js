/**
 * Created by rodri on 10-09-2016.
 */


// app/routes.js
module.exports = function(app, passport,connection,transporter) {
    var title = 'theBrutalCorp';

    //email thing
    app.get('/recover',function(req,res){
      res.render('recover.ejs',{message:[]});
    });

    app.post('/recover',function(req,res){

      connection.query('SELECT * from alumno WHERE Correo = ?',[req.body.email], function(err, rows) {
          if (err) throw err;
          if (!rows.length) {
              res.render('recover.ejs',{message:["Este email no está registrado aún.",0]});
          }
          else {
              var mailOptions = {
                  from: 'theBrutalCorp <noreply@theBrutalCorp.com>', // sender address
                  to: req.body.email, // list of receivers
                  subject: 'Olvido de Contraseña', // Subject line
                  text: 'Se ha solicitado recuperar contraseña para el sitio SADA.\n Su contraseña es:'+rows[0].Clave, // plaintext body
                  html: '<p>Se ha solicitado recuperar contraseña para el sitio SADA.</p><br><p>Su contraseña actual es: <b>'+rows[0].Clave+'</b></p><br><br><p>theBrutalCorp.</p>' // html body
              };

              // send mail with defined transport object
              transporter.sendMail(mailOptions, function (error, info) {
                  if (error) {
                      console.log(error);
                  } else {
                      console.log('Message sent: ' + info.response);
                  }
              });

              res.render('recover.ejs',{message:["Email enviado satisfactoriamente.",1]});
          }
          });

    });

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs',{title:title}); // inicio
    });

    // =====================================
    // ABOUT ========
    // =====================================

    app.get('/about',isLoggedIn, function(req, res) {
        res.render('about.ejs',{title:title,user:req.user}); // about
    });

    // =====================================
    // MENU ========
    // =====================================

    app.get('/menu',isLoggedIn, function(req, res) {

        if(req.user.Rut==undefined) {//Es alumno
            if (req.user.perfil_idperfil == null) {
                res.render('encuesta.ejs', {title: title}); //Te manda a encuesta
            }
            else {
                res.render('menu.ejs', {title: title,user:req.user}); //Te redirige a menu
                console.log("GET /menu");
                console.log("req.user = "+req.user);
            }
        }//Es profe, manda directamente a menu
        else{
            res.render("menu.ejs",{user:req.user});
        }

    });

    app.post('/menu', function(req, res) {//Respondiendo encuesta

        connection.query('Update alumno set perfil_idperfil= ? where Rol = ?',[req.body.result,req.user.Rol],function (err,rows,fields) {
           if(err )throw err;
        });

        console.log("menu querypost");
        console.log(req.user);

        res.render('menu.ejs',{title:title,perfil:req.body.result}); //
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {
        var messages =req.flash('error');
        // render the page and pass in any flash data if it exists
        res.render('login.ejs', {  title:title,messages:messages });
    });

    //Alumno
    app.post('/login', passport.authenticate('local-loginA', {
            successRedirect : '/menu', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
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

    //Profesor
    app.post('/loginProfesor', passport.authenticate('local-loginP', {
            successRedirect : '/menu', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
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
    // show the signup form
    app.get('/signup',isLoggedIn, function(req, res) {
        // render the page and pass in any flash data if it exists
        if(req.user.Rol==undefined){
            var messages =req.flash('error');
            var exito =req.flash('exito');
            res.render('signup.ejs', { title:title, messages:messages, exito:exito, user:req.user});
        }
        else{
          console.log("redirigiendo a menu!!");
          res.redirect('/menu');
          //res.render('menu.ejs', { title:title, messages:messages,user:req.user });
        }
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signupA', {
        successRedirect : '/signup', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // PROFILE SECTION =========================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            title:title,
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
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
