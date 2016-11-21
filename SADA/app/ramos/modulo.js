module.exports = function(app, passport, connection, transporter, dbconfig, title, bcrypt, isLoggedIn) {

    app.post('/modulo', isLoggedIn, function(req, res) {

        var informacion = req.body.contenido;
        var tipo = req.body.tipo;
        var unidad= req.body.unidad_id;

        connection.query('INSERT INTO modulo (Tipo, Informacion, Unidad_idUnidad) VALUES (?, ?, ?)',[tipo,informacion,unidad] ,function (err, rows) {
            if (err) throw err;

            console.log('holaza');
        });
        res.render("ramos/crearModulos.ejs", {
            title: title,
            user: req.user,
            unidad_id:req.body.unidad_id,
            unidad_nombre:req.body.unidad_nombre
        });

    });

    app.post('/crearModulos', isLoggedIn, function(req, res) {
        res.render("ramos/crearModulos.ejs", {
            title: title,
            user: req.user,
            unidad_id:req.body.unidad_id,
            unidad_nombre:req.body.unidad_nombre
        });
    });

    app.post('/editarModulo', isLoggedIn, function(req, res) {

        var posComa = req.body.modulitos.indexOf(",");
        var id = req.body.modulitos.slice(0, posComa);
        console.log(id);
        connection.query('SELECT * FROM modulo WHERE idModulo =?;',id ,function (err, rows) {
            if (err) throw err;


            console.log('holaza');

            res.render("ramos/editarModulo.ejs", {
                title: title,
                user: req.user,
                moduloObjetivo:rows,
                unidad_id:req.body.unidad_id,
                unidad_nombre:req.body.unidad_nombre
            });

        });

    });
    app.post('/editModulo', isLoggedIn, function(req, res) {

        var tipo = req.body.tipo;
        var id = req.body.modulo_id;
        var contenido = req.body.contenido;

        connection.query('UPDATE modulo SET Tipo=?,Informacion=? WHERE idModulo =?;',[tipo, contenido, id] ,function (err, rows) {
            if (err) throw err;

            connection.query('SELECT * FROM modulo WHERE Unidad_idUnidad = ?',[req.body.unidad_id],function(err, rows, fields) {
                if (err) throw err;
                res.render("ramos/crearPlantilla.ejs", {
                    title: title,
                    user: req.user,
                    unidad_id: req.body.unidad_id,
                    unidad_nombre: req.body.unidad_nombre,
                    modulasos: rows
                });
            });
        });

    });
    app.post('/borrarModulo', isLoggedIn, function(req, res) {

        var id = req.body.modulo_id;

        connection.query('DELETE FROM ensamblaje WHERE Modulo_idModulo =?;',id ,function (err, rows) {
            if (err) throw err;
        });

        connection.query('DELETE FROM plantilla WHERE NOT EXISTS (SELECT 1 FROM ensamblaje WHERE ensamblaje.plantilla_idPlantilla = plantilla.idPlantilla);',function (err, rows) {
            if (err) throw err;
        });

        connection.query('DELETE FROM modulo WHERE idModulo =?;',id ,function (err, rows) {
            if (err) throw err;
        });

        connection.query('SELECT * FROM modulo WHERE Unidad_idUnidad = ?',[req.body.unidad_id],function(err, rows, fields) {
            if (err) throw err;
            res.render("ramos/crearPlantilla.ejs", {
                title: title,
                user: req.user,
                unidad_id: req.body.unidad_id,
                unidad_nombre: req.body.unidad_nombre,
                modulasos: rows
            });
        });

    });

    app.post('/revisarPlantillas', isLoggedIn, function(req, res) {

        var id = req.body.unidad_id;

        connection.query('Select * FROM plantilla WHERE Unidad_idUnidad = ? AND plantilla.propuesta=1 ;', id ,function (err, rows) {
            if (err) throw err;

            res.render("ramos/crearPlantilla.ejs", {
                title: title,
                user: req.user,
                unidad_id: req.body.unidad_id,
                unidad_nombre: req.body.unidad_nombre,
                plantilla: rows
            });

        });

    });
}
