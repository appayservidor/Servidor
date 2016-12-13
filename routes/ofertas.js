/**************************************************************************
 **************************************************************************
 **** AQUI SE HARAN TODAS LAS PETICIONES RELACIONADAS CON LAS OFERTAS ****
 **************************************************************************
 **************************************************************************/


//Funcion que genera el GET de OFERTAS de usuario
function getOfertasUsuario (app, connection) {
	app.get('/ofertasUsuario',function(req,res){
		var data = {
			"Ofertas":""
		};
		var idUsuario = connection.escape(req.query.idUsuario); //Variable que recoje el id del usuario de la URI ofertas?idUsuario={num}
		var idTienda = connection.escape(req.query.idTienda); //Variable que recoje el id de la tienda de la URI ofertas?idTienda={num}
		var idProductoTienda = connection.escape(req.query.idProductoTienda); //Variable que recoje el id del producto de la URI ofertas?idProductoTienda={num}
		var aux=1;
		var consulta="SELECT * FROM oferta_usuario WHERE ";
		if(idUsuario != 'NULL'){ //Si en la URI existe se crea la consulta de busqueda por id
			consulta+="Id_usuario="+idUsuario;
			aux--;
		}
		if(idTienda != 'NULL'){ //Si en la URI existe se crea la consulta de busqueda por id
			if(aux==0){
				consulta+=" AND Id_tienda="+idTienda;
			}else{
				consulta+="Id_tienda="+idTienda;
				aux--;
			}
		}
		if(idProductoTienda != 'NULL'){ //Si en la URI existe se crea la consulta de busqueda por id
			if(aux==0){
				consulta+=" AND Id_producto_tienda="+idProductoTienda;
			}else{
				consulta+="Id_producto_tienda="+idProductoTienda;
				aux--;
			}
		}
		connection.query(consulta,function(err, rows, fields){
			if(rows.length != 0){
				data["Ofertas"] = rows;
				res.status(200);
			}else{
				data["Ofertas"] = 'No hay ofertas';
			}
			res.json(data);
		});
	});
}



//Funcion que genera el GET de OFERTAS de producto
function getOfertasProducto (app, connection) {
	app.get('/ofertasProducto',function(req,res){
		var data = {
			"Ofertas":""
		};
		var idTienda = connection.escape(req.query.idTienda); //Variable que recoje el id de la tienda de la URI ofertas?idTienda={num}
		var idProductoTienda = connection.escape(req.query.idProductoTienda); //Variable que recoje el id del producto de la URI ofertas?idProductoTienda={num}
		var aux=1;
		var consulta="SELECT * FROM oferta_producto WHERE ";
		if(idProductoTienda != 'NULL'){ //Si en la URI existe se crea la consulta de busqueda por id
			consulta+="Id_producto_tienda="+idProductoTienda;
			aux--;
		}
		if(idTienda != 'NULL'){ //Si en la URI existe se crea la consulta de busqueda por id
			if(aux==0){
				consulta+=" AND Id_tienda="+idTienda;
			}else{
				consulta+="Id_tienda="+idTienda;
				aux--;
			}
		}
		connection.query(consulta,function(err, rows, fields){
			if(rows.length != 0){
				data["Ofertas"] = rows;
				res.status(200);
			}else{
				data["Ofertas"] = 'No hay ofertas';
			}
			res.json(data);
		});
	});
}


