var express = require('express');
var router = express.Router();
var db = require('../helpers/database')();
var comprobacionjwt= require ('../helpers/comprobacionjwt');



//DEVUELVE OFERTAS DE Producto
router.get('/ofertasProducto',comprobacionjwt,function(req,res){
	db.getConnection(function(err, connection) {
        if (err) throw err;
		var data = {
			"Ofertas":"",
			"Registros":""
		};
		var Id_tienda = connection.escape(req.query.id_tienda); //Variable que recoje el id de la tienda de la URI ofertas?idTienda={num}
		var Id_producto_tienda = connection.escape(req.query.idProductoTienda); //Variable que recoje el id del producto de la URI ofertas?idProductoTienda={num}
		var Id_oferta_producto = connection.escape(req.query.id_oferta_usuario);
		var Pagina = connection.escape(req.query.pagina);
		var Registros = connection.escape(req.query.registros);
		var aux=0;
		var consulta="SELECT * FROM oferta_producto JOIN producto_tienda ON Id_producto_tienda_oferta_producto = Id_producto_tienda JOIN tienda ON Id_tienda=Id_tienda_oferta_usuario";
        if(Id_tienda != 'NULL' || Id_producto_tienda != 'NULL' || Id_oferta_usuario != 'NULL'){
			consulta+= " WHERE ";
			if(Id_tienda != 'NULL'){
				if(aux==1){
					consulta+=" AND ";
					aux--;
				}
				consulta += "Id_tienda_oferta_producto = "+Id_tienda;
				aux++;
			}
			if(Id_producto_tienda != 'NULL'){
				if(aux==1){
					consulta+=" AND ";
					aux--;
				}
				consulta += "Id_producto_tienda_oferta_producto = "+Id_producto_tienda;
				aux++;
			}
			if(Id_oferta_producto != 'NULL'){
				if(aux==1){
					consulta+=" AND ";
					aux--;
				}
				consulta += "Id_oferta_producto = "+Id_oferta_producto;
				aux++;
			}
		}
		var preconsulta = consulta+";";
		console.log("Preconsulta:");
		console.log(preconsulta);
		if(Pagina!='NULL'){
			if (Registros != 'NULL') {
				var nregis =parseInt(Registros.replace(/'/g, ""));
			}else{
				var nregis = 10;
			}
			var pags=parseInt(Pagina.replace(/'/g, ""))*nregis;
			console.log("Voy a mostrar solo las "+nregis+" siguientes filas empezando en la: "+pags);
			consulta += " LIMIT "+nregis+" OFFSET "+pags;
		}
		console.log("Consulta:");
		console.log(consulta);
		connection.query(preconsulta+consulta,function(err, rows, fields){
			if(err){
				console.log("Error en la query...");
				return res.status(400).json({ error: err });
			}else{
				console.log("Query OK");
				if(rows.length != 0){
					console.log("Devuelvo las ofertas de producto");
					data["Registros"]= rows[0].length;
					data["Ofertas"] = rows[1];
					return res.status(200).json(data);
				}else{
					data["Ofertas"] = 'No hay Ofertas';
					console.log("No hay Ofertas...");
					return res.status(204).json(data);	
				}
			}
		});
    connection.release();
	});
});

//DEVUELVE OFERTAS DE UN USUARIO
router.get('/ofertasUsuario',comprobacionjwt,function(req,res){
	db.getConnection(function(err, connection) {
        if (err) throw err;
		var data = {
			"Ofertas":"",
			"Registros":""
		};
		var Id_usuario = connection.escape(req.query.id_usuario); //Variable que recoje el id del usuario de la URI ofertas?idUsuario={num}
		var Id_tienda = connection.escape(req.query.id_tienda); //Variable que recoje el id de la tienda de la URI ofertas?idTienda={num}
		var Id_producto_tienda = connection.escape(req.query.idProductoTienda); //Variable que recoje el id del producto de la URI ofertas?idProductoTienda={num}
		var Id_oferta_usuario = connection.escape(req.query.id_oferta_usuario);
		var Pagina = connection.escape(req.query.pagina);
		var Registros = connection.escape(req.query.registros);
		var aux=0;
		var consulta="SELECT * FROM oferta_usuario JOIN usuario_ofertados ON Id_oferta_usuario=Id_oferta_usuario_usuarios_ofertados JOIN usuario_tienda ON Id_usuario_tienda=Id_usuario_usuarios_ofertados JOIN usuario ON Id_usuario=Id_usuario_usuario_tienda JOIN producto_tienda ON Id_producto_tienda=Id_producto_tienda_oferta_usuario JOIN tienda ON Id_tienda = Id_tienda_producto_tienda";
        if(Id_usuario != 'NULL' || Id_tienda != 'NULL' || Id_producto_tienda != 'NULL' || Id_oferta_usuario != 'NULL'){
			consulta+= " WHERE ";
			if(Id_usuario != 'NULL'){
				if(aux==1){
					consulta+=" AND ";
					aux--;
				}
				consulta += "Id_usuario = "+Id_usuario;
				aux++;
			}
			if(Id_tienda != 'NULL'){
				if(aux==1){
					consulta+=" AND ";
					aux--;
				}
				consulta += "Id_tienda = "+Id_tienda;
				aux++;
			}
			if(Id_producto_tienda != 'NULL'){
				if(aux==1){
					consulta+=" AND ";
					aux--;
				}
				consulta += "Id_producto_tienda = "+Id_producto_tienda;
				aux++;
			}
			if(Id_oferta_usuario != 'NULL'){
				if(aux==1){
					consulta+=" AND ";
					aux--;
				}
				consulta += "Id_oferta_usuario = "+Id_oferta_usuario;
				aux++;
			}
		}
		var preconsulta = consulta+";";
		console.log("Preconsulta:");
		console.log(preconsulta);
		if(Pagina!='NULL'){
			if (Registros != 'NULL') {
				var nregis =parseInt(Registros.replace(/'/g, ""));
			}else{
				var nregis = 10;
			}
			var pags=parseInt(Pagina.replace(/'/g, ""))*nregis;
			console.log("Voy a mostrar solo las "+nregis+" siguientes filas empezando en la: "+pags);
			consulta += " LIMIT "+nregis+" OFFSET "+pags;
		}
		console.log("Consulta:");
		console.log(consulta);
		connection.query(preconsulta+consulta,function(err, rows, fields){
			if(err){
				console.log("Error en la query...");
				return res.status(400).json({ error: err });
			}else{
				console.log("Query OK");
				if(rows.length != 0){
					console.log("Devuelvo las ofertas del usuario");
					data["Registros"]= rows[0].length;
					data["Ofertas"] = rows[1];
					return res.status(200).json(data);
				}else{
					data["Ofertas"] = 'No hay Ofertas';
					console.log("No hay Ofertas...");
					return res.status(204).json(data);	
				}
			}
		});
    connection.release();
	});
});

//POST de ofertas de usuario
router.post('/ofertasUsuario',comprobacionjwt,function(req,res){
	db.getConnection(function(err, connection) {
        if (err) throw err;
 		var FechaIni = connection.escape(req.body.fechaini);
		var FechaFin = connection.escape(req.body.fechafin);
		var P_oferta = connection.escape(req.body.p_oferta);
		var Usuarios = req.body.usuarios;
		var Id_tienda = connection.escape(req.body.id_tienda);
		var Id_producto_tienda = connection.escape(req.body.id_producto_tienda);
		var Foto = connection.escape(req.body.foto);
		var Descripcion = connection.escape(req.body.Descripcion);
		var Estado = connection.escape(req.body.estado);
		var Eliminado = connection.escape(req.body.eliminado);
		var data = {
			"Ofertas":""
		};
		var consulta = "INSERT INTO oferta_usuario (";
		var i=0;
		if(FechaIni != 'NULL'){
			consulta  += "Fecha_inicio_oferta_usuario";
			i++;
		}
		if(FechaFin != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Fecha_fin_oferta_usuario";
			i++;
		}
		if(P_oferta != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "P_oferta_oferta_usuario";
			i++;
		}
		if(Id_tienda != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Id_tienda_oferta_usuario";
			i++;
		}
		if(Id_producto_tienda != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Id_producto_tienda_oferta_usuario";
			i++;
		}
		if(Foto != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Foto_oferta_usuario";
			i++;
		}
		if(Descripcion != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Descripcion_oferta_usuario";
			i++;
		}
		consulta+=", Estado_oferta_usuario , Eliminado_oferta_usuario) VALUES (";
		var i=0;
		if(FechaIni != 'NULL'){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
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
				consulta  += ", ";
				i--;	
			}
			consulta  += Id_producto_tienda;
			i++;
		}
		if(Foto != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += Foto;
			i++;
		}
		if(Descripcion != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += Descripcion;
			i++;
		}
		consulta+=",'1','0')";
		console.log(consulta);
        connection.query(consulta,function(err, rows, fields){
            if(err){
				console.log("Error en la query...");
				return res.status(400).json({ error: err });
			}else{
				var id = rows.insertId;
				var consulta2 = "INSERT INTO usuario_ofertados (Id_usuario_usuarios_ofertados, Id_oferta_usuario_usuarios_ofertados) VALUES ";
				for (var index = 0; index < Usuarios.length; index++) {
					if (index==0) {
						consulta2+= "("+Usuarios[index]+", "+id+")";	
					}else if(index==Usuarios.length-1){
						consulta2+= ", ("+Usuarios[index]+", "+id+");";
					}else{
						consulta2+= ", ("+Usuarios[index]+", "+id+") ";
					}
				}
				console.log(consulta2);
				connection.query(consulta2,function(err, rows, fields){
					if(err){
						console.log("Error en la query...");
						return res.status(400).json({ error: err });
					}else{
						console.log("Usuarios ofertados insertados correctamente");
						data["Ofertas"] = "Usuarios ofertados insertados correctamente";
						return res.status(200).json(data);
					}
				});   
			}
        });       
    connection.release();
	});
});

//POST de ofertas de usuario
router.post('/ofertaProducto',comprobacionjwt,function(req,res){
	db.getConnection(function(err, connection) {
        if (err) throw err;
 		var FechaIni = connection.escape(req.body.fechaini);
		var FechaFin = connection.escape(req.body.fechafin);
		var P_oferta = connection.escape(req.body.p_oferta);
		var Id_tienda = connection.escape(req.body.id_tienda);
		var Id_producto_tienda = connection.escape(req.body.id_producto_tienda);
		var Foto = connection.escape(req.body.foto);
		var Descripcion = connection.escape(req.body.Descripcion);
		var Estado = connection.escape(req.body.estado);
		var Eliminado = connection.escape(req.body.eliminado);
		var data = {
			"Ofertas":""
		};
		var consulta = "INSERT INTO oferta_producto (";
		var i=0;
		if(FechaIni != 'NULL'){
			consulta  += "Fecha_inicio_oferta_producto";
			i++;
		}
		if(FechaFin != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Fecha_fin_oferta_producto";
			i++;
		}
		if(P_oferta != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "P_oferta_oferta_producto";
			i++;
		}
		if(Id_tienda != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Id_tienda_oferta_producto";
			i++;
		}
		if(Id_producto_tienda != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Id_producto_tienda_oferta_producto";
			i++;
		}
		if(Foto != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Foto_oferta_producto";
			i++;
		}
		if(Descripcion != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += "Descripcion_oferta_producto";
			i++;
		}
		consulta+=", Estado_oferta_producto , Eliminado_oferta_producto) VALUES (";
		var i=0;
		if(FechaIni != 'NULL'){
			if (i==1) {
				consulta  += " , ";
				i--;	
			}
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
				consulta  += ", ";
				i--;	
			}
			consulta  += Id_producto_tienda;
			i++;
		}
		if(Foto != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += Foto;
			i++;
		}
		if(Descripcion != 'NULL'){
			if (i==1) {
				consulta  += ", ";
				i--;	
			}
			consulta  += Descripcion;
			i++;
		}
		consulta+=",'1','0')";
		console.log(consulta);
        connection.query(consulta,function(err, rows, fields){
            if(err){
				console.log("Error en la query...");
				return res.status(400).json({ error: err });
			}else{
				console.log("Oferta insertada correctamente");
				data["Ofertas"] = "Oferta insertada correctamente";
				return res.status(200).json(data);  
			}
        });       
    connection.release();
	});
});

//Update de ofertas de usuario
router.put('/ofertasUsuario',comprobacionjwt,function(req,res){
	db.getConnection(function(err, connection) {
        if (err) throw err;
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
    connection.release();
	});
});

//GET DE OFERTAS DE PRODUCTO
router.get('/ofertasProducto',comprobacionjwt,function(req,res){
	db.getConnection(function(err, connection) {
        if (err) throw err;
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
        if(idProductoTienda=='NULL'  && idTienda=='NULL') //Te saca todas
            consulta="Select * from oferta_usuario";   

		connection.query(consulta,function(err, rows, fields){
			if(rows.length != 0){
				data["Ofertas"] = rows;
				res.status(200);
			}else{
				data["Ofertas"] = 'No hay ofertas';
			}
			res.json(data);
		});    
    connection.release();
	});
});

//POST DE OFERTA DE PRODUCTO
router.post('/ofertasProducto',comprobacionjwt,function(req,res){
	db.getConnection(function(err, connection) {
        if (err) throw err;
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
        connection.release();
	});
});

//PUT de OfERTAS DE PRODUCTO
router.put('/ofertasProducto',comprobacionjwt,function(req,res){
	db.getConnection(function(err, connection) {
        if (err) throw err;
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
    connection.release();
	});
});


module.exports = router;