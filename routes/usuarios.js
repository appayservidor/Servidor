/**************************************************************************
 **************************************************************************
 **** AQUI SE HARAN TODAS LAS PETICIONES RELACIONADAS CON LOS USUARIOS ****
 **************************************************************************
 **************************************************************************/
var nodemailer = require('nodemailer');
const nodemailerDkim = require('nodemailer-dkim');


//Funcion que genera el GET de Usuarios
function getUsuarios (app, connection) {
	app.get('/usuarios',function(req,res){
		var data = {
			"Usuarios":""
		};

		var id = connection.escape(req.query.id); //Variable que recoje el id del usuario de la URI usuarios?id={num}
	
		if(id != 'NULL'){ //Si en la URI existe se crea la consulta de busqueda por id
			var consulta="SELECT u.Id_usuario, u.DNI, u.Nombre, u.Email, u.Direccion, c.Comunidad, p.Provincia, m.Municipio, u.CP, u.Telefono, u.Foto, t.Nombre_rol, u.Estado, u.Eliminado FROM usuarios u JOIN municipios m ON m.Id = u.Municipio JOIN comunidades c ON c.Id = u.Comunidad JOIN provincias p ON p.Id = u.Provincia JOIN tipo_usuario t ON u.Rol = t.Id_tipo_usuario WHERE Id_usuario="+id;
		}else{ //Si no muestra todos los usuarios
			var consulta = "SELECT u.Id_usuario, u.DNI, u.Nombre, u.Email, u.Direccion, c.Comunidad, p.Provincia, m.Municipio, u.CP, u.Telefono, u.Foto, t.Nombre_rol, u.Estado, u.Eliminado FROM usuarios u JOIN municipios m ON m.Id = u.Municipio JOIN comunidades c ON c.Id = u.Comunidad JOIN provincias p ON p.Id = u.Provincia JOIN tipo_usuario t ON u.Rol = t.Id_tipo_usuario";
		}
		
		
		connection.query(consulta,function(err, rows, fields){
			if(rows.length != 0){
				data["Usuarios"] = rows;
				res.status(200);
				
			}else{
				data["Usuarios"] = 'No hay usuarios';
			}
			res.json(data);
		});
	});
}



