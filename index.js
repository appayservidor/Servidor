var app   = require('express')();
var express = require('express');
var http = require('http').Server(app);

var passport = require('passport');
var session = require('express-session');
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var cors= require('cors');
//RUTAS
var productos=(require('./routes/productos'));
var usuarios=(require('./routes/usuarios')); 
var tiendas=(require('./routes/tiendas')); 
var api=(require('./routes/api'));
var acceso=(require('./routes/acceso'));  
var shopping=require('./routes/shopping');
var loginjwt=require('./routes/loginjwt');
var provincias=require('./routes/provincias');
var comunidades=require('./routes/comunidades');
var municipios=require('./routes/municipios');
var facturas=require('./routes/facturas');
//CORS, PERMITIMOS  ACCESO A LA API SOLO EN ESTAS RUTAS
var whitelist = [
    'http://localhost:3000',
    'http://localhost:4200',
]; 
var corsOptions = {
    origin: function(origin, callback){
        var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
    },
    credentials: true
};
app.use(cors(corsOptions));
//PASSPORT
app.use(session({ secret: 'emiliomola' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

//USO RUTAS
app.use('/productos',productos);
app.use('/usuarios',usuarios);
app.use('/tiendas',tiendas);
app.use('/api',api);
app.use('/acceso',acceso);
app.use('/shopping',shopping);
app.use('/loginjwt',loginjwt);
app.use('/provincias',provincias);
app.use('/comunidades',comunidades);
app.use('/municipios',municipios);
app.use('/facturas',facturas);

app.get('/', function(req, res) {
    res.send("APPAY SERVIDOR");
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});