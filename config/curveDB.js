require( 'dotenv' ).config();
const mongoose = require( 'mongoose' );

const username = process.env.ATLAS_USERNAME
const password = process.env.ATLAS_PASSWORD
const url2 = `mongodb+srv://${username}:${password}@cluster0.4kblwtn.mongodb.net/`

mongoose.connect( url2 ).then( () => {
    console.log('Database is successfully connected.')
} ).catch( (e) => {
    console.log(e.message)
});