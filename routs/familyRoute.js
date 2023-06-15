const express = require( 'express' );
const router = express.Router();
const upload = require('../utils/multer')
const { createProfile, getProfiles, getProfile, updateProfile, deleteProfile} = require( '../controllers/familyCotroller' )

router.post( '/profiles', upload.fields( [ { name: "profileImage", maxCount: 1 } ] ), createProfile )
router.get( '/profiles', getProfiles );
router.get( '/profiles/:id', getProfile );
router.put( '/profiles/:id', upload.fields( [ { name: "profileImage", maxCount: 1 } ] ), updateProfile );
router.delete( '/profiles/:id', deleteProfile );


module.exports = router;