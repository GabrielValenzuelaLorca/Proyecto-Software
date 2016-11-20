module.exports = function(app, passport, connection, transporter, dbconfig, title, bcrypt, isLoggedIn) {

    var indice='normal';

  app.get('/administrarUsuarios', isLoggedIn, function(req, res) {
    if (req.user.Profesor != 0) {//Es profe
      if (indice=='nombre') var query="SELECT * FROM usuario ORDER BY Nombre";
      else if (indice=='rut') var query="SELECT * FROM usuario ORDER BY Rut";
      else if (indice=='profesores') var query="SELECT * FROM usuario ORDER BY Profesor DESC";
      else if (indice=='alumnos') var query="SELECT * FROM usuario ORDER BY Profesor ASC";
      else var query="SELECT * FROM usuario";
      connection.query("SELECT * FROM contrato",function(err,contrato){
          connection.query("SELECT * FROM ramo",function(err,ramos){
              connection.query(query,function(err,rows,fields){
                if (err) throw err;
                res.render('menu/administrar_usuarios.ejs',{
                  title:title,
                  user:req.user,
                  usuarios:rows,
                  ramos:ramos,
                  contrato:contrato
                });
              });
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

  app.post('/ordenarUsuario',isLoggedIn, function(req, res){
      indice=req.body.indice;
      res.redirect('/administrarUsuarios');
  });

  app.post('/enlazarRamo',isLoggedIn, function(req, res){
      connection.query("INSERT INTO contrato VALUES (?,?)",[req.body.ramo,req.body.rut],function(err,rows){
           if(err) throw err;
           res.redirect('/administrarUsuarios');
      });
  });

}
