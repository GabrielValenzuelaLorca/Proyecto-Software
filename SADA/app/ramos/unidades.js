module.exports = function(app, passport, connection, transporter,dbconfig,title,bcrypt,isLoggedIn) {

  // =====================================
  // RAMOS ===============================
  // =====================================

  app.get('/ramos/u', isLoggedIn, function(req, res) {
    connection.query('SELECT * FROM unidad WHERE Ramo_idRamo = ? ',req.session.idRamo, function(err, rows, fields) {
      if (err) throw err;

      res.render("ramos/unidades.ejs",{
        title:title,
        user:req.user,
        unidades:rows
      });

    });//end query
  });

}
