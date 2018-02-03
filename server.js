let express = require("express");
let server = express();
let PORT = 3000;

let db = require('./data/database');

server.use(express.static(__dirname + '/dist'));

db.sequelizeInstance.sync({force: true}).then(function(){
    console.log('db is ready');
    server.listen(PORT, function(){
        console.log('server listening on port: ' + PORT);
    })
});