module.exports = function(app, passport, connection, transporter,dbconfig,title,bcrypt,isLoggedIn) {

  // =====================================
  // ABOUT ===============================
  // =====================================

  app.get('/about', isLoggedIn, function(req, res) {
      res.render('menu/about.ejs', {
          title: title,
          user: req.user
      });
  });

}
