var express     = require("express");
var cors        = require('cors');
var bodyParser  = require("body-parser");
var app         = express();
const port      = 9090;



//app.use(require('connect').bodyParser());
//app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

var routes      = require("./routes/routes.js");

routes(app);

var server = app.listen(port, function () {
    console.log("Servidor disponible en el puerto:", server.address().port);
});

app.get('/', function(req, res){
    res.send('Grupo 3');
});

//require('./app/routes')(app, {});
