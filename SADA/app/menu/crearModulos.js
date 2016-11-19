module.exports = function(app, passport, connection, transporter, dbconfig, title, bcrypt, isLoggedIn) {


    app.get('/crearModulos', isLoggedIn, function(req, res) {

        if (req.user.Profesor == 0) {
            res.redirect('/');
        }
        connection.query('SELECT * FROM unidad', function(err, rows, fields) {
            if (err) throw err;

            res.render("crearModulos.ejs", {
                title: title,
                user: req.user,
                unidadsos: rows
            });
        });
    });

}
