module.exports = function(app, passport, connection, transporter,dbconfig,title,bcrypt,isLoggedIn) {

      // =====================================
      // PERFIL ==============================
      // =====================================

      // we will want this protected so you have to be logged in to visit
      // we will use route middleware to verify this (the isLoggedIn function)
      app.get('/profile', isLoggedIn, function(req, res) {
          res.render('menu/profile.ejs', {
              title: title,
              user: req.user // get the user out of session and pass to template
          });
      });

      app.get('/change_pass',isLoggedIn, function(req,res){
          res.render('menu/change_pass.ejs',{
            title:title,
            user: req.user,
            message:"",
            exito:false
          });
      });

      app.post('/change_pass',function(req,res){
        //req.body.curr_pass
        //req.body.new_pass
        //req.body.new_pass2
        console.log('SELECT * FROM '+dbconfig.users_table+' WHERE Correo = '+req.user.Correo);
        connection.query('SELECT * FROM '+dbconfig.users_table+' WHERE Correo = ?',[req.user.Correo],function(err,rows){
          if (err) throw err;

          if(!bcrypt.compareSync(req.body.curr_pass, rows[0].Clave)){
            res.render('menu/change_pass.ejs',{
              title:title,
              user: req.user,
              message:"Contraseña incorrecta",
              exito:false
            });
          }
          else if(req.body.new_pass!=req.body.new_pass2){
            res.render('menu/change_pass.ejs',{
              title:title,
              user: req.user,
              message:"Contraseñas no coinciden",
              exito:false
            });
          }
          else if(req.body.new_pass.length<4 || req.body.new_pass.length>20 ){
            res.render('menu/change_pass.ejs', {
                title:title,
                user: req.user,
                message: 'Contraseña tiene que contener entre 4 a 20 caracteres',
                exito:false
            });
          }
          else{
            connection.query('UPDATE '+dbconfig.users_table+' SET Clave = ? WHERE Correo = ?',[bcrypt.hashSync(req.body.new_pass, null, null),req.user.Correo],function(err,rows){
              if (err) throw err;
            });
            res.render('menu/change_pass.ejs', {
                title:title,
                user: req.user,
                message: 'Contraseña cambiada exitosamente',
                exito:true
            });

          }

        });
      });

}
