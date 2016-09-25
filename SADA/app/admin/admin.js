module.exports = function(app, passport, connection, transporter,dbconfig,title,bcrypt) {

  // =====================================
  // ADMIN PAGE  =========================
  // =====================================

  app.get('/admin',function(req,res){//Si no existe ningún admin, se puede ingresar a esta página
    connection.query("SELECT * FROM " + dbconfig.users_table + " WHERE Admin = 1 ", function(err, rows) {
      if (!rows.length){
        res.render('admin.ejs',{title:title});
      }
      else{
        res.redirect('/menu');
      }
    });
  });

  app.post('/admin',function(req,res){
        // Se crea el usuario
        var newUserMysql = {
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, null, null), // use the generateHash function in our user model
            name: req.body.username,
            rut:req.body.rut,
            admin:1,
            profesor:1
        };
        var insertQuery = "INSERT INTO " + dbconfig.users_table + " ( Rut, Nombre, Correo, Clave, Admin, Profesor) values (?,?,?,?,?,?)";
        connection.query(insertQuery, [newUserMysql.rut, newUserMysql.name, newUserMysql.email, newUserMysql.password, newUserMysql.admin, newUserMysql.profesor], function(err, rows) {
        });
        res.send('Se agregó Admin correctamente');
  });

}
