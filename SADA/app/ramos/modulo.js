module.exports = function(app, passport, connection, transporter, dbconfig, title, bcrypt, isLoggedIn) {

    app.post('/modulo', isLoggedIn, function(req, res) {

        var informacion = req.body.contenido;
        var tipo = req.body.tipo;
        var unidad= req.body.unidad_id;

        connection.query('INSERT INTO modulo (Tipo, Informacion, Unidad_idUnidad) VALUES (?, ?, ?)',[tipo,informacion,unidad] ,function (err, rows) {
            if (err) throw err;

            console.log('holaza');
        });
        res.render("crearModulos.ejs", {
            title: title,
            user: req.user,
            unidad_id:req.body.unidad_id,
            unidad_nombre:req.body.unidad_nombre
        });

    });

    app.post('/crearModulos', isLoggedIn, function(req, res) {
        res.render("crearModulos.ejs", {
            title: title,
            user: req.user,
            unidad_id:req.body.unidad_id,
            unidad_nombre:req.body.unidad_nombre
        });
    });
}
