var express = require('express');
var router = express.Router();

var db = require('../helpers/database');
var db = db();

var comprobacionjwt= require ('../helpers/comprobacionjwt');
var jwt =require("jsonwebtoken");
var mySecretKey="pepitogrillo";



router.post("/", function(req,res,next){

        var username =req.body.username;
        var password =req.body.password;
        console.log("username es "+username);
        console.log("password es "+password);
        //llamamos a la base de datos para ver si el usuario es correcto o no 
        db.getConnection(function(err, connection) {
            if (err) throw err;
            var consulta="SELECT * from usuarios where Email='"+username+"' and Contra='"+password+"'";
            connection.query(consulta, function(err, rows, fields) {
                if(rows!=null && rows.length != 0){ //si es correcto
                    var user=rows[0];
                    var token = jwt.sign(user,mySecretKey);//firmamos el token
                    return res.status(200).json(token);  //lo enviamos
                }else{
                    return res.status(401).json("El usuario no existe");
                }
          });
        connection.release();
        });
    }); 
    

    router.post("/info", comprobacionjwt, function(req, res, next)
    {
        
        console.log("Entramos en post de info");
       // console.log(req.objeto_token);
        res.status(200).json(req.objeto_token);
    });

module.exports = router;