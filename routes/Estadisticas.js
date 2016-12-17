var express = require('express');
var router = express.Router();
var db = require('../helpers/database')();
var comprobacionjwt= require ('../helpers/comprobacionjwt');
router.get('/usuariosTienda',comprobacionjwt,function(req,res){
	db.getConnection(function(err, connection) {
		var data = {
			"Errores":1,
			"UsuariosTotales":""
		};
		var id = connection.escape(req.query.id); //Variable que recoje el id de la tienda de la que quieres saber los usuarios de la URI estadisticas?id={num}
		if(id != "NULL"){ //Si en la URI existe se crea la consulta de busqueda por id
			var consulta="SELECT COUNT(*) Usuarios FROM usuarios_tienda WHERE Id_tienda="+id;
		}else{ //Si no muestra todos los municipios
			var consulta = "SELECT COUNT(*) Usuarios FROM usuarios_tienda";
		}
		connection.query(consulta,function(err, rows, fields){
			if(rows.length != 0){
				data["Errores"] = 0;
				data["UsuariosTotales"] = rows;
				res.json(data);
				
			}else{
				data["UsuariosTotales"] = 'No hay Usuarios';
				res.json(data);
			}
		});
    connection.release();
	});
});
//Esta funcion devuelve el numero de registros los ultimos X dias, meses o años segun el parametro que se le pase por parametro
router.get('/Registros',comprobacionjwt,function(req,res){
	db.getConnection(function(err, connection) {
		var data = {
			"Errores":1,
			"UsuariosTotales":""
		};
		var id = connection.escape(req.query.id); //Variable que recoje el id de la tienda de la que quieres saber los usuarios de la URI estadisticas?id={num}
		var dia = connection.escape(req.query.dia); //Variable que recoje el id de la tienda de la que quieres saber los usuarios de la URI estadisticas?id={num}
		var mes = connection.escape(req.query.mes); //Variable que recoje el id de la tienda de la que quieres saber los usuarios de la URI estadisticas?id={num}
		var anyos = connection.escape(req.query.anyos); //Variable que recoje el id de la tienda de la que quieres saber los usuarios de la URI estadisticas?id={num}
		var inter= null;
		if(dia!="NULL"){
			inter=dia
		}
		if(mes!="NULL"){

		}
		if(anyos!="NULL"){

		}
		if(id != "NULL"){ //Si en la URI existe se crea la consulta de busqueda por id
			var consulta="SELECT COUNT(*) Usuarios FROM usuarios u JOIN usuarios_tienda ut ON u.Id_usuario = ut.Id_usuario WHERE DATE_SUB(CURDATE(),INTERVAL "+30+") <= u.fecha and Id_tienda="+id;
		}else{ //Si no muestra todos los municipios
			var consulta = "SELECT COUNT(*) Usuarios FROM usuarios_tienda";
		}
		connection.query(consulta,function(err, rows, fields){
			if(rows.length != 0){
				data["Errores"] = 0;
				data["UsuariosTotales"] = rows;
				res.json(data);
				
			}else{
				data["UsuariosTotales"] = 'No hay Usuarios';
				res.json(data);
			}
		});
    connection.release();
	});
});



module.exports = router;