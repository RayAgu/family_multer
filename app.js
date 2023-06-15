require('./config/curveDB')
const express = require( 'express' );
const familyRouter = require( './routs/familyRoute' );

const app = express();
app.use( express.json() );
app.use( '/uploads', express.static( "uploads" ) );

app.use( '/api', familyRouter );

module.exports = app;