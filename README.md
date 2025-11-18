# PcGamers_Backend_EXM6B

Muy buenas maestro soy Tenorio Castillo Johnny Leonel de 6 "B" de TIC le quiero dar la bienvenida a mi repositorio indicandole mi proyecto de cotizacion de pc "PcGamer" acontinuacion le dare mas detallado todo lo realizado desde como se instala y como poder usar o probar el backend con el frontend.

# Nombre del proyecto.

Pc_Gamer

# Instrucciones para la instalación y ejecución del backend.

Este proyecto implementa una API completa desarrollada con Node.js, Express y MongoDB, diseñada para gestionar cotizaciones de computadoras personalizadas y un carrito de productos. El sistema permite realizar operaciones CRUD para cada módulo, garantizando validación de datos, manejo de errores y una estructura limpia, modular y escalable.

*__Instalación del Proyecto__*

Primero debemos clonar el repositorio dado cado desea clonarlo para obtener el zip desde la carpeta o caso contrario descargarlo manualmente de github en este caso se hace por clonacion 

*Clonar el repositorio en el terminal:*

git clone https://github.com/JohnnyTenorio/PcGamers_Backend_EXM6B.git

Despues debemos extraer el proyecto, etc. Y despues entrar a la carpeta del proyecto o usar por el terminal el cd para ingresar y debemos descargar la dependencia en ete caso ya el proyecto incluye pero si desea actualizar todo se usa con el comando:

*__Instalar dependencia__*

__1.__ npm install

En este caso al instalar la dependencia se actualiara todo lo que esta en el packend.json y despues debera instalar dado caso no tenga el nodemon se instala con este comando y tambien los otros comando que se uso dado caso falta alguno 

*__Comando utilizado__*

__1.__ npm install express mongoose cors dotenv

__2.__ npm install -D nodemon

__3.__ npm install colors 

*__Como inicializar la pagina con el backend__* 

Se debe colocar un comando al terminal o el powerShell para inicializar le saldra un puerto dado caso coloque el 9000 y para poder visualizar debe colocar en el navegador estos url y comando a continuacion:

*__Comando para inicializar el servidor con el frontend y backend__*

*__Inicializar el servidor__*

__1.__ nodemon .\index.js

Le saldra un mensaje que el servidor esta iniciado en el puerto 9000 este puerto es el que yo coloque en el server.js y confirmdo en el env.

*___Colocar en el navegador por ejemplo chrome o edge__*

__2___ http://localhost:9000/


Esto seria todo para instalar y poder inicializar el servior con la pagina web involucrando la api en resumen frontend y backend y usando el metodo CRUD


# Descripción de las rutas de la API.

Para poder usar la ruta y ver la validacion de que se esta guardando, modificando y eliminando correctamente los datos fue establecido como /api/ la ruta principal y en vase a esa se unio lo que es los otros apartado en este caso creé dos el de /carrito/ y /cotizacion/ como se podra usar acontinuacion les colocare las rutas para poder ver los datos 

*__Para poder ver el manejo del index.html desde ese punto guarda la informacion y envia a carrito usando el metodo de guardar y en la ruta carrito aparece los datos que se guardo desde ahi__*

__1.__ http://localhost:9000/api/carrito

*__Aqui podra obtener los datos desde la pagina cotizacion.html desde el boton cotiza YA! desde ahi se envia al carrito aparece la informacion  aplicara los dos crud restante el de modificar y el de eliminar y eso funciona con normalidad en las dos rutas__*

__2.__ http://localhost:9000/api/cotizacion



