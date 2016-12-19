var express = require('express');
var router = express.Router();
var db = require('../helpers/database')();
var comprobacionjwt= require ('../helpers/comprobacionjwt');

//Get que devuelve si los productos estan pagados o no
router.get('/',comprobacionjwt,function(req,res){
	db.getConnection(function(err, connection) {
        if (err) throw err;
   		var data = {
			"Factura":"",
			"Lineas":""
		};
		var cod = connection.escape(req.query.Cod); //Variable que recoje el codigo del producto 
		var can = connection.escape(req.query.Can); //Variable que recoje la cantidad de productos de un mismo codigo 
		var consulta="SELECT l.Cantidad, p.Codigo FROM factura f JOIN linea_factura l ON l.Id_factura = f.Id_factura JOIN producto_tienda pt ON pt.Id_producto_tienda = l.Id_producto_tienda JOIN producto p ON p.Id_producto = pt.Id_producto JOIN tienda t ON t.Id_tienda = f.Id_tienda WHERE DATE_SUB(CURDATE(),INTERVAL 30 MINUTE ) <= Fecha_factura AND f.Pagada==1 AND l.cantidad = "+can+" AND Codigo = "+cod;
		console.log(consulta);
		//Consulta multiple
		connection.query(consulta, function(err, rows, fields){
			if(rows.length != 0){
				data["Factura"] = rows;
				res.status(200);
			}else{
				data["Factura"] = "Articulo con codigo:"+cod+" no pagado!!";
				res.status(404);
			}
			res.json(data);
		});
    connection.release();
	});
});
module.exports = router;