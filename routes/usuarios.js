var express = require('express');
var router = express.Router();
var db = require('../helpers/database')();
var nodemailer = require('nodemailer');
const nodemailerDkim = require('nodemailer-dkim');
var comprobacionjwt= require ('../helpers/comprobacionjwt');

//DEVUELVE USUARIOS, o todos o id='n'
router.get('/',comprobacionjwt,function(req,res){
	var data = {
		"Usuarios":""
	};
	db.getConnection(function(err, connection) {
		if (err) throw err;
		var id = connection.escape(req.query.id);

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
		connection.release();
	});
});

//Funcion que genera el POST de Usuarios
router.post('/',comprobacionjwt,function(req,res){
	db.getConnection(function(err, connection) {
		if (err) throw err;
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
		console.log(consulta);

		connection.query(consulta,function(err, rows, fields){
			if(err){
				res.status(400).json({ error: err });
				console.log(err);
			}else{
				data["Usuarios"] = "Datos insertados correctamente!";
				res.status(200);
			}
			res.json(data);
		});

	connection.release();
	});
});


//Funcion que genera el PUT (Update) de Usuarios
router.put('/',comprobacionjwt,function(req,res){
	db.getConnection(function(err, connection) {
		if (err) throw err;	
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
	connection.release();
	});
});


//Funcion recuperar contraseña
router.post('/recuperarpass',comprobacionjwt,function(req,res){
	db.getConnection(function(err, connection) {
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
					var mailOptions = {
					from: "<appayoficial@gmail.com>", // sender address
						to: "blablablabla@gmail.com", // Cambiar el correo por el que solicita el cambio de la contraseña
						subject: "This is the subject", // Subject line
						html: "Este es un email enviado en node js" // html body
					}				    
					smtpTransport.sendMail(mailOptions, function(error, response){
						/*if(error){
						console.log(error);
						}else{
						}*/
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
	connection.release();
	});
});


  

module.exports = router;