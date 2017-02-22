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
		var Nombretienda = connection.escape(req.query.nombretienda); //Variable que recoje el nombre de la tienda de la que quiere mostrar las facturas de la URI factura?nombretienda={num}
		var MinTotal = connection.escape(req.query.mintotal); //Variable que recoje el  minimo del total de la factura de la URI factura?total={num}
		var MaxTotal = connection.escape(req.query.maxtotal); //Variable que recoje el maximo del total de la factura de la URI factura?total={num}
		var FechaIni = connection.escape(req.query.fechaini); //Variable que recoje el inicio del periodo de la factura que se quiere mostrar de la URI factura?total={num}
		var FechaFin = connection.escape(req.query.fechafin); //Variable que recoje el fin del periodo de la factura que se quiere mostrar de la URI factura?total={num}
		var OrdeNombre = connection.escape(req.query.ordenombre); //Variable que indica sobre que parametro ordenar las facturas en la URI factura?ordenombre=true
		var OrdeFecha = connection.escape(req.query.ordefecha);//Variable que indica sobre que parametro ordenar las facturas en la URI factura?ordefecha=true
		var OrdeTotal = connection.escape(req.query.ordetotal); //Variable que indica sobre que parametro ordenar las facturas en la URI factura?ordetotal=true
		var Pagina = connection.escape(req.query.pagina); //Variable que indica que pagina de facturas estamos que se mostraran de 10 en 10
		console.log(id);
		console.log(OrdeNombre+"fsdfs");
		console.log(OrdeFecha);
		console.log(OrdeTotal);
	
		if(id != 'NULL'){ //Si en la URI existe se crea la consulta de busqueda por id y se muestran todos los detalles de la factura
			var infoTienda = "SELECT f.Id_factura, f.Id_tienda, t.Nombre, t.NIF, f.Fecha_factura, f.Total_factura, f.Pagada FROM factura f JOIN tienda t ON t.Id_tienda = f.Id_tienda WHERE f.Id_factura ="+id;
			var consulta="SELECT l.Cantidad, p.Codigo, p.Nombre, p.Precio, l.Id_oferta_usuario, l.Id_oferta_producto, l.Total_linea FROM factura f JOIN linea_factura l ON l.Id_factura = f.Id_factura JOIN producto_tienda pt ON pt.Id_producto_tienda = l.Id_producto_tienda JOIN producto p ON p.Id_producto = pt.Id_producto JOIN tienda t ON t.Id_tienda = f.Id_tienda WHERE f.Id_factura="+id+";";
			console.log(infoTienda);
			console.log(consulta);
			//Consulta multiple
			connection.query(consulta+infoTienda, function(err, rows, fields){
				if(rows.length != 0){
					data["Factura"] = rows[1];
					data["Lineas"] = rows[0];
					res.status(200);
				}else{
					data["Factura"] = 'No hay facturas';
				}
				res.json(data);
			});

		}else{ //Si no muestra todas las facturas
			var consulta = "SELECT * FROM factura f JOIN tienda t ON t.Id_tienda = f.Id_tienda";
			var i=0;
			if(MinTotal != 'NULL' || MaxTotal != 'NULL' || FechaIni != 'NULL' ||FechaFin != 'NULL' || Nombretienda != 'NULL'){
				consulta += " WHERE ";
				if(MaxTotal != 'NULL'){
					if (i==1) {
						consulta  += " AND ";
						i--;	
					}
					consulta  += "f.Total_factura<="+MaxTotal;
					i++;
				}
				if(MinTotal != 'NULL'){
					if (i==1) {
						consulta  += " AND ";
						i--;	
					}
					consulta  += "f.Total_factura>="+MinTotal;
					i++;
				}
				if(FechaIni != 'NULL'){
					if (i==1) {
						consulta  += " AND ";
						i--;	
					}
					consulta  += "f.Fecha_factura>="+FechaIni;
					i++;
				}
				if(FechaFin != 'NULL'){
					if (i==1) {
						consulta  += " AND ";
						i--;	
					}
					consulta  += "f.Fecha_factura<="+FechaFin;
					i++;
				}
				if(Nombretienda != 'NULL'){
					if (i==1) {
						consulta  += " AND ";
						i--;	
					}
					consulta  += "t.Nombre LIKE '%"+Nombretienda.replace(/'/g, "")+"%'";
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
						consulta  += "f.Fecha_factura ASC";
					}
					if (OrdeFecha=="'0'") {
						consulta  += "f.Fecha_factura DESC";	
					}
				}
				if(OrdeTotal != 'NULL'){
					if(orden!=0){
						consulta  += " , ";
						orden=orden-1;
					}
					orden=orden+1;
					if (OrdeTotal=="'1'") {
						consulta  += "f.Fecha_factura ASC";
					}
					if (OrdeTotal=="'0'") {
						consulta  += "f.Fecha_factura DESC";	
					}
				}
				if(OrdeNombre != 'NULL'){
					if(orden!=0){
						consulta  += " , ";
						orden=orden-1;
					}
					orden=orden+1;
					if (OrdeNombre=="'1'") {
						consulta  += "  f.Fecha_factura ASC";
					}
					if (OrdeNombre=="'0'") {
						consulta  += "  f.Fecha_factura DESC";	
					}
				}
			}
			if(Pagina!='NULL'){
				var pags=parseInt(Pagina)*10;
				consulta += " LIMIT 10 OFF SET "+pags;
			}
			console.log(consulta);
			var data = {
				"Facturas":""
			};
			connection.query(consulta, function(err, rows, fields){
			if(rows.length != 0){
				data["Facturas"] = rows;
				res.status(200);
			}else{
				data["Facturas"] = 'No hay facturas';
			}
			res.json(data);
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

		 	var consulta="SELECT f.Id_factura, f.Id_tienda, f.Fecha_factura, f.Total_factura, f.Pagada FROM factura f JOIN factura_usuario fu ON f.Id_factura = fu.Id_factura JOIN usuarios_tienda ut ON fu.Id_usuario_tienda = ut.Id_usuario_tienda JOIN usuarios u ON ut.Id_usuario = u.Id_usuario WHERE u.Id_usuario = "+id;
			var i=1;
			if(MinTotal != 'NULL' || MaxTotal != 'NULL' || FechaIni != 'NULL' ||FechaFin != 'NULL' || Nombretienda != 'NULL'){
				if(MaxTotal != 'NULL'){
					if (i==1) {
						consulta  += " AND ";
						i--;	
					}
					consulta  += "f.Total_factura<="+MaxTotal;
					i++;
				}
				if(MinTotal != 'NULL'){
					if (i==1) {
						consulta  += " AND ";
						i--;	
					}
					consulta  += "f.Total_factura>="+MinTotal;
					i++;
				}
				if(FechaIni != 'NULL'){
					if (i==1) {
						consulta  += " AND ";
						i--;	
					}
					consulta  += "f.Fecha_factura>="+FechaIni;
					i++;
				}
				if(FechaFin != 'NULL'){
					if (i==1) {
						consulta  += " AND ";
						i--;	
					}
					consulta  += "f.Fecha_factura<="+FechaFin;
					i++;
				}
				if(Nombretienda != 'NULL'){
					if (i==1) {
						consulta  += " AND ";
						i--;	
					}
					consulta  += "t.Nombre LIKE '%"+Nombretienda.replace(/'/g, "")+"%'";
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
						consulta  += "f.Fecha_factura ASC";
					}
					if (OrdeFecha=="'0'") {
						consulta  += "f.Fecha_factura DESC";	
					}
				}
				if(OrdeTotal != 'NULL'){
					if(orden!=0){
						consulta  += " , ";
						orden=orden-1;
					}
					orden=orden+1;
					if (OrdeTotal=="'1'") {
						consulta  += "f.Fecha_factura ASC";
					}
					if (OrdeTotal=="'0'") {
						consulta  += "f.Fecha_factura DESC";	
					}
				}
				if(OrdeNombre != 'NULL'){
					if(orden!=0){
						consulta  += " , ";
						orden=orden-1;
					}
					orden=orden+1;
					if (OrdeNombre=="'1'") {
						consulta  += "  f.Fecha_factura ASC";
					}
					if (OrdeNombre=="'0'") {
						consulta  += "  f.Fecha_factura DESC";	
					}
				}
			}
			if(Pagina!='NULL'){
				var pags=parseInt(Pagina)*10;
				consulta += " LIMIT 10 OFF SET "+pags;
			}
		 	connection.query(consulta,function(err, rows, fields){
			if(rows.length != 0){
				data["Factura"] = rows;
				res.status(200);
			}else{
				data["Factura"] = 'No hay facturas';
			}
			res.json(data);
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
				res.status(400).json({ error: err });
				console.log(err);
			}else{
				data["Facturas"] = "Datos insertados correctamente!";
				res.status(200);
			}
			res.json(data);
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
				res.status(400).json({ error: err });
				console.log(err);
			}else{
				data["Facturas"] = "Actualizado correctamente!";
				res.status(200);
			}
			res.json(data);
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
                consulta  += "Id_factura";
                i++;
        }
        if(Cantidad != 'NULL'){
            if (i==1) {
                consulta  += ", ";
                i--;	
            }
            consulta  += "Cantidad";
            i++;
        }
        if(Id_producto_tienda != 'NULL'){
            if (i==1) {
                consulta  += ", ";
                i--;	
            }
            
            consulta  += "Id_producto_tienda";
            i++;
        }
        if(Id_oferta_usuario != 'NULL'){
            if (i==1) {
                consulta  += ", ";
                i--;	
            }
            consulta  += "Id_oferta_usuario";
            i++;
        }
        if(Id_oferta_producto != 'NULL'){
            if (i==1) {
                consulta  += ", ";
                i--;	
            }
            consulta  += "Id_oferta_producto";
            i++;
        }
        if(Total_linea != 'NULL'){
            if (i==1) {
                consulta  += ", ";
                i--;	
            }
            consulta  += "Total_linea";
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
                        res.status(400).json({ error: err });
                        console.log(err);
                    }else{
                        data["Facturas"] = "Datos insertados correctamente!";
                        res.status(200);
                    }
                    res.json(data);
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
				consulta  += "Id_factura="+Id_factura;
				i++;
			}
			if(Cantidad != 'NULL'){
				if (i==1) {
					consulta  += ", ";
					i--;	
				}
				consulta  += "Cantidad="+Cantidad;
				i++;
			}
			if(Id_producto_tienda != 'NULL'){
				if (i==1) {
					consulta  += ", ";
					i--;	
				}
				consulta  += "Id_producto_tienda="+Id_producto_tienda;
				i++;
			}
			if(Id_oferta_usuario != 'NULL'){
				if (i==1) {
					consulta  += ", ";
					i--;	
				}
				consulta  += "Id_oferta_usuario="+Id_oferta_usuario;
				i++;
			}
			if(Id_oferta_producto != 'NULL'){
				if (i==1) {
					consulta  += ", ";
					i--;	
				}
				consulta  += "Id_oferta_producto="+Id_oferta_producto;
				i++;
			}
			if(Total_linea != 'NULL'){
				if (i==1) {
					consulta  += ", ";
					i--;	
				}
				consulta  += "Total_linea="+Total_linea;
				i++;
			}
			consulta = consulta + " WHERE Id_linea_factura="+ID;

		}

		connection.query(consulta,function(err, rows, fields){
						if(err){
							res.status(400).json({ error: err });
							console.log(err);
						}else{
							data["Facturas"] = "Datos actualizados correctamente!";
							res.status(200);
						}
						res.json(data);
				});   		
    connection.release();
	});
});


module.exports = router;