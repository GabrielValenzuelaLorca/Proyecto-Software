module.exports = function(app, passport, connection, transporter,dbconfig,title,bcrypt,isLoggedIn) {

  // =====================================
  // ABOUT ===============================
  // =====================================

  app.get('/modulos', isLoggedIn, function(req, res) {
      res.render("modulos.ejs", {
          title: title,
          user: req.user
      });
  });

}
