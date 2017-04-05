var express = require('express');
var router = express.Router();
var db = require('../helpers/database')();



//DEVUELVE OFERTAS DE Producto
router.get('/',function(req,res){
	db.getConnection(function(err, connection) {
        if (err) throw err;
		var consulta="UPDATE tienda SET Numero_usuarios_dia_tienda = 0";		
		console.log("Consulta:");
		console.log(consulta);
		connection.query(preconsulta+consulta,function(err, rows, fields){
			if(err){
				console.log("Error en la query...");
				return res.status(400).json({ error: err });
			}else{
				console.log("Query OK");
				if(rows.length != 0){
					data["Ofertas"] = "Ok";
					return res.status(200).json(data);
				}else{
					console.log("No hay Ofertas...");
					return res.status(204).json("No hace nada");	
				}
			}
		});
    connection.release();
	});
});

module.exports = router;