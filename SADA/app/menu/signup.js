module.exports = function(app, passport, connection, transporter,dbconfig,title,bcrypt,isLoggedIn) {

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


}