//Funcion que genera el POST de Ofertas de productos
function postOfertasProductos (app, connection) {
	app.post('/ofertasProducto',function(req,res){
		var FechaIni = connection.escape(req.body.fechaini);
		var FechaFin = connection.escape(req.body.fechafin);
		var P_oferta = connection.escape(req.body.p_oferta);
		var Id_tienda = connection.escape(req.body.id_tienda);
		var Id_producto_tienda = connection.escape(req.body.id_producto_tienda);
		var Estado = connection.escape(req.body.estado);
		var Eliminado = connection.escape(req.body.eliminado);
		var data = {
			"Errores":1,
			"Ofertas":""
		};
		var consulta = "INSERT INTO oferta_producto (";
		var i=0;
		if(FechaIni != 'NULL'){
			consulta  += "Fecha_inicio";
			i++;
		}
		if(FechaFin != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Fecha_fin";
			i++;
		}
		if(P_oferta != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "P_oferta";
			i++;
		}
		if(Id_tienda != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Id_tienda";
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
		consulta+=", Estado , Eliminado) VALUES (";
		var i=0;
		if(FechaIni != 'NULL'){
			consulta  += FechaIni;
			i++;
		}
		if(FechaFin != 'NULL'){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += FechaFin;
			i++;
		}
		if(P_oferta != 'NULL'){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += P_oferta;
			i++;
		}
		if(Id_tienda != 'NULL'){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += Id_tienda;
			i++;
		}
		if(Id_producto_tienda != 'NULL'){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += Id_producto_tienda;
			i++;
		}
		consulta+=",'1','0')";
		console.log(consulta);
			connection.query(consulta,function(err, rows, fields){
				if(err){
					res.status(400).json({ error: err });
					console.log(err);
				}else{
					data["Ofertas"] = "Datos insertados correctamente!";
					res.status(200);
				}
				res.json(data);
			});
	});
}



//Funcion que genera el POST de Ofertas de usuarios
function postOfertasUsuarios (app, connection) {
	app.post('/ofertasUsuario',function(req,res){
		var FechaIni = connection.escape(req.body.fechaini);
		var FechaFin = connection.escape(req.body.fechafin);
		var P_oferta = connection.escape(req.body.p_oferta);
		var Id_usuario = connection.escape(req.body.id_usuario);
		var Id_tienda = connection.escape(req.body.id_tienda);
		var Id_producto_tienda = connection.escape(req.body.id_producto_tienda);
		var Estado = connection.escape(req.body.estado);
		var Eliminado = connection.escape(req.body.eliminado);
		var data = {
			"Errores":1,
			"Ofertas":""
		};
		var consulta = "INSERT INTO oferta_producto (";
		var i=0;
		if(FechaIni != 'NULL'){
			consulta  += "Fecha_inicio";
			i++;
		}
		if(FechaFin != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Fecha_fin";
			i++;
		}
		if(P_oferta != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "P_oferta";
			i++;
		}
		if(Id_usuario != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Id_usuario";
			i++;
		}
		if(Id_tienda != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Id_tienda";
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
		consulta+=", Estado , Eliminado) VALUES (";
		var i=0;
		if(FechaIni != 'NULL'){
			consulta  += FechaIni;
			i++;
		}
		if(FechaFin != 'NULL'){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += FechaFin;
			i++;
		}
		if(P_oferta != 'NULL'){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += P_oferta;
			i++;
		}
		if(Id_usuario != 'NULL'){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += Id_usuario;
			i++;
		}
		if(Id_tienda != 'NULL'){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += Id_tienda;
			i++;
		}
		if(Id_producto_tienda != 'NULL'){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
			consulta  += Id_producto_tienda;
			i++;
		}
		consulta+=",'1','0')";
		console.log(consulta);
			connection.query(consulta,function(err, rows, fields){
				if(err){
					res.status(400).json({ error: err });
					console.log(err);
				}else{
					data["Ofertas"] = "Datos insertados correctamente!";
					res.status(200);
				}
				res.json(data);
			});
	});
}

//Funcion que genera el PUT (Update) de Ofertas de usuario
function updateOfertasUsuario (app, connection){
	app.put('/ofertasUsuario',function(req,res){
		var ID = connection.escape(req.body.ID);
		var FechaIni = connection.escape(req.body.fechaini);
		var FechaFin = connection.escape(req.body.fechafin);
		var P_oferta = connection.escape(req.body.p_oferta);
		var Id_usuario = connection.escape(req.body.id_usuario);
		var Id_tienda = connection.escape(req.body.id_tienda);
		var Id_producto_tienda = connection.escape(req.body.id_producto_tienda);
		var Estado = connection.escape(req.body.estado);
		var Eliminado = connection.escape(req.body.eliminado);
		var data = {
			"Ofertas":""
		};	
			if(ID == "''"){
				ID = "null.null.null"
			}
			var consulta = "UPDATE oferta_usuario SET ";
			if(ID != 'NULL'){
				var i=0;
				if(FechaIni != 'NULL'){
					consulta  += "Fecha_inicio="+FechaIni;
					i++;
				}
				if(FechaFin != 'NULL'){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "Fecha_fin="+FechaFin;
					i++;
				}
				if(P_oferta != 'NULL'){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "P_oferta="+P_oferta;
					i++;
				}
				if(Id_usuario != 'NULL'){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "Id_usuario="+Id_usuario;
					i++;
				}
				if(Id_tienda != 'NULL'){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "Id_tienda="+Id_tienda;
					i++;
				}
				if(Id_producto_tienda != 'NULL'){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "Id_producto_tienda="+Id_producto_tienda;
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
				consulta = consulta + " WHERE Id_oferta_usuario="+ID;
			}
			console.log(consulta);
			connection.query(consulta,function(err, rows, fields){
				if(err){
					res.status(400).json({ error: err });
				}else{
					data["Ofertas"] = "Actualizado correctamente!";
					res.status(200);
				}
				res.json(data);
			});
		
	});
}





//Funcion que genera el PUT (Update) de Ofertas de producto
function updateOfertasProducto (app, connection){
	app.put('/ofertasProducto',function(req,res){
		var ID = connection.escape(req.body.ID);
		var FechaIni = connection.escape(req.body.fechaini);
		var FechaFin = connection.escape(req.body.fechafin);
		var P_oferta = connection.escape(req.body.p_oferta);
		var Id_tienda = connection.escape(req.body.id_tienda);
		var Id_producto_tienda = connection.escape(req.body.id_producto_tienda);
		var Estado = connection.escape(req.body.estado);
		var Eliminado = connection.escape(req.body.eliminado);
		var data = {
			"Ofertas":""
		};	
			if(ID == "''"){
				ID = "null.null.null"
			}
			var consulta = "UPDATE oferta_usuario SET ";
			if(ID != 'NULL'){
				var i=0;
				if(FechaIni != 'NULL'){
					consulta  += "Fecha_inicio="+FechaIni;
					i++;
				}
				if(FechaFin != 'NULL'){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "Fecha_fin="+FechaFin;
					i++;
				}
				if(P_oferta != 'NULL'){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "P_oferta="+P_oferta;
					i++;
				}
				if(Id_tienda != 'NULL'){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "Id_tienda="+Id_tienda;
					i++;
				}
				if(Id_producto_tienda != 'NULL'){
					if (i==1) {
						consulta  += " , ";
						i--;	
					}
					consulta  += "Id_producto_tienda="+Id_producto_tienda;
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
				consulta = consulta + " WHERE Id_oferta_usuario="+ID;
			}
			console.log(consulta);
			connection.query(consulta,function(err, rows, fields){
				if(err){
					res.status(400).json({ error: err });
				}else{
					data["Ofertas"] = "Actualizado correctamente!";
					res.status(200);
				}
				res.json(data);
			});
		
	});
}




//Devuelvo todos los metodos
exports.getUsuarios = getUsuarios;
exports.postUsuarios = postUsuarios;
exports.updateUsuarios = updateUsuarios;
