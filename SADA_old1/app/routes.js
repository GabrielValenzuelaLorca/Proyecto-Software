/**
 * Created by rodri on 10-09-2016.
 */


// app/routes.js
module.exports = function(app, passport,connection) {
    var title = 'theBrutalCorp';
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
        res.render('about.ejs',{title:title}); // about
    });

    // =====================================
    // MENU ========
    // =====================================

    app.get('/menu',isLoggedIn, function(req, res) {

        if(req.user.Rut==undefined) {//
            if (req.user.perfil_idperfil == null) {
                res.render('encuesta.ejs', {title: title}); //
            }
            else {
                res.render('menu.ejs', {title: title, perfil: req.user.perfil_idperfil}); //
                console.log("menu queryget");
                console.log(req.user);
            }
        }
        else{
            res.render("menu.ejs");
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
    app.get('/signup', function(req, res) {
        // render the page and pass in any flash data if it exists
        var messages =req.flash('error');
        res.render('signup.ejs', { title:title, messages:messages });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signupA', {
        successRedirect : '/login', // redirect to the secure profile section
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
        console.log("Loggedin-The user is: "+req.user);
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
