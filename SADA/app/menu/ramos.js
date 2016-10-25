module.exports = function(app, passport, connection, transporter,dbconfig,title,bcrypt,isLoggedIn) {

  // =====================================
  // RAMOS ===============================
  // =====================================

  app.get('/ramos', isLoggedIn, function(req, res) {
    connection.query('SELECT * FROM ramo', function(err, rows, fields) {
      if (err) throw err;
      //console.log('RAMO '+ rows[0].Nombre);
      res.render('menu/ramos.ejs', {
          title: title,
          user: req.user,
          rows:rows
      });
    });
  });

  app.get('/ramos/120', isLoggedIn, function(req, res){

    res.render('menu/ramos/120.ejs',{
      title:title,
      user: req.user,
    });

  });

  app.get('/ramos/120/Voltaje',isLoggedIn,function(req, res){
    res.render('menu/ramos/unidades/120_voltaje.ejs',{
      title:title,
      user:req.user
    });
  });

}