//Funcion que genera el POST de Usuarios
function postUsuarios (app, connection) {
	app.post('/usuarios',function(req,res){
		var DNI = connection.escape(req.body.dni);
		var Nombre = connection.escape(req.body.nombre);
		var Email = connection.escape(req.body.email);
		var Direccion = connection.escape(req.body.direccion);
		var Comunidad = connection.escape(req.body.comunidad);
		var Provincia = connection.escape(req.body.provincia);
		var Localidad = connection.escape(req.body.localidad);
		var CP = connection.escape(req.body.cp);
		var Telefono = connection.escape(req.body.telefono);
		var Foto = connection.escape(req.body.foto);
		var Contra = connection.escape(req.body.contra);
		var Rol = connection.escape(req.body.rol);
		var data = {
			"Errores":1,
			"Usuarios":""
		};
		var consulta = "INSERT INTO usuarios (";
		var i=0;
		if(DNI != 'NULL'){
			consulta  += "DNI";
			i++;
		}
		if(Nombre != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Nombre";
			i++;
		}
		if(Email != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Email";
			i++;
		}
		if(Direccion != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Direccion";
			i++;
		}
		if(Comunidad != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Comunidad";
			i++;
		}
		if(Provincia != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Provincia";
			i++;
		}
		if(Localidad != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Municipio";
			i++;
		}
		if(CP != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "CP";
			i++;
		}
		if(Telefono != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Telefono";
			i++;
		}
		if(Foto != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Foto";
			i++;
		}
		if(Contra != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Contra";
			i++;
		}
		if(Rol != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Rol";
			i++;
		}
		consulta+=", Estado , Eliminado) VALUES (";
		var i=0;
		if(DNI != 'NULL'){
			consulta  += DNI;
			i++;
		}
		if(Nombre != 'NULL'){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += Nombre;
			i++;
		}
		if(Email != 'NULL'){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += Email;
			i++;
		}
		if(Direccion != 'NULL'){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += Direccion;
			i++;
		}
		if(Comunidad != 'NULL'){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += Comunidad;
			i++;
		}
		if(Provincia != 'NULL'){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += Provincia;
			i++;
		}
		if(Localidad != 'NULL'){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += Localidad;
			i++;
		}
		if(CP != 'NULL'){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += CP;
			i++;
		}
		if(Telefono != 'NULL'){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += Telefono;
			i++;
		}
		if(Foto != 'NULL'){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += Foto;
			i++;
		}
		if(Contra != 'NULL'){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += Contra;
			i++;
		}
		if(Rol != 'NULL'){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += Rol;
			i++;
		}
		consulta+=",'0','0')";
			connection.query(consulta,function(err, rows, fields){
				if(err){
					res.status(400).json({ error: err });
					console.log(err);
				}else{
					data["Usuarios"] = "Datos insertados correctamente!";
					var Confirmacion= "www.google.es";
					var smtpTransport = nodemailer.createTransport("SMTP",{
							service: "gmail",
							auth: {
							user: "appayoficial@gmail.com",
							pass: "multimedia"
							}
						});
						var mailOptions = {
						from: "<appayoficial@gmail.com>", // sender address
							to: Email.replace(/'/g , ""), // Cambiar el correo por el que solicita el cambio de la contraseña
							subject: "Confirmación de registro appay", // Subject line
							html: "<!DOCTYPE html><html><head><title>Confirmación de Registro</title></head><body><table class='m_-53860054195334869body-wrap' bgcolor='#EEE' style='border-radius: 10px; font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;width:100%;margin:0;padding:16px'><tbody><tr style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;margin:0;padding:0'>  <td class='m_-53860054195334869container' bgcolor='#003a6b' style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;display:block!important;max-width:600px!important;clear:both!important;margin:0 auto;padding:20px;border:1px solid #eee'><br style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;margin:0;padding:0'><p align='center' class='m_-53860054195334869logo' style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;font-weight:normal;margin:0 0 10px;padding:0'><img align='center' class='m_-53860054195334869logo CToWUd' alt='APPAY' border='0' width='400' src='http://apis.appay.es/images/logo_web_blanco_negro%20(1).png' style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;max-width:100%;margin:0;padding:0'></p></td></tr>    <tr style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;margin:0;padding:0'><td class='m_-53860054195334869container' bgcolor='#FFFFFF' style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;display:block!important;max-width:600px!important;clear:both!important;margin:0 auto;padding:20px;border:1px solid #eee'><div class='m_-53860054195334869content' style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;max-width:600px;display:block;margin:0 auto;padding:0'><table style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;width:100%;margin:0;padding:0'><tbody><tr style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;margin:0;padding:0'><td style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;margin:0;padding:0'><p style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;font-weight:normal;margin:0 0 10px;padding:0'>Hola ,"+Nombre.replace(/'/g , "")+"</p><p style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;font-weight:normal;margin:0 0 10px;padding:0'>Gracias por registrarte en appay</p><h1 style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:24px;color:#003a6b;line-height:1.2;font-weight:bold;margin:16px 0 10px;padding:0'>Confirmación de registro</h1><p style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;font-weight:normal;margin:0 0 10px;padding:0'>Queríamos comunicarte que ya formas parte oficialmente de appay. Estamos muy contentos de que hayas apostado por nosotros, así que por nuestra parte, sólo nos queda decirte que vamos a trabajar de forma incansable para que le saques el máximo partido a tu dispositivo movil para realizar tus compras de la mejor forma posible.</p><p style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;font-weight:normal;margin:0 0 10px;padding:0'>Solo necesitamos que nos confirmes que este es tu correo ("+Email.replace(/'/g , "")+") clickando al siguiente botón ;)</p><p style='text-align:center;' ><a class='btn' href='"+Confirmacion+"' style='-webkit-border-radius: 60;-moz-border-radius: 60;border-radius: 60px;text-shadow: 1px 1px 3px #666666;-webkit-box-shadow: 10px 12px 12px #666666;-moz-box-shadow: 10px 12px 12px #666666;box-shadow: 10px 12px 12px #666666;font-family: Arial;color: #ffffff;font-size: 22px;background: #003a6b;padding: 5px 20px 5px 20px;border: dotted #1f628d 7px;text-decoration: none;'>Confirmar</a></p><p style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;font-weight:normal;margin:0 0 10px;padding:0'>Si el botón no funciona, por favor, copia y pega la siguiente dirección URL en tu navegador:</p><p style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;font-weight:normal;margin:0 0 10px;padding:0'>"+Confirmacion+"</p></td></tr></tbody></table></div></td><td style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;margin:0;padding:0'></td></tr></tbody></table></body></html>" // html body
						}				    
						smtpTransport.sendMail(mailOptions, function(error, response){
							if(error){
							console.log(error);
							}else{
							}
						});
					res.status(200);
				}
				res.json(data);
			});
	});
}

//Funcion que genera el PUT (Update) de Usuarios
function updateUsuarios (app, connection){
	app.put('/usuarios',function(req,res){
		var ID = connection.escape(req.body.id);
		var DNI = connection.escape(req.body.dni);
		var Nombre = connection.escape(req.body.nombre);
		var Email = connection.escape(req.body.email);
		var Direccion = connection.escape(req.body.direccion);
		var Comunidad = connection.escape(req.body.comunidad);
		var Provincia = connection.escape(req.body.provincia);
		var Localidad = connection.escape(req.body.localidad);
		var CP = connection.escape(req.body.cp);
		var Telefono = connection.escape(req.body.telefono);
		var Foto = connection.escape(req.body.foto);
		var Contra = connection.escape(req.body.contra);
		var Rol = connection.escape(req.body.rol);
		var Estado = connection.escape(req.body.estado);
		var Eliminado = connection.escape(req.body.eliminado);
		var data = {
			"Usuarios":""
		};
			if(ID == "''"){
				ID = "null.null.null"
			}
			var consulta = "UPDATE usuarios SET ";
			if(ID != 'NULL'){
				var i=0;
				if(DNI != 'NULL'){
					consulta  += "DNI="+DNI;
					i++;
				}
				if(Nombre != 'NULL'){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "Nombre="+Nombre;
					i++;
				}
				if(Email != 'NULL'){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "Email="+Email;
					i++;
				}
				if(Direccion != 'NULL'){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "Direccion="+Direccion;
					i++;
				}
				if(Comunidad != 'NULL'){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "Comunidad="+Comunidad;
					i++;
				}
				if(Provincia != 'NULL'){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "Provincia="+Provincia;
					i++;
				}
				if(Localidad != 'NULL'){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "Localidad="+Localidad;
					i++;
				}
				if(CP != 'NULL'){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "CP="+CP;
					i++;
				}
				if(Telefono != 'NULL'){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "Telefono="+Telefono;
					i++;
				}
				if(Foto != 'NULL'){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "Foto="+Foto;
					i++;
				}
				if(Contra != 'NULL'){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "Contra="+Contra;
					i++;
				}
				if(Rol != 'NULL'){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "Rol="+Rol;
					i++;
				}	
				if(Estado != 'NULL'){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "Estado="+Estado;
					i++;
				}	
				if(Eliminado != 'NULL'){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "Eliminado="+Eliminado;
					i++;
				}	
				consulta = consulta + " WHERE Id_usuario="+ID;
			}
			console.log(consulta);
			connection.query(consulta,function(err, rows, fields){
				if(err){
					res.status(400).json({ error: err });
				}else{
					data["Usuarios"] = "Actualizado correctamente!";
					res.status(200);
				}
				res.json(data);
			});
		
	});
}

function postRecuperarPass(app, connection){
	app.post('/usuarios/recuperarpass',function(req,res){
		var Email = connection.escape(req.body.email);

		var data = {
			"Usuarios":""
		};

		var consulta = "SELECT Email FROM usuarios WHERE Email="+Email;
		
			connection.query(consulta,function(err, rows, fields){
				if(rows != 0){
					data["Usuarios"] = "El usuario existe";
					var smtpTransport = nodemailer.createTransport("SMTP",{
							service: "gmail",
							auth: {
							user: "appayoficial@gmail.com",
							pass: "multimedia"
							}
						});
						var Confirmacion="www.appay.es";
						var mailOptions = {
						from: "<appayoficial@gmail.com>", // sender address
							to: Email.replace(/'/g , ""), // Cambiar el correo por el que solicita el cambio de la contraseña
							subject: "Recuperar contraseña appay", // Subject line
							html: "<!DOCTYPE html><html><head><title>Confirmación de Registro</title></head><body><table class='m_-53860054195334869body-wrap' bgcolor='#EEE' style='border-radius: 10px; font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;width:100%;margin:0;padding:16px'><tbody><tr style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;margin:0;padding:0'>  <td class='m_-53860054195334869container' bgcolor='#003a6b' style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;display:block!important;max-width:600px!important;clear:both!important;margin:0 auto;padding:20px;border:1px solid #eee'><br style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;margin:0;padding:0'><p align='center' class='m_-53860054195334869logo' style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;font-weight:normal;margin:0 0 10px;padding:0'><img align='center' class='m_-53860054195334869logo CToWUd' alt='APPAY' border='0' width='400' src='http://apis.appay.es/images/logo_web_blanco_negro%20(1).png' style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;max-width:100%;margin:0;padding:0'></p></td></tr>    <tr style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;margin:0;padding:0'><td class='m_-53860054195334869container' bgcolor='#FFFFFF' style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;display:block!important;max-width:600px!important;clear:both!important;margin:0 auto;padding:20px;border:1px solid #eee'><div class='m_-53860054195334869content' style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;max-width:600px;display:block;margin:0 auto;padding:0'><table style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;width:100%;margin:0;padding:0'><tbody><tr style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;margin:0;padding:0'><td style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;margin:0;padding:0'><p style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;font-weight:normal;margin:0 0 10px;padding:0'>Hola,</p><p style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;font-weight:normal;margin:0 0 10px;padding:0'>Gracias por confiar en appay</p><h1 style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:24px;color:#003a6b;line-height:1.2;font-weight:bold;margin:16px 0 10px;padding:0'>Cambio de contraseña</h1><p style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;font-weight:normal;margin:0 0 10px;padding:0'>Hemos recibido una solicitud para cambiar la contraseña de tu cuenta de appay</p><p style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;font-weight:normal;margin:0 0 10px;padding:0'>Para cambiar la contraseña solo tienes que hacer click en el siguiente botón:</p><p style='text-align:center;' ><a class='btn' href='"+Confirmacion+"' style='-webkit-border-radius: 60;-moz-border-radius: 60;border-radius: 60px;text-shadow: 1px 1px 3px #666666;-webkit-box-shadow: 10px 12px 12px #666666;-moz-box-shadow: 10px 12px 12px #666666;box-shadow: 10px 12px 12px #666666;font-family: Arial;color: #ffffff;font-size: 22px;background: #003a6b;padding: 5px 20px 5px 20px;border: dotted #1f628d 7px;text-decoration: none;'>Cambiar</a></p><p style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;font-weight:normal;margin:0 0 10px;padding:0'>Si el botón no funciona, por favor, copia y pega la siguiente dirección URL en tu navegador:</p><p style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;font-weight:normal;margin:0 0 10px;padding:0'>"+Confirmacion+"</p><p style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;font-weight:normal;margin:0 0 10px;padding:0'>Este enlace expirará tras 24 horas. Si no has solicitado el cambio de la contraseña, ignora este mensaje. No te preocupes, no se aplicarán cambios a tu cuenta.</p></td></tr></tbody></table></div></td><td style='font-family:-apple-system,Roboto,Helvetica,Arial,sans-serif;font-size:14px;color:#003a6b;line-height:1.5;margin:0;padding:0'></td></tr></tbody></table></body></html>" // html body
						}				    
						smtpTransport.sendMail(mailOptions, function(error, response){
							if(error){
							console.log(error);
							}else{
							}
						});
					res.status(200);					
				}else{
					data["Usuarios"] = "El usuario no existe";
					res.status(204);
				}

				if(err){
					res.status(400).json({ usuarios: err });
					console.log(err);
				}
				
				res.json(data);
			});
	});

}





//Devuelvo todos los metodos
exports.getUsuarios = getUsuarios;
exports.postUsuarios = postUsuarios;
exports.updateUsuarios = updateUsuarios;
exports.postRecuperarPass = postRecuperarPass;