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

  app.post('/adm_plantilla', isLoggedIn, function(req, res){
    res.render("ramos/adm_plantilla.ejs",{
      title: title,
      user: req.user,
      unidad_id: req.body.unidad_id,
      unidad_nombre: req.body.unidad_nombre,
    });
  });

  app.post('/crear_plantilla',isLoggedIn,function(req, res){
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

  app.post('/agregar_plantilla', isLoggedIn, function(req, res){
    var col1 = req.body.sort1.split(",");
    var col2 = req.body.sort2.split(",");
    var col3 = req.body.sort3.split(",");

    console.log("col1: "+col1);
    console.log("col2: "+col2);
    console.log("col3: "+col3);

    var noentrar = false;

    var exito = 1;
    var mensaje = "La plantilla fue agregada con éxito."

    //Ve si ya existe una plantilla con el mismo nombre
    connection.query('SELECT * FROM plantilla WHERE Nombre = ? AND Unidad_idUnidad = ?',[req.body.plantillaSave,req.body.unidad_id],function(err, filas, fields){
      if(err) throw err;
      if(filas.length>0){
        noentrar=true;
        exito=0;
        mensaje = "No puede haber otra plantilla con el mismo nombre."
      };

      //Agrega plantilla
      if(!noentrar){
        connection.query('INSERT INTO plantilla (Nombre, perfil_idperfil, Unidad_idUnidad) VALUES (?, ?, ?) ',[req.body.plantillaSave, req.body.perfil, req.body.unidad_id],function(err, rows, fields){
          if(err) throw err;
          //Busca id plantilla agregada para luego agregar a ensamblaje
          connection.query('SELECT * FROM plantilla WHERE Nombre = ? AND Unidad_idUnidad = ?',[req.body.plantillaSave,req.body.unidad_id],function(err, rows, fields){
            if(err) throw err;
            if(col1!=''){
              for(var i = 0;i<col1.length;i++){
                connection.query('INSERT INTO ensamblaje VALUES (?,?,?,?)',[rows[0].idPlantilla,col1[i],1,i],function(err1, rows1, fields1){
                  if(err1) throw err1;
                });
              }
            }
            if(col2!=''){
              for(var i = 0;i<col2.length;i++){
                connection.query('INSERT INTO ensamblaje VALUES (?,?,?,?)',[rows[0].idPlantilla,col2[i],2,i],function(err1, rows1, fields1){
                  if(err1) throw err1;
                });
              }
            }
            if(col3!=''){
              for(var i = 0;i<col3.length;i++){
                connection.query('INSERT INTO ensamblaje VALUES (?,?,?,?)',[rows[0].idPlantilla,col3[i],3,i],function(err1, rows1, fields1){
                  if(err1) throw err1;
                });
              }
            }
          });
        });
      }
      res.render('ramos/exito.ejs',{
        title: title,
        user: req.user,
        mensaje: mensaje,
        exito: exito
      });
    });//end query grande
  });

  app.post('/ver_plantillas', isLoggedIn, function(req, res){

    if(req.body.activar=='1'){
      connection.query('UPDATE plantilla SET Activo = 0 WHERE perfil_idperfil = ?',[req.body.profile],function(err, rows, fields){
        if(err) throw err;
        connection.query('UPDATE plantilla SET Activo = 1 WHERE idPlantilla = ?',[req.body.plantilla_id],function(err, rows, fields){
          if(err) throw err;
          connection.query('SELECT * FROM plantilla WHERE Unidad_idUnidad = ?',[req.body.unidad_id],function(err, filas, fields){
            if(err) throw err;

            res.render('ramos/ver_plantillas.ejs',{
              title: title,
              user: req.user,
              plantillas: filas,
              unidad_id:req.body.unidad_id,
              unidad_nombre:req.body.unidad_nombre,
              profile:req.body.profile,
            });

          });
        });
      });
    }
    else{
      connection.query('SELECT * FROM plantilla WHERE Unidad_idUnidad = ?',[req.body.unidad_id],function(err, filas, fields){
        if(err) throw err;

        res.render('ramos/ver_plantillas.ejs',{
          title: title,
          user: req.user,
          plantillas: filas,
          unidad_id:req.body.unidad_id,
          unidad_nombre:req.body.unidad_nombre,
          profile:req.body.profile,
        });

      });
    }
  });
  app.post('/aprobar_plantilla', isLoggedIn, function(req, res){
     console.log("llegamolinos");

     connection.query('UPDATE plantilla SET propuesta = 0 WHERE idPlantilla = ?',req.body.plantilla_id,function(err, filas, fields){
       if(err) throw err;

      connection.query('SELECT * FROM plantilla WHERE Unidad_idUnidad = ?',[req.body.unidad_id],function(err, filas, fields){
        if(err) throw err;
        res.render('ramos/ver_plantillas.ejs',{
          title: title,
          user: req.user,
          plantillas: filas,
          unidad_id:req.body.unidad_id,
          unidad_nombre:req.body.unidad_nombre,
          profile:req.body.profile,
        });
      });
    });

  });
  app.post('/denegar_plantilla', isLoggedIn, function(req, res){
     console.log("llegoncio");

     connection.query('DELETE FROM ensamblaje WHERE Plantilla_idPlantilla=?;',req.body.plantilla_id,function(err, filas, fields){
       if(err) throw err;

       connection.query('DELETE FROM plantilla WHERE idPlantilla=?;',req.body.plantilla_id,function(err, filas, fields){
         if(err) throw err;

         res.render('ramos/ver_plantillas.ejs',{
           title: title,
           user: req.user,
           plantillas: req.body.tillas,
           unidad_id:req.body.unidad_id,
           unidad_nombre:req.body.unidad_nombre,
           profile:req.body.profile,
         });
      });
    });
  });

  app.post('/analisisDePlantilla',isLoggedIn,function(req,res){
    var perfilAux;
    console.log("yahoo");
    if(req.user.Profesor==1){
      perfilAux = req.session.perfilTemp;
    }
    else{
      perfilAux = req.user.perfil_idperfil;
    }
    console.log(req.body.plantilla_id);
    connection.query('SELECT * FROM plantilla WHERE idplantilla= ? ;',req.body.plantilla_id, function(err, plantilla) {
      connection.query('SELECT * FROM ensamblaje INNER JOIN modulo ON ensamblaje.Modulo_idModulo=modulo.idModulo WHERE Plantilla_idPlantilla=? ORDER BY columna ASC, posicion ASC ;',[req.body.plantilla_id], function(err, modulos) {
          if (err) throw err;
          res.render("ramos/analisisDePlantilla.ejs",{
            title:title,
            user:req.user,
            plantilla:plantilla[0],
            modulos:modulos,
            nombreUnidad:req.session.nombreUnidad
          });
      });
    });//end query

  });



}
