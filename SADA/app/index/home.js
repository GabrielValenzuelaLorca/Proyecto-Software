module.exports = function(app, passport, connection, transporter,dbconfig,title,bcrypt) {

  // =====================================
  // HOME PAGE  ==========================
  // =====================================

  app.get('/', function(req, res) {
   if(req.user==undefined){
       var messages = req.flash('error');
       res.render('index/index.ejs', {
           title: title,
           messages: messages,
           recover:false,
       }); // inicio
   }
   else{
       res.redirect('/menu');
   }
  });

}
