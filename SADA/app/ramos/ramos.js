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
      req.session.idUnidad = req.body.idUnidad;
      res.redirect("/ramos/u/materia");
  });

  app.get('/ramos/u/materia',isLoggedIn,function(req,res){
      connection.query('SELECT * FROM plantilla WHERE Activo=1 AND  perfil_idperfil = ? AND Unidad_idUnidad = ?',[req.user.perfil_idperfil,req.session.idUnidad], function(err, plantilla) {
        connection.query('SELECT * FROM ensamblaje INNER JOIN modulo ON ensamblaje.Modulo_idModulo=modulo.idModulo WHERE Plantilla_idPlantilla=? ORDER BY columna ASC, posicion ASC',[plantilla[0].idPlantilla], function(err, modulos) {
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


  app.post('/valorar',isLoggedIn,function(req,res){
      var plantilla=parseInt(req.body.idPlantilla), estrellas=parseInt(req.body.estrellas);
      connection.query('UPDATE plantilla SET valoracion=((valoracion*conteo)+?)/(conteo+1),conteo=conteo+1 WHERE idPlantilla=?',[estrellas,plantilla], function(err, plantilla) {
          console.log([req.body.estrellas,req.body.idPlantilla]);
          res.redirect("/ramos/u/materia");
      });

  });

}
