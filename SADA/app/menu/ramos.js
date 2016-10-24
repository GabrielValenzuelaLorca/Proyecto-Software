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

  app.post('/ramos', isLoggedIn, function(req, res){
    if(req.body.sigla_ramo == "FIS120"){
      res.render('menu/ramos/120',{
        title:title,
        user: req.user,
        id_ramo: req.body.id_ramo,
        nombre_ramo: req.body.nombre_ramo,
        sigla_ramo: req.body.sigla_ramo
      });
    }
    else{
      res.redirect('/menu');
    }
  });

}
