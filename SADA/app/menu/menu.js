module.exports = function(app, passport, connection, transporter,dbconfig,title,bcrypt,isLoggedIn_Encuesta) {

  // =====================================
  // MENU ================================
  // =====================================

  app.get('/menu', isLoggedIn_Encuesta, function(req, res) {
      if (req.user.Profesor == 0) { //Es alumno
          if (req.user.perfil_idperfil == null) {
              res.render('menu/encuesta.ejs', { title: title }); //Te manda a encuesta
          }
          else {
              res.render('menu/menu.ejs', { title:title, user: req.user }); //Te redirige a menu
          }
      } //Es profe, manda directamente a menu
      else {
          res.render("menu/menu.ejs", { title:title, user: req.user });
      }
  });

  app.post('/menu', function(req, res) { //Respondiendo encuesta

      connection.query('UPDATE usuario SET perfil_idperfil= ? WHERE Rut = ?', [req.body.result, req.user.Rut], function(err, rows, fields) {
          if (err) throw err;
      });

      console.log("menu querypost");
      console.log(req.user);

      res.render('menu/menu.ejs', {
          title: title,
          perfil: req.body.result,
          user:req.user
      }); //
  });


}
