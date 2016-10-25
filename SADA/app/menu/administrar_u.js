module.exports = function(app, passport, connection, transporter, dbconfig, title, bcrypt, isLoggedIn) {

  app.get('/administrarUsuarios', isLoggedIn, function(req, res) {
    if (req.user.Profesor != 0) {//Es profe
      res.render('menu/administrar_usuarios.ejs',{
        title:title,
        user:req.user
      });
    }
    else {
        res.redirect('/menu');
    }
  });

}
