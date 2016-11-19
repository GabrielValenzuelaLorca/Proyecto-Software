module.exports = function(app, passport, connection, transporter, dbconfig, title, bcrypt, isLoggedIn) {

    app.get('/modulos', isLoggedIn, function(req, res) {

      if(req.user.Profesor==0){
        res.redirect('/');
      }
      connection.query('SELECT * FROM modulo', function(err, rows, fields) {
          if (err) throw err;

          res.render("modulos.ejs", {
              title: title,
              user: req.user,
              modulasos: rows
          });
      });
    });

}
