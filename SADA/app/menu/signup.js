module.exports = function(app, passport, connection, transporter,dbconfig,title,bcrypt,isLoggedIn) {

  // =====================================
  // SIGNUP ==============================
  // =====================================

  app.get('/signup', isLoggedIn, function(req, res) {
    if (req.user.Profesor != 0) {
          var messages = req.flash('error');
          var exito = req.flash('exito');
          res.render('menu/signup.ejs', {
              title: title,
              messages: messages,
              exito: exito,
              user: req.user,
          });
    }
    else {
        res.redirect('/menu');
    }
  });


  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
      successRedirect: '/signup', // redirect to the secure profile section
      failureRedirect: '/signup', // redirect back to the signup page if there is an error
      failureFlash: true // allow flash messages
  }));

}
