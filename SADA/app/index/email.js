module.exports = function(app, passport, connection, transporter,dbconfig,title,bcrypt) {

  // =====================================
  // EMAIL / RECOVER  ====================
  // =====================================

  app.get('/recover', function(req, res) {
    if(req.user==undefined){
      res.render('index/index.ejs', {
          message: [],
          title:title,
          recover:true
      });
    }
    else{
        res.redirect('/menu');
    }
  });

  app.post('/recover/changePass',function(req,res){

    if(req.body.password!=req.body.password2){
      res.render('index/recover_pass.ejs', {
          message: 'Contraseñas tienen que ser iguales',
          title:title,
          email:req.body.email,
          form:true
      });
    }
    else{
      if(req.body.password.length<4 || req.body.password.length>20 ){
        res.render('index/recover_pass.ejs', {
            message: 'Contraseña tiene que contener entre 4 a 20 caracteres',
            title:title,
            email:req.body.email,
            form:true
        });
      }
      else{
        console.log('SELECT * FROM '+dbconfig.users_table+' WHERE Correo = "'+req.body.email+'"');
        connection.query('SELECT * FROM '+dbconfig.users_table+' WHERE Correo = "'+req.body.email+'"',function (err,rows) {
          if (err) throw err;
          if(!rows.length){
            res.render('index/recover_pass.ejs', {
                message: 'Usuario no encontrado',
                title:title,
                email:req.body.email,
                form:true
            });
          }
          else{
            var query = 'UPDATE '+dbconfig.users_table+' SET Clave = "'+bcrypt.hashSync( req.body.password, null, null)+'" WHERE Correo = "'+req.body.email+'"';
            connection.query(query,function (err,rows) {
              if (err) throw err;
            });
            res.render('index/recover_pass.ejs', {
                message: '',
                title:title,
                email:req.body.email,
                form:false
            });
          }
        });
      }
    }
  });

  app.post('/recover/recover_pass/form',function(req,res){

    res.render('index/recover_pass.ejs', {
        message: [],
        title:title,
        email:req.body.email,
        form:true
    });

  });

  app.post('/recover', function(req, res) {

      connection.query('SELECT * FROM '+ dbconfig.users_table+' WHERE Correo = ?', [req.body.email], function(err, rows) {
          if (err) throw err;
          if (!rows.length) {
              res.render('index/index.ejs', {
                  message: ["Este email no está registrado aún.", 0],
                  recover:true,
                  title:title
              });
          } else {
              var mailOptions = {
                  from: '<SADA noreply@theBrutalCorp.com>', // sender address
                  to: /*'rodrigo.elicer1@gmail.com',*/ req.body.email, // list of receivers
                  subject: 'Solicitud recuperación de Contraseña', // Subject line
                  text: 'Se ha solicitado recuperar contraseña para el sitio SADA.\n Su contraseña es: ' + rows[0].Clave, // plaintext body
                  html: '<!DOCTYPE html>'+
                        '<html>'+
                        '<head>'+
                          '<title>Page Title</title>'+
                          '<style>'+
                            '.inline {display: inline;}'+
                            '.link-button {background: none;border: none;color: blue;text-decoration: underline;cursor: pointer;font-size: 1em;font-family: serif;}'+
                            '.link-button:focus {outline: none;}'+
                            '.link-button:active {color:red;}'+
                          '</style> '+
                        '</head>'+
                        '<body>'+

                          '<p>Se ha solicitado recuperar la contraseña del sitio SADA para el siguiente correo: '+rows[0].Correo+
                          '<form method="post" class="inline" action="http://localhost:8080/recover/recover_pass/form">'+
                            '<input type="hidden" name="email" value='+rows[0].Correo+'>'+
                            '<button type="submit" class="link-button">Cambiar Contraseña<button>'+
                          '</form>'+
                          '</p><p> Su contraseña actual es: <b>' + rows[0].Clave + '</b></p>'+

                        '</body>'+
                        '</html>'
                  };
              // send mail with defined transport object
              transporter.sendMail(mailOptions, function(error, info) {
                  if (error) {
                      console.log(error);
                  } else {
                      console.log('Message sent: ' + info.response);
                  }
              });

              res.render('index/index.ejs', {
                  message: ["Email enviado satisfactoriamente.", 1],
                  recover:true,
                  title:title
              });
          }
      });

  });


}
