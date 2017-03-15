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
var provincia=require('./routes/provincia');
var comunidad=require('./routes/comunidad');
var localidad=require('./routes/localidad');
var facturas=require('./routes/facturas');
var resetpassword=require('./routes/resetpassword');
var confirmaremail=require('./routes/confirmaremail');
var ofertas=require('./routes/ofertas');
var estadisticas=require('./routes/Estadisticas');
var apiBackup=require('./routes/apiBackup');
var controlventas=require('./routes/controlventas');
var contacto=require('./routes/contacto');

//CORS, PERMITIMOS  ACCESO A LA API SOLO EN ESTAS RUTAS
var whitelist = [
    'http://localhost:3000',
    'http://localhost:4200',
    'http://localhost:8100',
    'http://localhost:5000',
    'http://localhost:8888',
    'https://appay.es',
    'https://appay-aefd5.firebaseapp.com',
    'https://admin.appay.es',
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
app.use('/provincia',provincia);
app.use('/comunidad',comunidad);
app.use('/localidad',localidad);
app.use('/facturas',facturas);
app.use('/resetpassword',resetpassword);
app.use('/ofertas',ofertas);
app.use('/estadisticas',estadisticas);
app.use('/confirmaremail',confirmaremail);
app.use('/store',apiBackup);
app.use('/controlventas',controlventas);
app.use('/contacto',contacto);
//Esto es para enviar
app.get('/', function(req, res) {
    res.send("APPAY SERVIDOR FUNCIONANDO1");
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});  
