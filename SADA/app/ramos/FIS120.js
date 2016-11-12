module.exports = function(app, passport, connection, transporter,dbconfig,title,bcrypt,isLoggedIn) {

  // =====================================
  // RAMOS ===============================
  // =====================================

  app.get('/ramos/120', isLoggedIn, function(req, res) {
    connection.query('SELECT * FROM unidad WHERE Ramo_idRamo = ? ',req.session.idRamo, function(err, rows, fields) {
      if (err) throw err;

      res.render("ramos/120.ejs",{
        title:title,
        user:req.user,
        unidades:rows
      });

    });//end query
  });

  app.get('/ramos/120/voltaje',isLoggedIn,function(req,res){
    res.render("ramos/unidades/120_voltaje.ejs",{
      title:title,
      user:req.user
    });
  });

}
