const familyModel = require( '../models/familyModel' );
const fs = require('fs');


// create profile
const createProfile = async ( req, res ) => {
    const { fatherName, motherName, childrensName } = req.body;
    const profile = new familyModel( {
            fatherName,
            motherName,
            childrensName,
            profileImage: req.files["profileImage"][0].filename,
        })
    try {
        const savedProfile = await profile.save();
        if ( !savedProfile ) {
            res.status( 400 ).json( {
                message: "Profile not saved."
            })
        } else {
            res.status( 201 ).json( {
                message: "Profile created successfully",
                data: savedProfile
            })
        }
    } catch ( e ) {
        res.status( 500 ).json( {
            message: e.message
        })
    }
}

// get all profiles
const getProfiles = async ( req, res ) => {
    try {
        const profiles = await familyModel.find();
        if ( profiles.length === 0 ) {
            res.status( 404 ).json( {
                message: "No profile found."
            })
        } else {
            res.status( 200 ).json( {
                message: "Profiles",
                data: profiles,
                totalProfile: profiles.length
            })
        }
    } catch ( e ) {
        res.status( 500 ).json( {
            message: e.message
        })
    }
}
// get a profile
const getProfile = async ( req, res ) => {
    const profileId = req.params.id;
    const profile = await familyModel.findById( profileId );
    try {
        if ( !profile) {
            res.status( 404 ).json( {
                message: "No profile found."
            })
        } else {
            res.status( 200 ).json( {
                data: profile,
            })
        }
    } catch ( e ) {
        res.status( 500 ).json( {
            message: e.message
        })
    }
}

// updating profile
const updateProfile = async ( req, res ) => {
    const profileId = req.params.id;
    const profile = await familyModel.findById( profileId );
    try {
        const { fatherName, motherName, childrensName } = req.body;
        const bodyData = {
            fatherName: fatherName || profile.fatherName,
            motherName: motherName || profile.motherNamne,
            childrensName: childrensName || profile.childrensName,
            profileImage: profile.profileImage
        }

        if ( req.files && req.files[ "profileImage" ] ) {
            const oldProfileImagePath = `uploads/${ profile.profileImage }`
            if ( fs.existsSync( oldProfileImagePath ) ) {
                fs.unlinkSync(oldProfileImagePath)
            }
            bodyData.profileImage = req.files.profileImage[ 0 ].filename;
        }
        const newProfileImage = await familyModel.findByIdAndUpdate( profileId, bodyData, { new: true } )
            if ( newProfileImage ) {
                res.status( 200 ).json( {
                    message: "Updated successfully.",
                    data: newProfileImage
                })
            } else {
                res.status( 404 ).json( {
                    message: "Not found"
                })
            }
    } catch ( e ) {
        res.status( 500 ).json( {
            message: e.message
        })
    }
}

// delete a profile
const deleteProfile = async ( req, res ) => {
    const profileId = req.params.id;
    const profile = await familytModel.findById( profileId );
    try {
            const oldProfileImagePath = `uploads/${ profile.profileImage }`
            if ( fs.existsSync( oldProfileImagePath ) ) {
                fs.unlinkSync( oldProfileImagePath )
            }
        const deletedProfile = await familyModel.findByIdAndDelete( profileId );
        if ( deletedProfile ) {
            res.status( 200 ).json( {
                message: "Deleted successfully"
            })
        } else {
            res.status( 404 ).json( {
                message: "Your problem is bigger than our own"
            })
        }
    } catch ( e ) {
        res.status( 500 ).json( {
            message: e.message
        })
    }
}


module.exports = {
    createProfile,
    getProfiles,
    getProfile,
    updateProfile,
    deleteProfile,
}