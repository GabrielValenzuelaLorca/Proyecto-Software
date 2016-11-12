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

}
