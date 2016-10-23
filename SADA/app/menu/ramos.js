module.exports = function(app, passport, connection, transporter,dbconfig,title,bcrypt,isLoggedIn) {

  // =====================================
  // RAMOS ===============================
  // =====================================

  app.get('/ramos', isLoggedIn, function(req, res) {
      res.render('menu/ramos.ejs', {
          title: title,
          user: req.user
      }); // about
  });

}
