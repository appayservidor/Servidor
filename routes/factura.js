var express = require('express');
var router = express.Router();
var db = require('../helpers/database')();
var comprobacionjwt= require ('../helpers/comprobacionjwt');

//Get facturas(muestra todas las facturas)
router.get('/',comprobacionjwt,function(req,res){
	db.getConnection(function(err, connection) {
        if (err) throw err;
   		var data = {
			"Factura":"",
			"Lineas":""
		};
		var id = connection.escape(req.query.id); //Variable que recoje el id de la factura de la URI factura?id={num}
		var Id_tienda = connection.escape(req.query.id_tienda); //Variable que recoje el nombre de la tienda de la que quiere mostrar las facturas de la URI factura?nombretienda={num}
		var MinTotal = connection.escape(req.query.mintotal); //Variable que recoje el  minimo del total de la factura de la URI factura?total={num}
		var MaxTotal = connection.escape(req.query.maxtotal); //Variable que recoje el maximo del total de la factura de la URI factura?total={num}
		var FechaIni = connection.escape(req.query.fechaini); //Variable que recoje el inicio del periodo de la factura que se quiere mostrar de la URI factura?total={num}
		var FechaFin = connection.escape(req.query.fechafin); //Variable que recoje el fin del periodo de la factura que se quiere mostrar de la URI factura?total={num}
		var OrdeFecha = connection.escape(req.query.ordefecha);//Variable que indica sobre que parametro ordenar las facturas en la URI factura?ordefecha=true
		var OrdeTotal = connection.escape(req.query.ordetotal); //Variable que indica sobre que parametro ordenar las facturas en la URI factura?ordetotal=true
		var Pagina = connection.escape(req.query.pagina); //Variable que indica que pagina de facturas estamos que se mostraran de 10 en 10
		if(id != 'NULL'){ //Si en la URI existe se crea la consulta de busqueda por id y se muestran todos los detalles de la factura
			var infoTienda = "SELECT * FROM factura, tienda WHERE Id_tienda = Id_tienda_factura AND Id_factura ="+id;
			var consulta="SELECT * FROM linea_factura WHERE Id_factura_linea_factura="+id+";";
			console.log(infoTienda);
			console.log(consulta);
			//Consulta multiple
			connection.query(consulta+infoTienda, function(err, rows, fields){
				if(err){
					console.log("Error en la query...");
					return res.status(400).json({ error: err });
				}else{
					console.log("Query OK");
					if(rows.length != 0){
						console.log("Devuelvo las facturas");
						data["Factura"] = rows[1];
						data["Lineas"] = rows[0];
						return res.status(200).json(data);
					}else{
						data["Factura"] = 'No hay facturas';
						console.log("No hay facturas...");
						return res.status(204).json(data);	
					}
				}
			});

		}else{ //Si no muestra todas las facturas
			var consulta = "SELECT * FROM factura";
			var i=0;
			if(MinTotal != 'NULL' || MaxTotal != 'NULL' || FechaIni != 'NULL' ||FechaFin != 'NULL' || Id_tienda != 'NULL'){
				consulta += " WHERE ";
				if(MaxTotal != 'NULL'){
					if (i==1) { 
						consulta  += " AND ";
						i--;	
					}
					consulta  += "Total_factura<="+MaxTotal;
					i++;
				}
				if(MinTotal != 'NULL'){
					if (i==1) {
						consulta  += " AND ";
						i--;	
					}
					consulta  += "Total_factura>="+MinTotal;
					i++;
				}
				if(FechaIni != 'NULL'){
					if (i==1) {
						consulta  += " AND ";
						i--;	
					}
					consulta  += "Fecha_factura>="+FechaIni;
					i++;
				}
				if(FechaFin != 'NULL'){
					if (i==1) {
						consulta  += " AND ";
						i--;	
					}
					consulta  += "Fecha_factura<="+FechaFin;
					i++;
				}
				if(Id_tienda != 'NULL'){
					if (i==1) {
						consulta  += " AND ";
						i--;	
					}
					consulta  += "Id_tienda_factura ="+Id_tienda;
					i++;
				}
			}
			if(OrdeFecha != 'NULL' || OrdeTotal != 'NULL'){
				var orden =0;
				consulta  += " ORDER BY ";
				if(OrdeFecha != 'NULL'){
					if(orden!=0){
						consulta  += " , ";
						orden=orden-1;
					}
					orden=orden+1;
					if (OrdeFecha=="'1'") {
						consulta  += "Fecha_factura ASC";
					}
					if (OrdeFecha=="'0'") {
						consulta  += "Fecha_factura DESC";	
					}
				}
				if(OrdeTotal != 'NULL'){
					if(orden!=0){
						consulta  += " , ";
						orden=orden-1;
					}
					orden=orden+1;
					if (OrdeTotal=="'1'") {
						consulta  += "Fecha_factura ASC";
					}
					if (OrdeTotal=="'0'") {
						consulta  += "Fecha_factura DESC";	
					}
				}
			}
			if(Pagina!='NULL'){
				var pags=parseInt(Pagina.replace(/'/g, ""))*10;
				console.log("Voy a mostrar solo las 10 siguientes filas empezando en la: "+pags);
				consulta += " LIMIT 10 OFFSET "+pags;
			}
			console.log(consulta);
			var data = {
				"Facturas":""
			};
			connection.query(consulta, function(err, rows, fields){
				if(err){
					console.log("Error en la query...");
					return res.status(400).json({ error: err });
				}else{
					console.log("Query OK");
					if(rows.length != 0){
						console.log("Devuelvo las facturas");
						data["Facturas"] = rows;
						return res.status(200).json(data);
					}else{
						data["Facturas"] = 'No hay facturas';
						console.log("No hay facturas...");
						return res.status(204).json(data);	
					}
				}
			});
		}     
    	connection.release();
	});
});

//Funcion GET de facturas (Muestra las facturas de un usuario)
router.get('/usuario',comprobacionjwt,function(req,res){
	db.getConnection(function(err, connection) {
        if (err) throw err;
   		var data = {
			"Factura":"",
		};
	 	var id = connection.escape(req.query.id);
		var Nombretienda = connection.escape(req.query.nombretienda); //Variable que recoje el nombre de la tienda de la que quiere mostrar las facturas de la URI factura?nombretienda={num}
		var MinTotal = connection.escape(req.query.mintotal); //Variable que recoje el  minimo del total de la factura de la URI factura?total={num}
		var MaxTotal = connection.escape(req.query.maxtotal); //Variable que recoje el maximo del total de la factura de la URI factura?total={num}
		var FechaIni = connection.escape(req.query.fechaini); //Variable que recoje el inicio del periodo de la factura que se quiere mostrar de la URI factura?total={num}
		var FechaFin = connection.escape(req.query.fechafin); //Variable que recoje el fin del periodo de la factura que se quiere mostrar de la URI factura?total={num}
		var OrdeNombre = connection.escape(req.query.ordenombre); //Variable que indica sobre que parametro ordenar las facturas en la URI factura?ordenombre=true
		var OrdeFecha = connection.escape(req.query.ordefecha);//Variable que indica sobre que parametro ordenar las facturas en la URI factura?ordefecha=true
		var OrdeTotal = connection.escape(req.query.ordetotal); //Variable que indica sobre que parametro ordenar las facturas en la URI factura?ordetotal=true
		var Pagina = connection.escape(req.query.pagina); //Variable que indica que pagina de facturas estamos que se mostraran de 10 en 10
		var Id_tienda = connection.escape(req.query.id_tienda); //Variable que recoje el nombre de la tienda de la que quiere mostrar las facturas de la URI factura?nombretienda={num}

		 	var consulta="SELECT * FROM factura, factura_usuario, usuario_tienda WHERE Id_factura = Id_factura_factura_usuario AND Id_usuario_usuario_tienda = "+id;
			var i=1;
			if(MinTotal != 'NULL' || MaxTotal != 'NULL' || FechaIni != 'NULL' ||FechaFin != 'NULL' || Nombretienda != 'NULL' || Id_tienda != 'NULL' ){
				if(MaxTotal != 'NULL'){
					if (i==1) {
						consulta  += " AND ";
						i--;	
					}
					consulta  += "Total_factura<="+MaxTotal;
					i++;
				}
				if(MinTotal != 'NULL'){
					if (i==1) {
						consulta  += " AND ";
						i--;	
					}
					consulta  += "Total_factura>="+MinTotal;
					i++;
				}
				if(FechaIni != 'NULL'){
					if (i==1) {
						consulta  += " AND ";
						i--;	
					}
					consulta  += "Fecha_factura>="+FechaIni;
					i++;
				}
				if(FechaFin != 'NULL'){
					if (i==1) {
						consulta  += " AND ";
						i--;	
					}
					consulta  += "Fecha_factura<="+FechaFin;
					i++;
				}
				if(Nombretienda != 'NULL'){
					if (i==1) {
						consulta  += " AND ";
						i--;	
					}
					consulta  += "Nombre_tienda LIKE '%"+Nombretienda.replace(/'/g, "")+"%'";
					i++;
				}
				if(Id_tienda != 'NULL'){
					if (i==1) {
						consulta  += " AND ";
						i--;	
					}
					consulta  += "Id_tienda_usuario_tienda="+Id_tienda;
					i++;
				}
				
			}
			if(OrdeFecha != 'NULL' || OrdeTotal != 'NULL' || OrdeNombre != 'NULL'){
				var orden =0;
				consulta  += " ORDER BY ";
				if(OrdeFecha != 'NULL'){
					if(orden!=0){
						consulta  += " , ";
						orden=orden-1;
					}
					orden=orden+1;
					if (OrdeFecha=="'1'") {
						consulta  += "Fecha_factura ASC";
					}
					if (OrdeFecha=="'0'") {
						consulta  += "Fecha_factura DESC";	
					}
				}
				if(OrdeTotal != 'NULL'){
					if(orden!=0){
						consulta  += " , ";
						orden=orden-1;
					}
					orden=orden+1;
					if (OrdeTotal=="'1'") {
						consulta  += "Total_factura ASC";
					}
					if (OrdeTotal=="'0'") {
						consulta  += "Total_factura DESC";	
					}
				}
				if(OrdeNombre != 'NULL'){
					if(orden!=0){
						consulta  += " , ";
						orden=orden-1;
					}
					orden=orden+1;
					if (OrdeNombre=="'1'") {
						consulta  += "  Nombre_tienda ASC";
					}
					if (OrdeNombre=="'0'") {
						consulta  += "  Nombre_tienda DESC";	
					}
				}
			}
			if(Pagina!='NULL'){
				var pags=parseInt(Pagina.replace(/'/g, ""))*10;
				console.log("Voy a mostrar solo las 10 siguientes filas empezando en la: "+pags);
				consulta += " LIMIT 10 OFFSET "+pags;
			}
		 	connection.query(consulta,function(err, rows, fields){
			if(err){
				console.log(err);
				return res.status(400).json({ error: err });
			}else{
				if(rows.length != 0){
					data["Factura"] = rows;
					return res.status(200).json(data);
				}else{
					data["Factura"] = 'No hay facturas';
					return res.status(204).json(data);
				}
			}
		});	
    connection.release();
	});
});

//Funcion que genera el POST de Facturas
router.post('/',comprobacionjwt,function(req,res){
	db.getConnection(function(err, connection) {
        if (err) throw err;
 		var Id_tienda = connection.escape(req.body.id_tienda);
		var Fecha_factura = connection.escape(req.body.fecha);
		var Total_factura = connection.escape(req.body.total);
		var Pagada = connection.escape(req.body.pagada);
		var data = {
			"Facturas":""
		};
		var consulta = "INSERT INTO factura (";
		var i=0;
		if(Id_tienda != 'NULL'){
			consulta  += "Id_tienda";
			i++;
		}
		if(Fecha_factura != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Fecha_factura";
			i++;
		}
		if(Total_factura != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Total_factura";
			i++;
		}
		if(Pagada != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Pagada";
			i++;
		}
		
		consulta+=") VALUES (";
		var i=0;
		if(Id_tienda != 'NULL'){
			consulta  += Id_tienda;
			i++;
		}
		if(Fecha_factura != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += Fecha_factura;
			i++;
		}
		if(Total_factura != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += Total_factura;
			i++;
		}
		if(Pagada != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += Pagada;
			i++;
		}
		consulta+=")"
		connection.query(consulta,function(err, rows, fields){
			if(err){
				console.log(err);
				return res.status(400).json({ error: err });
			}else{
				data["Facturas"] = "Datos insertados correctamente!";
				return res.status(200).json(data);
			}
		});  		
    connection.release();
	});
});

//Funcion que genera el PUT (Update) de Facturas
router.put('/',comprobacionjwt,function(req,res){
	db.getConnection(function(err, connection) {
        if (err) throw err;
 		var ID =connection.escape(req.body.id_factura);  
		var Id_tienda = connection.escape(req.body.id_tienda);
		var Fecha_factura = connection.escape(req.body.fecha);
		var Total = connection.escape(req.body.total);
		var Pagada = connection.escape(req.body.pagada);
		var data = {
			"Facturas":""
		};
		if(ID != 'NULL'){
			var consulta = "UPDATE factura SET ";
			var i=0;
			if(Id_tienda != 'NULL'){
				consulta  += "Id_tienda="+Id_tienda;
				i++;
			}
			if(Fecha_factura != 'NULL'){
				if (i==1) {
					consulta  += ", ";
					i--;	
				}
				consulta  += "Fecha_factura="+Fecha_factura;
				i++;
			}
			if(Total != 'NULL'){
				if (i==1) {
					consulta  += ", ";
					i--;	
				}
				consulta  += "Total_factura="+Total;
				i++;
			}
			if(Pagada != 'NULL'){
				if (i==1) {
					consulta  += ", ";
					i--;	
				}
				consulta  += "Pagada="+Pagada;
				i++;
			}
			consulta = consulta + " WHERE Id_factura="+ID;
		}
		console.log(consulta);
		connection.query(consulta,function(err, rows, fields){
			if(err){
				console.log(err);
				return res.status(400).json({ error: err });
			}else{
				data["Facturas"] = "Actualizado correctamente!";
				return res.status(200).json(data);
			}
		});  		
    connection.release();
	});
});


//Funcion que genera el POST de Lineas de Factura
router.post('/lineafactura',comprobacionjwt,function(req,res){
	db.getConnection(function(err, connection) {
        if (err) throw err;
 		var Id_factura = connection.escape(req.body.id_factura);  
		var Cantidad = connection.escape(req.body.cantidad);
		var Id_producto_tienda = connection.escape(req.body.id_producto_tienda);
		var Id_oferta_usuario = connection.escape(req.body.id_oferta_usuario);
		var Id_oferta_producto = connection.escape(req.body.id_oferta_producto);
		var Total_linea = connection.escape(req.body.total_linea);
		var data = {
			"Facturas":""
		};
	
        //Buscamos el Id de producto tienda con el producto que pasamos por parametro	
        var consulta = "INSERT INTO linea_factura (";
        var i=0;
        if(Id_factura != 'NULL'){
                consulta  += "Id_factura_linea_factura";
                i++;
        }
        if(Cantidad != 'NULL'){
            if (i==1) {
                consulta  += ", ";
                i--;	
            }
            consulta  += "Cantidad_linea_factura";
            i++;
        }
        if(Id_producto_tienda != 'NULL'){
            if (i==1) {
                consulta  += ", ";
                i--;	
            }
            
            consulta  += "Id_producto_tienda_linea_factura";
            i++;
        }
        if(Id_oferta_usuario != 'NULL'){
            if (i==1) {
                consulta  += ", ";
                i--;	
            }
            consulta  += "Id_oferta_usuario_linea_factura";
            i++;
        }
        if(Id_oferta_producto != 'NULL'){
            if (i==1) {
                consulta  += ", ";
                i--;	
            }
            consulta  += "Id_oferta_producto_linea_factura";
            i++;
        }
        if(Total_linea != 'NULL'){
            if (i==1) {
                consulta  += ", ";
                i--;	
            }
            consulta  += "Total_linea_factura";
            i++;
        }

        consulta+=") VALUES (";
        var i=0;

        if(Id_factura != 'NULL'){
            consulta  += Id_factura;
            i++;
        }
        if(Cantidad != 'NULL'){
            if (i==1) {
                consulta  += ", ";				
                i--;	
            }
            consulta  += Cantidad;
            i++;
        }
        if(Id_producto_tienda != 'NULL'){
            if (i==1) {
                consulta  += ", ";
                i--;	
            }
            consulta  += Id_producto_tienda;
            i++;
        }
        if(Id_oferta_usuario != 'NULL'){
            if (i==1) {
                consulta  += ", ";
                i--;	
            }
            consulta  += Id_oferta_usuario;
            i++;
        }
        if(Id_oferta_producto != 'NULL'){
            if (i==1) {
                consulta  += ", ";
                i--;	
            }
            consulta  += Id_oferta_producto;
            i++;
        }
        if(Total_linea != 'NULL'){
            if (i==1) {
                consulta  += ", ";
                i--;	
            }
            consulta  += Total_linea;
            i++;
        }
        consulta+=")";
        console.log(consulta);
            connection.query(consulta,function(err, rows, fields){
                    if(err){
						console.log(err);
                        return res.status(400).json({ error: err });
                    }else{
                        data["Facturas"] = "Datos insertados correctamente!";
                        return res.status(200).json(data);
                    }
		});  		
    connection.release();
	});
});

//UPDATE LINEA DE FACTURA
router.put('/lineafactura',comprobacionjwt,function(req,res){
	db.getConnection(function(err, connection) {
        if (err) throw err;
		var ID = connection.escape(req.body.id_linea_factura);
		var Id_factura = connection.escape(req.body.id_factura);  
		var Cantidad = connection.escape(req.body.cantidad);
		var Id_producto_tienda = connection.escape(req.body.id_producto_tienda);
		var Id_oferta_usuario = connection.escape(req.body.id_oferta_usuario);
		var Id_oferta_producto = connection.escape(req.body.id_oferta_producto);
		var Total_linea = connection.escape(req.body.total_linea);
		var data = {
			"Facturas":""
		};

		if(ID != 'NULL'){
			var consulta = "UPDATE linea_factura SET ";
			var i=0;
			if(Id_factura != 'NULL'){
				consulta  += "Id_factura_linea_factura="+Id_factura;
				i++;
			}
			if(Cantidad != 'NULL'){
				if (i==1) {
					consulta  += ", ";
					i--;	
				}
				consulta  += "Cantidad_linea_factura="+Cantidad;
				i++;
			}
			if(Id_producto_tienda != 'NULL'){
				if (i==1) {
					consulta  += ", ";
					i--;	
				}
				consulta  += "Id_producto_tienda_linea_factura="+Id_producto_tienda;
				i++;
			}
			if(Id_oferta_usuario != 'NULL'){
				if (i==1) {
					consulta  += ", ";
					i--;	
				}
				consulta  += "Id_oferta_usuario_linea_factura="+Id_oferta_usuario;
				i++;
			}
			if(Id_oferta_producto != 'NULL'){
				if (i==1) {
					consulta  += ", ";
					i--;	
				}
				consulta  += "Id_oferta_producto_linea_factura="+Id_oferta_producto;
				i++;
			}
			if(Total_linea != 'NULL'){
				if (i==1) {
					consulta  += ", ";
					i--;	
				}
				consulta  += "Total_linea_factura="+Total_linea;
				i++;
			}
			consulta = consulta + " WHERE Id_linea_factura="+ID;

		}

		connection.query(consulta,function(err, rows, fields){
						if(err){
							console.log(err);
							return res.status(400).json({ error: err });
						}else{
							data["Facturas"] = "Datos actualizados correctamente!";
							return res.status(200).json(data);
						}
				});   		
    connection.release();
	});
});


module.exports = router;