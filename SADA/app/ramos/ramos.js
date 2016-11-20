module.exports = function(app, passport, connection, transporter, dbconfig, title, bcrypt, isLoggedIn) {

  // =====================================
  // RAMOS ===============================
  // =====================================

  app.get('/ramos', isLoggedIn, function(req, res) {
    connection.query('SELECT * FROM ramo', function(err, rows, fields) {
      if (err) throw err;
      res.render('ramos/ramos.ejs', {
          title: title,
          user: req.user,
          rows:rows
      });
    });
  });

  app.post('/ramos/u',isLoggedIn,function(req,res){

    req.session.idRamo = req.body.ramo_id;
    res.redirect("/ramos/u");

  });

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

  app.post('/ramos/u/materia',isLoggedIn,function(req,res){
    var perfilAux;

    if(req.user.Profesor==1){
      perfilAux = req.session.perfilTemp;
    }
    else{
      perfilAux = req.user.perfil_idperfil;
    }
    connection.query('SELECT * FROM plantilla WHERE Activo=1 AND perfil_idperfil = ? AND Unidad_idUnidad = ?',[perfilAux,req.body.idUnidad], function(err, plantilla) {
      connection.query('SELECT * FROM ensamblaje INNER JOIN modulo ON ensamblaje.Modulo_idModulo = modulo.idModulo WHERE Plantilla_idPlantilla = ? ORDER BY columna ASC, posicion ASC',[plantilla[0].idPlantilla], function(err, modulos) {
          if (err) throw err;
          res.render("ramos/plantilla.ejs",{
            title:title,
            user:req.user,
            plantilla:plantilla[0],
            modulos:modulos
          });

      });
    });//end query
  });
}
