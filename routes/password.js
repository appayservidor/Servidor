var express = require('express');
var router = express.Router();
var db = require('../helpers/database')();

var comprobacionjwt= require ('../helpers/comprobacionjwt');
var jwt =require("jsonwebtoken");

var nodemailer = require('nodemailer');
const nodemailerDkim = require('nodemailer-dkim');

var mySecretKey="newpassword";


//Peticion de cambio de contraseña. Se llamará cuando alguien no recuerde su contraseña
router.post('/',function(req,res){
    var encontrado=false; 
    req.body.email="emiliomaestre94@gmail.com"; //PARA HACER LAS PRUEBAS
    
    db.getConnection(function(err, connection) {
        if (err) throw err;
		var Email = connection.escape(req.body.email);
        console.log(Email);
		var consulta = "SELECT Email FROM usuarios WHERE Email="+Email;
		connection.query(consulta,function(err, rows, fields){
			if(rows != 0){ // Si que lo ha encontrado
                console.log("Usuario encontrado");
                var token = jwt.sign(req.body.email,mySecretKey);//firmamos el token
                var smtpTransport = nodemailer.createTransport("SMTP",{
                    service: "gmail",
                    auth: {
                        user: "appayoficial@gmail.com",
                        pass: "multimedia"
                    }
                });
                var mailOptions = {
                    from: "<appayoficial@gmail.com>", // sender address
                    to: req.body.email, //
                    subject: "Restablecer contraseña Appay", // Subject line
                    html: `
                        <p>Has solicitado un cambio de contraseña. Pulsa el siguiente botón para cambiar tu contraseña</p> 
                        <a href="http://localhost:3000/resetpassword?token=`+token+`" style="background-color:#EB7035;border:1px solid #EB7035;border-radius:3px;color:#ffffff;display:inline-block;font-family:sans-serif;font-size:16px;line-height:44px;text-align:center;text-decoration:none;width:150px;-webkit-text-size-adjust:none;mso-hide:all;">RESTABLECER CONTRASEÑA</a>
                        <p>Este link sera valido unicamente durante 24 horass</p>
                    `
                }		
                smtpTransport.sendMail(mailOptions, function(error, response){
                    if(error){
                        console.log(error);
                        res.status(300).json(error);
                    }else{
                        console.log("Correo enviado");
                        res.status(200).json("Todo bien todo correcto");
                    }
                });

			}else{
                console.log("Usuario no encontrado"); 
                 res.status(204).json("El usuario no existe");   
			}
		});
	connection.release();
	});
});


//Este get se llamara desde el cliente para ver si el token es correcto
router.get('/',function(req,res){

}

//deberiamos hacer un metodo solo para este para la contraseña
router.put('/')function(req,res){
    
}



module.exports = router; 