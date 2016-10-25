var bcrypt = require('bcrypt-nodejs');

// app/routes.js
module.exports = function(app, passport, connection, transporter,dbconfig) {

    var title = 'SADA';

    //Admin page
    require('./admin/admin.js')(app, passport, connection, transporter,dbconfig,title,bcrypt);

    //Index page
    require('./index/home.js')(app, passport, connection, transporter,dbconfig,title,bcrypt);
    require('./index/email.js')(app, passport, connection, transporter,dbconfig,title,bcrypt);
    require('./index/login.js')(app, passport, connection, transporter,dbconfig,title,bcrypt);

    //Menu page
    require('./menu/menu.js')(app, passport, connection, transporter,dbconfig,title,bcrypt,isLoggedIn_Encuesta);
    require('./menu/about.js')(app, passport, connection, transporter,dbconfig,title,bcrypt,isLoggedIn);
    require('./menu/signup.js')(app, passport, connection, transporter,dbconfig,title,bcrypt,isLoggedIn);
    require('./menu/perfil.js')(app, passport, connection, transporter,dbconfig,title,bcrypt,isLoggedIn);
    require('./menu/ramos.js')(app, passport, connection, transporter,dbconfig,title,bcrypt,isLoggedIn);
    require('./menu/administrar_u.js')(app, passport, connection, transporter,dbconfig,title,bcrypt,isLoggedIn);

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
        res.render('404', { url: req.url, title:title });
        return;
      }

      // respond with json
      if (req.accepts('json')) {
        res.send({ error: 'Not found', title:title});
        return;
      }

      // default to plain-text. send()
      res.type('txt').send('Not found');
    });

    // =====================================
    // ERROR 500 ===========================
    // =====================================

    app.get('/500', function(req, res, next){
      // trigger a generic (500) error
      next(new Error('keyboard cat!'));
    });

    app.use(function(err, req, res, next){
      // we may use properties of the error object
      // here and next(err) appropriately, or if
      // we possibly recovered from the error, simply next().
      res.status(err.status || 500);
      res.render('500', { error: err, title:title});
      console.log(err.message);
    });
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
      if(req.user.Profesor == 0 && req.user.perfil_idperfil != null){
        return next();
      }
      else if(req.user.Profesor == 1){
        return next();
      }
      else{
        res.redirect('/');
      }

    // if they aren't redirect them to the home page
    res.redirect('/');
}

function isLoggedIn_Encuesta(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
