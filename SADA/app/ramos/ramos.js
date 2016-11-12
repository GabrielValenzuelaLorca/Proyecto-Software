module.exports = function(app, passport, connection, transporter,dbconfig,title,bcrypt,isLoggedIn) {

  //requires
  require('./FIS120.js')(app, passport, connection, transporter,dbconfig,title,bcrypt,isLoggedIn);
  require('./FIS140.js')(app, passport, connection, transporter,dbconfig,title,bcrypt,isLoggedIn);

  // =====================================
  // RAMOS ===============================
  // =====================================

  app.get('/ramos', isLoggedIn, function(req, res) {
    connection.query('SELECT * FROM ramo', function(err, rows, fields) {
      if (err) throw err;
      //console.log('RAMO '+ rows[0].Nombre);
      res.render('ramos/ramos.ejs', {
          title: title,
          user: req.user,
          rows:rows
      });
    });
  });

  app.post('/ramos/u',isLoggedIn,function(req,res){

    req.session.idRamo = req.body.ramo_id;

    if(req.body.ramo_sigla=="FIS120"){
      res.redirect("/ramos/120");
    }
    else if(req.body.ramo_sigla=="FIS140"){
      res.redirect("/ramos/140");
    }
    else{
      res.redirect("/");
    }
  });

  app.post('/ramos/u/materia',isLoggedIn,function(req,res){

    if(req.body.nombreUnidad=="Voltaje"){
      res.redirect("/ramos/120/voltaje");
    }
    else{
      res.redirect("/");
    }

  });

}
