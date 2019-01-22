const http = require( 'http' );
const express = require( 'express' );
const interfaceRouter = require( './interface/interfaceRouter' );

const app = express();


// Use default view engine
app.set( 'view-engine', 'pug' );


// Router
app.use( '/', interfaceRouter );


// Start Server
const server = http.createServer( app );

// Listening on port 3000 for now
// Should run on either 80, or use a reverse proxy
server.listen( 3000 );