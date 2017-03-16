var express = require('express');
var router = express.Router();
var db = require('../helpers/database')();
var comprobacionjwt= require ('../helpers/comprobacionjwt');
//Esta funcion devuelve el numero de usuario por tienda o totales
router.get('/usuarioTienda',comprobacionjwt,function(req,res){
	db.getConnection(function(err, connection) {
		var data = {
			"Errores":1,
			"usuarioTotales":""
		};
		var id = connection.escape(req.query.id); //Variable que recoje el id de la tienda de la que quieres saber los usuario de la URI estadisticas?id={num}
		if(id != "NULL"){ //Si en la URI existe se crea la consulta de busqueda por id
			var consulta="SELECT COUNT(*) usuario FROM usuario_tienda WHERE Id_tienda="+id;
		}else{ //Si no muestra todos los municipios
			var consulta = "SELECT COUNT(*) usuario FROM usuario_tienda";
		}
		connection.query(consulta,function(err, rows, fields){
			if(rows.length != 0){
				data["Errores"] = 0;
				data["usuarioTotales"] = rows;
				res.json(data);
				
			}else{
				data["usuarioTotales"] = 'No hay usuario';
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
			"usuarioTotales":""
		};
		var Id = connection.escape(req.query.id); //Variable que recoje el id de la tienda de la que quieres saber los usuario de la URI estadisticas?id={num}
		var Dia = connection.escape(req.query.dia); //Variable que recoje el numero de dias de los que quieres saber el numero de usuario que se han registrado estadisticas/Registros?dia={num}
		var Mes = connection.escape(req.query.mes); //Variable que recoje el numero de meses de los que quieres saber el numero de usuario que se han registrado estadisticas/Registros?mes={num}
		var Anyo = connection.escape(req.query.anyos); //Variable que recoje el numero de años de los que quieres saber el numero de usuario que se han registrado estadisticas/Registros?anyo={num}
		var inter= null;
		if(Dia!="NULL"){
			inter=Dia.replace(/'/g, "")+ " DAY"
		}
		if(Mes!="NULL"){
			inter=Mes.replace(/'/g, "")+ " MONTH"
		}
		if(Anyo!="NULL"){
			inter=Anyo.replace(/'/g, "")+ " YEAR"
		}
		if(Id != "NULL"){ //Si en la URI existe se crea la consulta de busqueda por id
			var consulta="SELECT COUNT(*) usuario FROM usuario u JOIN usuario_tienda ut ON u.Id_usuario = ut.Id_usuario WHERE DATE_SUB(CURDATE(),INTERVAL "+inter+") <= u.fecha and Id_tienda="+Id;
		}else{ //Si no muestra todos los municipios
			var consulta = "SELECT COUNT(*) usuario FROM usuario u JOIN usuario_tienda ut ON u.Id_usuario = ut.Id_usuario WHERE DATE_SUB(CURDATE(),INTERVAL "+inter+") <= u.fecha";
		}
		connection.query(consulta,function(err, rows, fields){
			if(rows.length != 0){
				data["Errores"] = 0;
				data["usuarioTotales"] = rows;
				res.json(data);
			}else{
				data["usuarioTotales"] = 'No hay usuario';
				res.json(data);
			}
		});
    connection.release();
	});
});
//Esta funcion devuelve el numero de usuario que han realizado una compra en un establecimiento
router.get('/usuarioFacturaTienda',comprobacionjwt,function(req,res){
	db.getConnection(function(err, connection) {
		var data = {
			"Errores":1,
			"usuarioQueCompran":""
		};
		var id = connection.escape(req.query.id); //Variable que recoje el id de la tienda de la que quieres saber los usuario de la URI estadisticas?id={num}
		if(id != "NULL"){ //Si en la URI existe se crea la consulta de busqueda por id
			var consulta="SELECT DISTINCT COUNT(*) usuario FROM usuario u JOIN usuario_tienda ut ON u.Id_usuario = ut.Id_usuario JOIN factura_usuario fu ON ut.Id_usuario_tienda = fu.Id_usuario_tienda WHERE fu.Id_tienda="+id;
		}else{ //Si no muestra todos los municipios
			var consulta = "SELECT DISTINCT COUNT(*) usuario FROM usuario u JOIN usuario_tienda ut ON u.Id_usuario = ut.Id_usuario JOIN factura_usuario fu ON ut.Id_usuario_tienda = fu.Id_usuario_tienda";
		}
		connection.query(consulta,function(err, rows, fields){
			if(rows.length != 0){
				data["Errores"] = 0;
				data["usuarioQueCompran"] = rows;
				res.json(data);
				
			}else{
				data["usuarioQueCompran"] = 'No hay usuario';
				res.json(data);
			}
		});
    connection.release();
	});
});
//Esta funcion devuelve el numero de facturas que se realizan con appay en un establecimiento
router.get('/usuarioTienda',comprobacionjwt,function(req,res){
	db.getConnection(function(err, connection) {
		var data = {
			"Errores":1,
			"NumerodeFacturas":""
		};
		var id = connection.escape(req.query.id); //Variable que recoje el id de la tienda de la que quieres saber los usuario de la URI estadisticas?id={num}
		if(id != "NULL"){ //Si en la URI existe se crea la consulta de busqueda por id
			var consulta="SELECT COUNT(*) Facturas FROM factura WHERE Id_tienda="+id;
		}else{ //Si no muestra todos los municipios
			var consulta = "SELECT COUNT(*) Facturas FROM factura";
		}
		connection.query(consulta,function(err, rows, fields){
			if(rows.length != 0){
				data["Errores"] = 0;
				data["NumerodeFacturas"] = rows;
				res.json(data);
			}else{
				data["NumerodeFacturas"] = 'No hay usuario';
				res.json(data);
			}
		});
    connection.release();
	});
});
//Esta funcion devuelve el total de ingresos en facturas que se realizan con appay en un establecimiento
router.get('/usuarioTienda',comprobacionjwt,function(req,res){
	db.getConnection(function(err, connection) {
		var data = {
			"Errores":1,
			"BeneficiosAppay":""
		};
		var Id = connection.escape(req.query.id); //Variable que recoje el id de la tienda de la que quieres saber los usuario de la URI estadisticas?id={num}
		var Dia = connection.escape(req.query.dia); //Variable que recoje el numero de dias de los que quieres saber el numero de usuario que se han registrado estadisticas/Registros?dia={num}
		var Mes = connection.escape(req.query.mes); //Variable que recoje el numero de meses de los que quieres saber el numero de usuario que se han registrado estadisticas/Registros?mes={num}
		var Anyo = connection.escape(req.query.anyos); //Variable que recoje el numero de años de los que quieres saber el numero de usuario que se han registrado estadisticas/Registros?anyo={num}
		var inter= null;
		if(Dia!="NULL"){
			inter=Dia.replace(/'/g, "")+ " DAY"
		}
		if(Mes!="NULL"){
			inter=Mes.replace(/'/g, "")+ " MONTH"
		}
		if(Anyo!="NULL"){
			inter=Anyo.replace(/'/g, "")+ " YEAR"
		}		if(id != "NULL"){ //Si en la URI existe se crea la consulta de busqueda por id
			var consulta="SELECT SUM(Total_factura) Total_facturas FROM factura WHERE DATE_SUB(CURDATE(),INTERVAL "+inter+") <= Fecha_factura AND Id_tienda="+id;
		}else{ //Si no muestra todos los municipios
			var consulta = "SELECT SUM(Total_factura) Total_facturas FROM factura WHERE DATE_SUB(CURDATE(),INTERVAL "+inter+") <= Fecha_factura";
		}
		connection.query(consulta,function(err, rows, fields){
			if(rows.length != 0){
				data["Errores"] = 0;
				data["BeneficiosAppay"] = rows;
				res.json(data);
			}else{
				data["BeneficiosAppay"] = 'No hay usuario';
				res.json(data);
			}
		});
    connection.release();
	});
});
module.exports = router;
