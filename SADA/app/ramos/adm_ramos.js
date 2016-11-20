module.exports = function(app, passport, connection, transporter, dbconfig, title, bcrypt, isLoggedIn) {

  // =====================================
  // ADM_RAMOS ===============================
  // =====================================

  app.get('/administrar_ramos',isLoggedIn,function(req, res){
    if(req.user.Profesor==0){
      res.redirect('/');
    }//end alumno
    if(req.user.Admin==1){
      connection.query('SELECT * FROM ramo', function(err, rows, fields) {
        if (err) throw err;
        res.render('ramos/adm_ramos.ejs', {
            title: title,
            user: req.user,
            rows:rows
        });
      });
    }//end admin
    else{
      connection.query('SELECT * FROM (SELECT * FROM ramo INNER JOIN contrato on ramo.idRamo=contrato.ramo_idRamo) as c WHERE usuario_Rut = ?',[req.user.Rut],function(err,rows,fields){
        if(err) throw err;
        res.render('ramos/adm_ramos.ejs', {
            title: title,
            user: req.user,
            rows:rows
        });
      });

    }//end profesor

  });

  app.post('/adm_unidades',isLoggedIn,function(req, res){
    connection.query('SELECT * FROM unidad where Ramo_idRamo = ?',[req.body.ramo_id], function(err, rows, fields) {
      if (err) throw err;
      res.render('ramos/adm_unidades.ejs', {
          title: title,
          user: req.user,
          unidades:rows,
          ramo_nombre:req.body.ramo_nombre
      });
    });
  });

  app.post('/adm_plantilla',isLoggedIn,function(req, res){
    connection.query('SELECT * FROM modulo WHERE Unidad_idUnidad = ?',[req.body.unidad_id],function(err, rows, fields) {
        if (err) throw err;
        res.render("ramos/crearPlantilla.ejs", {
            title: title,
            user: req.user,
            unidad_id: req.body.unidad_id,
            unidad_nombre: req.body.unidad_nombre,
            modulasos: rows
        });
    });
  });

  app.post('/agregarPlantilla', isLoggedIn, function(req, res){
    var sort1 = req.body.sort1.split(",");
    var sort2 = req.body.sort2.split(",");
    var sort3 = req.body.sort3.split(",");

    console.log("AAAA: "+sort1);
    console.log("AAAA: "+sort2);
    console.log("AAAA: "+sort3);

    connection.query('INSERT INTO plantilla (Nombre, perfil_idperfil, Unidad_idUnidad) VALUES (?, ?, ?) ',[req.body.plantillaSave, 1, req.body.unidad_id],function(err, rows, fields){
      if(err) throw err;
    });


    res.redirect('/');
  });

}
