/**
 * Created by rodri on 10-09-2016.
 */
module.exports = {
    Ctm : function () {
        var mysql = require('mysql');
        var dbconfig = require('./database');
        var connection = mysql.createConnection(dbconfig.connection);
        connection.query('USE ' + dbconfig.database);
    }
}