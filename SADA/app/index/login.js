module.exports = function(app, passport, connection, transporter,dbconfig,title,bcrypt) {

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


}
