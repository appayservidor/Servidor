# Appay Servidor

Github del servidor de appay.
### Clonar proyecto
Yo uso sourcetree: https://www.sourcetreeapp.com/
Cuando lo tengais instalado arriba a la izquierda le dais a clone.
- En sourcepath/url poneis: https://github.com/appayservidor/Servidor.git
- En destination path poneis la ruta donde querais tener el proyecto
- Ya deberiais tenerlo clonado
### Usar en local 
  - Creo que hay que hacer un:
 ```sh
$ npm install
```
- Para el npm install hay que tener instalado nodejs con npm: https://nodejs.org/es/
- Ahora ejecutamos
 ```sh
$ npm start
```
Se ejecutará en localhost:5000
Está instalado el plugin 'nodemon' así que cuando hagais algún cambio se reiniciará solo y si actualizais la pagina se aplicarán los cambios automáticamente

### Usar github
Lo primero es comprobar que esté actualizado
- Hacemos un fetch
Luego subimos nuestros cambios
-Hacemos un commit
-Seleccionamos los archivos que queremos subir y seleccionamos la casilla de push automaticamente a origin/master y ponemos un comentario con el cambio que hemos hecho
