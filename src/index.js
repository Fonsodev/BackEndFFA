const express = require( 'express' );
const cors = require('cors');
const app = express();
const PORT = process.env.PORT;


const dbConection = require( './config/mongo.config' );
const { createDefaultUsers } = require('./config/register-default');

/** Establecer la conexion a MongoDB usando la configuracion */
dbConection();
createDefaultUsers();

/** MIDDLEWARE: */
app.use( cors() );                      // middleware: permite compartir rescursos a terceros
app.use( express.json() );

/** EndPoints de nuestro servidor */
app.use( '/api/products', require( './routes/product.routes' ) );   // Middleware: Activa solicitudes que comienzan con el prefijo /api/products
app.use( '/api/auth', require( './routes/auth.routes' ) );          // Middleware: Activa solicitudes que comienzan con el prefijo /api/auth
app.use( '/api/routines', require ('./routes/routine.routes') );
app.use( '/api/supplements', require( './routes/supplement.routes' ) );  

app.use('/api/user', require('./routes/user.routes'));
app.use("/api/userinfo", require('./routes/userinfo.routes'));         // Middleware: Activa solicitudes que comienzan con el prefijo /api/auth

app.use( '/api/recipes', require( './routes/Recipe.routes' ) );          // Middleware: Activa solicitudes que comienzan con el prefijo /api/auth

app.use( '/api/categories', require( './routes/categories.routes' ) );  

/** Lanzamos el servidor en puerto indicado 
 * http://localhost:3000
*/
app.listen( PORT, function() {
    console.log( 'Servidor corriendo en puerto' + PORT );
});