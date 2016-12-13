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
                   
                      html: "<!DOCTYPE html><html><head><title>Confirmación de Registro</title></head><body><table class='m_-53860054195334869body-wrap' bgcolor='#EEE' style='border-radius: 10px; font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;width:100%;margin:0;padding:16px'><tbody><tr style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;margin:0;padding:0'>  <td class='m_-53860054195334869container' bgcolor='#003a6b' style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;display:block!important;max-width:600px!important;clear:both!important;margin:0 auto;padding:20px;border:1px solid #eee'><br style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;margin:0;padding:0'><p align='center' class='m_-53860054195334869logo' style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;font-weight:normal;margin:0 0 10px;padding:0'><img align='center' class='m_-53860054195334869logo CToWUd' alt='APPAY' border='0' width='400' src='http://apis.appay.es/images/logo_web_blanco_negro%20(1).png' style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;max-width:100%;margin:0;padding:0'></p></td></tr>    <tr style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;margin:0;padding:0'><td class='m_-53860054195334869container' bgcolor='#FFFFFF' style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;display:block!important;max-width:600px!important;clear:both!important;margin:0 auto;padding:20px;border:1px solid #eee'><div class='m_-53860054195334869content' style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;max-width:600px;display:block;margin:0 auto;padding:0'><table style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;width:100%;margin:0;padding:0'><tbody><tr style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;margin:0;padding:0'><td style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;margin:0;padding:0'><p style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;font-weight:normal;margin:0 0 10px;padding:0'>Hola,</p><p style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;font-weight:normal;margin:0 0 10px;padding:0'>Gracias por confiar en appay</p><h1 style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:24px;color:#003a6b;line-height:1.2;font-weight:bold;margin:16px 0 10px;padding:0'>Cambio de contraseña</h1><p style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;font-weight:normal;margin:0 0 10px;padding:0'>Hemos recibido una solicitud para cambiar la contraseña de tu cuenta de appay</p><p style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;font-weight:normal;margin:0 0 10px;padding:0'>Para cambiar la contraseña solo tienes que hacer click en el siguiente botón:</p><p style='text-align:center;' ><a class='btn' href='http://localhost:3000/cambiarpass?token="+token+"' style='-webkit-border-radius: 60;-moz-border-radius: 60;border-radius: 60px;text-shadow: 1px 1px 3px #666666;-webkit-box-shadow: 10px 12px 12px #666666;-moz-box-shadow: 10px 12px 12px #666666;box-shadow: 10px 12px 12px #666666;font-family: Arial;color: #ffffff;font-size: 22px;background: #003a6b;padding: 5px 20px 5px 20px;border: dotted #1f628d 7px;text-decoration: none;'>Cambiar</a></p><p style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;font-weight:normal;margin:0 0 10px;padding:0'>Si el botón no funciona, por favor, copia y pega la siguiente dirección URL en tu navegador:</p><p style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;font-weight:normal;margin:0 0 10px;padding:0'> http://localhost:3000?token="+token+"</p><p style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;font-weight:normal;margin:0 0 10px;padding:0'>Este enlace expirará tras 24 horas. Si no has solicitado el cambio de la contraseña, ignora este mensaje. No te preocupes, no se aplicarán cambios a tu cuenta.</p></td></tr></tbody></table></div></td><td style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;margin:0;padding:0'></td></tr></tbody></table></body></html>" // html body
                    
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

/*
//Este get se llamara desde el cliente para ver si el token es correcto
router.get('/',function(req,res){

}
*/





/*
//deberiamos hacer un metodo solo para este para la contraseña
router.put('/')function(req,res){

}
*/



module.exports = router; 