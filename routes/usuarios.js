var express = require('express');
var router = express.Router();
var db = require('../helpers/database')();
var nodemailer = require('nodemailer');
var jwt =require("jsonwebtoken");
const nodemailerDkim = require('nodemailer-dkim');
var comprobacionjwt= require ('../helpers/comprobacionjwt');
var emailhtml= require ('../emails/htmlconfirmaremail');
var mySecretKey=process.env.JWT_SECRETKEY;

/*DEVUELVE USUARIOS si no le pasas parametro te los devuelve todos si le pasas id te devuelve los datos de ese usuario,
 y si le pasas otros parametros te devuelve todos los que tengan ese parametro filtrado*/
router.get('/',comprobacionjwt,function(req,res){
	var data = {
		"Usuarios":""
	};
	db.getConnection(function(err, connection) {
		if (err) throw err;
		var Id = connection.escape(req.query.id);
		var DNI = connection.escape(req.query.dni);
		var Nombre = connection.escape(req.query.nombre);
		var Email = connection.escape(req.query.email);
		var Sexo = connection.escape(req.query.sexo);
		var Direccion = connection.escape(req.query.direccion);
		var Comunidad = connection.escape(req.query.comunidad);//La comunidad la tienes que pasar con su nombre
		var Provincia = connection.escape(req.query.provincia);//La provincia la tienes que pasar con su nombre
		var Localidad = connection.escape(req.query.Localidad);//La localidad la tienes que pasar con su nombre
		var Fechanac_min = connection.escape(req.query.fechanac_min);
		var Fechanac_max = connection.escape(req.query.fechanac_max);
		var Fecha_min = connection.escape(req.query.fecha_min);
		var Fecha_max = connection.escape(req.query.fecha_max);
		var CP = connection.escape(req.query.cp);
		var Estado = connection.escape(req.query.estado);
		var Eliminado = connection.escape(req.query.eliminado);
		var Telefono = connection.escape(req.query.telefono);
		var Rol = connection.escape(req.query.rol);
		var OrdeNombre = connection.escape(req.query.ordenombre); //Variable que indica sobre que parametro ordenar los usuarios en la URI usuarios?ordenombre={0 ó 1}
		var OrdeFecha = connection.escape(req.query.ordefecha);//Variable que indica sobre que parametro ordenar las facturas en la URI usuarios?ordefecha={0 ó 1}
		var OrdeFechaNac = connection.escape(req.query.ordefechanac);//Variable que indica sobre que parametro ordenar las facturas en la URI usuarios?ordefechanac={0 ó 1}
		var OrdeCom = connection.escape(req.query.ordecom); //Variable que indica sobre que parametro ordenar las facturas en la URI usuarios?ordecom={0 ó 1}
		var OrdeProv = connection.escape(req.query.ordeprov); //Variable que indica sobre que parametro ordenar las facturas en la URI usuarios?ordeprov={0 ó 1}
		var OrdeLoc = connection.escape(req.query.ordeloc); //Variable que indica sobre que parametro ordenar las facturas en la URI usuarios?ordeloc={0 ó 1}
		var Pagina = connection.escape(req.query.pagina); //Variable que indica que pagina de facturas estamos que se mostraran de 10 en 10
		if(Id != 'NULL'){ //Si en la URI existe se crea la consulta de busqueda por id
			console.log("Entro para mostrar los datos de un usuario concreto");
			var consulta="SELECT * FROM usuarios u JOIN tipo_usuario t ON u.Rol = t.Id_tipo_usuario WHERE Id_usuario="+Id;
		}else{ //Si no muestra todos los usuarios
			console.log("Entro para mostrar los datos de todos los usuarios");
			var consulta="SELECT * FROM usuarios u JOIN tipo_usuario t ON u.Rol_usuario = t.Id_tipo_usuario"
			var i=0;
			if(Nombre != 'NULL' || DNI != 'NULL' || Sexo != 'NULL' || Email != 'NULL' || Estado != 'NULL' || Eliminado != 'NULL' || Direccion != 'NULL' || Comunidad != 'NULL' || Provincia != 'NULL' || Localidad != 'NULL' || Fechanac_min != 'NULL' || Fechanac_max != 'NULL' || Fecha_min != 'NULL' || Fecha_max != 'NULL' || CP != 'NULL' || Telefono != 'NULL' || Rol != 'NULL' ){
				console.log("Con el parametro:");
				consulta +=" WHERE ";
				if(Nombre != 'NULL'){
					console.log("Nombre:"+Nombre);
					if (i==1) {
						consulta  += " AND ";
						i--;	
					}
					consulta  += "u.Nombre_usuario LIKE '%"+Nombre.replace(/'/g, "")+"%'";
					i++;
				}
				if(DNI != 'NULL'){
					console.log("DNI:"+DNI);
					if (i==1) {
						consulta  += " AND ";
						i--;	
					}
					consulta  += "u.DNI_usuario="+DNI;
					i++;
				}
				if(Email != 'NULL'){
					console.log("Email:"+Email);
					if (i==1) {
						consulta  += " AND ";
						i--;	
					}
					consulta  += "u.Email_usuario="+Email;
					i++;
				}
				if(Sexo != 'NULL'){
					console.log("Sexo:"+Sexo);
					if (i==1) {
						consulta  += " AND ";
						i--;	
					}
					consulta  += "u.Sexo_usuario="+Sexo;
					i++;
				}
				if(Estado != 'NULL'){
					console.log("Estado:"+Estado);
					if (i==1) {
						consulta  += " AND ";
						i--;	
					}
					consulta  += "u.Estado_usuario="+estado;
					i++;
				}
				if(Eliminado != 'NULL'){
					console.log("Eliminado:"+Eliminado);
					if (i==1) {
						consulta  += " AND ";
						i--;	
					}
					consulta  += "u.Eliminado_usuario="+Eliminado;
					i++;
				}
				if(Direccion != 'NULL'){
					console.log("Direccion:"+Direccion);
					if (i==1) {
						consulta  += " AND ";
						i--;	
					}
					consulta  += "u.Direccion_usuario LIKE '%"+Direccion.replace(/'/g, "")+"%'";
					i++;
				}
				if(Comunidad != 'NULL'){
					console.log("Comunidad:"+Comunidad);
					if (i==1) {
						consulta  += " AND ";
						i--;	
					}
					consulta  += "u.Comunidad_usuario="+Comunidad;
					i++;
				}
				if(Provincia != 'NULL'){
					console.log("Provincia:"+Provincia);
					if (i==1) {
						consulta  += " AND ";
						i--;	
					}
					consulta  += "u.Provincia_usuario="+Comunidad;
					i++;
				}
				if(Localidad != 'NULL'){
					console.log("Localidad:"+Localidad);
					if (i==1) {
						consulta  += " AND ";
						i--;	
					}
					consulta  += "u.Localidad_usuario="+Comunidad;
					i++;
				}
				if(Telefono != 'NULL'){
					console.log("Telefono:"+Telefono);
					if (i==1) {
						consulta  += " AND ";
						i--;	
					}
					consulta  += "u.Telefono_usuario<="+Telefono;
					i++;
				}
				if(CP != 'NULL'){
					console.log("CP:"+CP);
					if (i==1) {
						consulta  += " AND ";
						i--;	
					}
					consulta  += "CP_usuario="+CP;
					i++;
				}
				if(Fechanac_max != 'NULL'){
					console.log("Fechanac_max:"+Fechanac_max);
					if (i==1) {
						consulta  += " AND ";
						i--;	
					}
					consulta  += "u.Fecha_nac_usuario<="+Fechanac_max;
					i++;
				}
				if(Fechanac_min != 'NULL'){
					console.log("Fechanac_min:"+Fechanac_min);
					if (i==1) {
						consulta  += " AND ";
						i--;	
					}
					consulta  += "u.Fecha_nac_usuario>="+Fechanac_min;
					i++;
				}
				if(Fecha_max != 'NULL'){
					console.log("Fecha_max:"+Fecha_max);
					if (i==1) {
						consulta  += " AND ";
						i--;	
					}
					consulta  += "u.Fecha_usuario<="+Fecha_max;
					i++;
				}
				if(Fecha_min != 'NULL'){
					console.log("Fecha_min:"+Fecha_min);
					if (i==1) {
						consulta  += " AND ";
						i--;	
					}
					consulta  += "u.Fecha_usuario>="+Fecha_min;
					i++;
				}
				if(Rol != 'NULL'){
					console.log("Rol:"+Rol);
					if (i==1) {
						consulta  += " AND ";
						i--;	
					}
					consulta  += "u.Rol_usuario="+Rol;
					i++;
				}
			}
		}
		if(OrdeFecha != 'NULL' || OrdeFechaNac != 'NULL' || OrdeNombre != 'NULL' || OrdeCom != 'NULL' || OrdeProv != 'NULL' || OrdeLoc != 'NULL'){
			var orden =0;
			consulta  += " ORDER BY ";
			if(OrdeFecha != 'NULL'){
				if(orden!=0){
					consulta  += " , ";
					orden=orden-1;
				}
				orden=orden+1;
				if (OrdeFecha=="'1'") {
					consulta  += "u.Fecha_usuario ASC";
				}
				if (OrdeFecha=="'0'") {
					consulta  += "u.Fecha_usuario DESC";	
				}
			}
			if(OrdeFechaNac != 'NULL'){
				if(orden!=0){
					consulta  += " , ";
					orden=orden-1;
				}
				orden=orden+1;
				if (OrdeFechaNac=="'1'") {
					consulta  += "u.Fecha_nac_usuario ASC";
				}
				if (OrdeFecha=="'0'") {
					consulta  += "u.Fecha_nac_usuario DESC";	
				}
			}
			if(OrdeCom != 'NULL'){
				if(orden!=0){
					consulta  += " , ";
					orden=orden-1;
				}
				orden=orden+1;
				if (OrdeCom=="'1'") {
					consulta  += "u.Comunidad_usuario ASC";
				}
				if (OrdeCom=="'0'") {
					consulta  += "u.Comunidad_usuario DESC";	
				}
			}
			if(OrdeProv != 'NULL'){
				if(orden!=0){
					consulta  += " , ";
					orden=orden-1;
				}
				orden=orden+1;
				if (OrdeProv=="'1'") {
					consulta  += "u.Provincia_usuario ASC";
				}
				if (OrdeProv=="'0'") {
					consulta  += "u.Provincia_usuario DESC";	
				}
			}
			if(OrdeLoc != 'NULL'){
				if(orden!=0){
					consulta  += " , ";
					orden=orden-1;
				}
				orden=orden+1;
				if (OrdeLoc=="'1'") {
					consulta  += "u.Localidad_usuario ASC";
				}
				if (OrdeLoc=="'0'") {
					consulta  += "u.Localidad_usuario DESC";	
				}
			}
			if(OrdeNombre != 'NULL'){
				if(orden!=0){
					consulta  += " , ";
					orden=orden-1;
				}
				orden=orden+1;
				if (OrdeNombre=="'1'") {
					consulta  += "  u.Nombre_usuario ASC";
				}
				if (OrdeNombre=="'0'") {
					consulta  += "  u.Nombre_usuario DESC";	
				}
			}
		}
		if(Pagina!='NULL'){
			var pags=parseInt(Pagina.replace(/'/g, ""))*10;
			console.log("Voy a mostrar solo las 10 siguientes filas empezando en la: "+pags);
			consulta += " LIMIT 10 OFFSET "+pags;
		}
		console.log("Esta es la consulta a la base de datos:");
		console.log(consulta);
		connection.query(consulta,function(err, rows, fields){
			if(err){
				console.log("Error en la query...");
				res.status(400).json({ error: err });
			}else{
				console.log("Query OK");
				if(rows.length != 0){
					console.log("Devuelvo los usuarios");
					data["Usuarios"] = rows;
					res.status(200);
				}else{
					res.status(204).json({ error: err });
					console.log("No hay usuarios...");
					data["Usuarios"] = 'No hay usuarios';
				}
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
		var Fecha = connection.escape(req.body.fecha);
		var Sexo = connection.escape(req.body.sexo);
		var Foto = connection.escape(req.body.foto);
		var Contra = connection.escape(req.body.contra);
		var Rol = connection.escape(req.body.rol);
		var data = {
			"Usuarios":""
		};
		var consulta = "INSERT INTO usuarios (";
		var i=0;
		if(DNI != 'NULL'){
			consulta  += "DNI_usuario";
			i++;
		}
		if(Nombre != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Nombre_usuario";
			i++;
		}
		if(Email != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Email_usuario";
			i++;
		}
		if(Direccion != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Direccion_usuario";
			i++;
		}
		if(Comunidad != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Comunidad_usuario";
			i++;
		}
		if(Provincia != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Provincia_usuario";
			i++;
		}
		if(Localidad != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Municipio_usuario";
			i++;
		}
		if(CP != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "CP_usuario";
			i++;
		}
		if(Telefono != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Telefono_usuario";
			i++;
		}
		if(Fecha != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Fecha_nac_usuario";
			i++;
		}
		if(Sexo != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Sexo_usuario";
			i++;
		}
		if(Foto != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Foto_usuario";
			i++;
		}
		if(Contra != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Contra_usuario";
			i++;
		}
		if(Rol != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Rol_usuario";
			i++;
		}
		console.log("CONSULTA 1 es"+consulta);
		consulta=consulta+", Estado_usuario , Eliminado_usuario) VALUES (";
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
			consulta  += "md5("+Contra+")";
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
				enviarContrasenya(req.body.email);
				console.log("Todo ok?");                                                                                                                                                                                                                                                                                                                                                                                                                                                           
				res.status(200);
			}
			res.json(data);
		});
	connection.release();
	});
});

function enviarContrasenya(email){
	console.log("Entras a enviarContrasenya");
	console.log("El email es "+email);
    var token= jwt.sign({//firmamos el token , que caduca en 24 horas
         data: email
        }, mySecretKey, { expiresIn: '24h' });
	var smtpTransport = nodemailer.createTransport("SMTP",{
		service: "gmail",
		auth: {
			user: process.env.GMAIL_USER,
			pass: process.env.GMAIL_PASS
		} 
	});
	var htmlcorreo=emailhtml(token,email); 
	var mailOptions = {
		from: "<appayoficial@gmail.com>", // sender address
		to: email, //
		subject: "Confirmar registro Appay", // Subject line	
		html: htmlcorreo
	}		
	smtpTransport.sendMail(mailOptions, function(error, response){
		if(error){
			console.log(error);
			//res.status(300).json(error);
		}else{
			console.log("Correo enviado");
			//res.status(200).json("Todo bien todo correcto");
		}
	});
}

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
		var Sexo = connection.escape(req.body.sexo);
		var Fecha = connection.escape(req.body.fecha);
		var Contra = connection.escape(req.body.contra);
		var Rol = connection.escape(req.body.rol);
		var Estado = connection.escape(req.body.estado);
		var Eliminado = connection.escape(req.body.eliminado);
		var data = {
			"Usuarios":""
		};
			/*if(ID == "''"){
				ID = "null.null.null"
			}*/
			var consulta = "UPDATE usuarios SET ";
			if(ID != 'NULL'){
				var i=0;
				if(DNI != 'NULL'){
					consulta  += "DNI_usuario="+DNI;
					i++;
				}
				if(Nombre != 'NULL'){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "Nombre_usuario="+Nombre;
					i++;
				}
				if(Email != 'NULL'){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "Email_usuario="+Email;
					i++;
				}
				if(Direccion != 'NULL'){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "Direccion_usuario="+Direccion;
					i++;
				}
				if(Comunidad != 'NULL'){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "Comunidad_usuario="+Comunidad;
					i++;
				}
				if(Provincia != 'NULL'){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "Provincia_usuario="+Provincia;
					i++;
				}
				if(Localidad != 'NULL'){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "Localidad_usuario="+Localidad;
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
					consulta  += "Telefono_usuario="+Telefono;
					i++;
				}
				if(Sexo != 'NULL'){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "Sexo_usuario="+Sexo;
					i++;
				}
				if(Fecha != 'NULL'){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "Fecha_nac_usuario="+Fecha;
					i++;
				}
				if(Foto != 'NULL'){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "Foto_usuario="+Foto;
					i++;
				}
				if(Contra != 'NULL'){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "Contra_usuario=md5("+Contra+")";;
					i++;
				}
				if(Rol != 'NULL'){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "Rol_usuario="+Rol;
					i++;
				}	
				if(Estado != 'NULL'){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "Estado_usuario="+Estado;
					i++;
				}	
				if(Eliminado != 'NULL'){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "Eliminado_usuario="+Eliminado;
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

//Se añade un usuario a una tienda, cuando pase por el codigo QR
router.post('/usuarioTienda',function(req,res){
	db.getConnection(function(err, connection) {
		if (err) throw err;	
		var Id_usuario = connection.escape(req.body.id_usuario);
		var Id_tienda = connection.escape(req.body.id_tienda);
		var data = {
			"Usuarios":""
		};
		var consulta = "INSERT INTO usuarios_tienda (Id_tienda_usuarios_tienda, Id_usuario_usuarios_tienda) VALUES("+Id_tienda+","+Id_usuario+")";
			connection.query(consulta,function(err, rows, fields){
				if(rows != 0){
					data["Usuarios"] = "Usuario vinculado a la tienda";
					res.status(200);					
				}else{
					data["Usuarios"] = "El usuario no existe o la tienda no existe";
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

//Se asigna una tienda a un usuario de tipo administrador
router.post('/usuarioAdminTienda',function(req,res){
	db.getConnection(function(err, connection) {
		if (err) throw err;	
		var Id_usuario = connection.escape(req.body.id_usuario);
		var Id_tienda = connection.escape(req.body.id_tienda);
		var data = {
			"Usuarios":""
		};
		var consulta = "INSERT INTO usuario_admin_tienda (id_tienda_usuario_admin_tienda, id_usuario_usuario_admin_tienda) VALUES("+Id_tienda+","+Id_usuario+")";
			connection.query(consulta,function(err, rows, fields){
				if(rows != 0){
					data["Usuarios"] = "Administrador vinculado a la tienda";
					res.status(200);					
				}else{
					data["Usuarios"] = "El usuario no existe o la tienda no existe";
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
//DEVUELVE USUARIOS, o todos o id='n'
router.get('/adminTienda',comprobacionjwt,function(req,res){
	var data = {
		"Usuarios":""
	};
	db.getConnection(function(err, connection) {
		if (err) throw err;
		var id = connection.escape(req.query.id);
		var consulta = "SELECT u.Id_usuario, u.DNI_usuario, u.Nombre_usuario, u.Email_usuario, u.Direccion_usuario, u.Comunidad_usuario, u.Provincia_usuario, u.Localidad_usuario, u.CP_usuario, u.Telefono_usuario, u.Foto_usuario, t.Nombre_rol, u.Estado_usuario, u.Eliminado_usuario, u.Fecha_usuario  FROM usuario_admin_tienda TA JOIN usuarios u ON u.Id_usuario = TA.id_usuario_usuario_admin_tienda JOIN tipo_usuario t ON u.Rol_usuario = t.Id_tipo_usuario;";
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

module.exports = router;