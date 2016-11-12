module.exports = function(app, passport, connection, transporter,dbconfig,title,bcrypt,isLoggedIn) {

  // =====================================
  // RAMOS ===============================
  // =====================================

  app.get('/ramos/140', isLoggedIn, function(req, res) {
  /*  connection.query('SELECT * FROM ramo', function(err, rows, fields) {
      if (err) throw err;

    });//end query
*/

    res.render("ramos/140.ejs",{
      title:title,
      user:req.user,
      id:req.session.idRamo
    });

  });

}
