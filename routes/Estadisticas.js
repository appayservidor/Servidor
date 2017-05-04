var express = require('express');
var router = express.Router();
var db = require('../helpers/database')();
var comprobacionjwt= require ('../helpers/comprobacionjwt');
//Esta funcion devuelve el total de ingresos en facturas que se realizan con appay en un establecimiento
router.get('/beneficiosTienda',comprobacionjwt,function(req,res){
	db.getConnection(function(err, connection) {
		var data = {
			"BeneficiosAppay":"",
		};
		var Id = connection.escape(req.query.id); //Variable que recoje el id de la tienda de la que quieres saber los usuario de la URI estadisticas?id={num}
		var Dia = connection.escape(req.query.dia); //Variable que recoje el numero de dias de los que quieres saber el numero de usuario que se han registrado estadisticas/Registros?dia={num}
		var Mes = connection.escape(req.query.mes); //Variable que recoje el numero de meses de los que quieres saber el numero de usuario que se han registrado estadisticas/Registros?mes={num}
		var Anyo = connection.escape(req.query.anyos); //Variable que recoje el numero de años de los que quieres saber el numero de usuario que se han registrado estadisticas/Registros?anyo={num}
		if(Dia!="NULL"){
			if(Id != "NULL"){ //Si en la URI existe se crea la consulta de busqueda por id
				var consulta = "SELECT SUM(Total_factura) Total_facturas FROM factura WHERE DATE_SUB(NOW(),INTERVAL 1 HOUR) <= Fecha_factura AND Id_tienda_factura="+Id+";";	
				for (var index = 1; index <= 23; index++) {
					consulta += "SELECT SUM(Total_factura) Total_facturas FROM factura WHERE DATE_SUB(NOW(),INTERVAL "+index+" HOUR) >= Fecha_factura AND DATE_SUB(NOW(),INTERVAL "+(index+1)+" HOUR) <= Fecha_factura AND Id_tienda_factura="+Id+";";	
				}
			}
		}
		if(Mes!="NULL"){
			if(Id != "NULL"){ //Si en la URI existe se crea la consulta de busqueda por id
				var consulta = "SELECT SUM(Total_factura) Total_facturas FROM factura WHERE DATE_SUB(NOW(),INTERVAL 1 DAY) <= Fecha_factura AND Id_tienda_factura="+Id+";";	
				for (var index = 1; index <= 30; index++) {
					consulta += "SELECT SUM(Total_factura) Total_facturas FROM factura WHERE DATE_SUB(NOW(),INTERVAL "+index+" DAY) >= Fecha_factura AND DATE_SUB(NOW(),INTERVAL "+(index+1)+" DAY) <= Fecha_factura AND Id_tienda_factura="+Id+";";	
				}
			}		
		}
		if(Anyo!="NULL"){
			if(Id != "NULL"){ //Si en la URI existe se crea la consulta de busqueda por id
				var consulta = "SELECT SUM(Total_factura) Total_facturas FROM factura WHERE DATE_SUB(NOW(),INTERVAL 1 MONTH) <= Fecha_factura AND Id_tienda_factura="+Id+";";	
				for (var index = 1; index <= 11; index++) {
					consulta += "SELECT SUM(Total_factura) Total_facturas FROM factura WHERE DATE_SUB(NOW(),INTERVAL "+index+" MONTH) >= Fecha_factura AND DATE_SUB(NOW(),INTERVAL "+(index+1)+" MONTH) <= Fecha_factura AND Id_tienda_factura="+Id+";";	
				}
			}
		}		
		console.log(consulta);
		connection.query(consulta,function(err, rows, fields){
			if(err){
				console.log("Error en la query...");
				return res.status(400).json({ error: err });
			}else{
				console.log("Query OK");
				data["BeneficiosAppay"] = rows;
				return res.status(200).json(data);	
			}
		});
    connection.release();
	});
});

router.get('/Oferta',comprobacionjwt,function(req,res){
	db.getConnection(function(err, connection) {
		var data = {
			"MasUsadas":"",
			"MasUsadas":"",
		};
		var Id = connection.escape(req.query.id); //Variable que recoje el id de la tienda de la que quieres saber los usuario de la URI estadisticas?id={num}
		var Producto = connection.escape(req.query.producto); //Variable que recoje el id de la tienda de la que quieres saber los usuario de la URI estadisticas?id={num}
		var Usuario = connection.escape(req.query.usuario); //Variable que recoje el id de la tienda de la que quieres saber los usuario de la URI estadisticas?id={num}
		if(Id != "NULL"){ //Si en la URI existe se crea la consulta de busqueda por id
			var consulta = "SELECT COUNT(Id_oferta_usuario_linea_factura) Usos FROM factura JOIN linea_factura ON Id_factura=Id_factura_linea_factura WHERE DATE_SUB(NOW(),INTERVAL 1 WEEK) <= Fecha_factura AND Id_tienda_factura="+Id+";";	
			for (var index = 1; index <= 7; index++) {
				consulta += "SELECT SUM(Total_factura) Visualizaciones FROM factura WHERE DATE_SUB(NOW(),INTERVAL "+index+" WEEK) >= Fecha_factura AND DATE_SUB(NOW(),INTERVAL "+(index+1)+" WEEK) <= Fecha_factura AND Id_tienda_factura="+Id+";";	
			}
		}
		console.log(consulta);
		connection.query(consulta,function(err, rows, fields){
			if(err){
				console.log("Error en la query...");
				return res.status(400).json({ error: err });
			}else{
				console.log("Query OK");
				data["BeneficiosAppay"] = rows;
				data["Consulta"]= consulta;
				return res.status(200).json(data);	
			}
		});
    connection.release();
	});
});
module.exports = router;
