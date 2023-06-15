const mongoose = require( 'mongoose' );

const familySchema = new mongoose.Schema( {
    fatherName: {
        type: String,
        require: true
    },
    motherName: {
        type: String,
        required: true
    },
    childrensName:{
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        required: true
    }
}, { timestamps: true } );

const familyModel = mongoose.model( "familyprofile", familySchema );

module.exports = familyModel;