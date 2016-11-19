module.exports = function(app, passport, connection, transporter, dbconfig, title, bcrypt, isLoggedIn) {

  app.get('/administrarUsuarios', isLoggedIn, function(req, res) {
    if (req.user.Profesor != 0) {//Es profe
      connection.query("SELECT * FROM usuario",function(err,rows,fields){
        if (err) throw err;

        res.render('menu/administrar_usuarios.ejs',{
          title:title,
          user:req.user,
          usuarios:rows
        });

      });
    }//end if profe
    else {
        res.redirect('/menu');
    }
  });

  app.post('/editarUsuario',isLoggedIn, function(req, res){
    connection.query('select * from usuario',function(err,rows,fields){
      if(err) throw err;

      res.redirect('/administrarUsuarios');
    });
  });

  app.post('/eliminarUsuario',isLoggedIn, function(req, res){
    connection.query('DELETE FROM contrato WHERE usuario_Rut = ?',[req.body.rut],function(err1,rows1,fields1){
      if(err1) throw err1;
      connection.query('DELETE FROM usuario WHERE Rut = ?',[req.body.rut],function(err,rows,fields){
        if(err) throw err;
        res.redirect('/administrarUsuarios');
      });
    });
  });

}
