var express     = require("express");
var cors        = require('cors');
var bodyParser  = require("body-parser");
var routes      = require("./routes/routes.js");
var app         = express();
const port      = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

var server = app.listen(port, function () {
    console.log("Servidor disponible en el puerto:", server.address().port);
});

app.get('/', function(req, res){
    res.sendfile('indice.html');
});

//require('./app/routes')(app, {});
