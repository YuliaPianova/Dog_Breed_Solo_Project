const Breed = require("../models/breed.model.js");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");

module.exports = {

    createNewBreed: (req, res) => {
        const newBreedObject = new Breed(req.body);
        const decodedJWT = jwt.decode(req.cookies.usertoken, {
            complete: true
        })
        newBreedObject.createdBy = decodedJWT.payload.id;

        newBreedObject.save()
            .then((newBreed) => {
                console.log(newBreed);
                res.json(newBreed)
            })
            .catch((err) => {
                console.log("Something went wrong with creating new breed", err);
                res.status(400).json(err);
            });
    },

    findAllBreeds: (req, res) => {
        Breed.find()
            .populate("createdBy", "username email")  // to know who created the breed by email and username
            .then((allBreeds) => {
                console.log(allBreeds);
                res.json(allBreeds)
            })

            .catch((err) => {
                console.log(" Something wrong with findAllBreed", err);
                res.json({ message: "Something wrong with findAllBreed", error: err })

            })

    },

    findOneBreed: (req, res) => {
        Breed.findOne({ _id: req.params.id })

            .then((OneBreed) => {

                res.json(OneBreed);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    updateBreed: (req, res) => {
        Breed.findByIdAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
            runValidators: true
        })
            
            .then((updatedBreed) => {
                console.log(updatedBreed)
                res.json(updatedBreed);
            })
            .catch((err) => {
                console.log("Something wrong with updating breed", err);
                res.status(400).json(err);
            })
    },

    findAllBreedsByUser: (req, res) => {
        if (req.jwtpayload.username !== req.params.username) {
            console.log("wrong user");

            User.findOne({ username: req.params.username })
                .then((userNotLoggedIn) => {
                    Breed.find({ createdBy: userNotLoggedIn._id })
                        .populate("createdBy", "username")
                        .then((allBreedsFromUser) => {
                            console.log(allBreedsFromUser);
                            res.json(allBreedsFromUser);
                        })
                })
                .catch((err) => {
                    console.log(err);
                    res.status(400).json(err);
                })

        }
        else {
            console.log("current user")
            console.log("req.jwtpayload.id:", req.jwtpayload.id);
            Breed.find({ createdBy: req.jwtpayload.id })
                .populate("createdBy", "username")
                .then((allBreedsFromLoggedUser) => {
                    console.log(allBreedsFromLoggedUser);
                    res.json(allBreedsFromLoggedUser);
                })
                .catch((err) => {
                    console.log(err);
                    res.status(400).json(err);
                })
        }

    },

    deleteOneBreed: (req, res) => {
        Breed.deleteOne({ _id: req.params.id })
            
            .then((deletedBreed) => {res.json(deletedBreed);
            })
            .catch((err) => {console.log(err);
                res.status(400).json(err);
    })
}, 

    /*
    deleteOneBreed: (req, res) => {
        
            Breed.deleteOne({ _id: req.params.id })
            .populate("createdBy", "username")  ///////////////////////
                
                .then((deletedBreed) => {

                    if(req.jwtpayload.username !== req.params.username) {
                        console.log("wrong user");

                    }
                    else{
                        console.log("current user")
                        
                        res.json(deletedBreed)

                    }}
                )
                    .catch((err) => {console.log(err);
                        res.status(400).json(err);
                    }
                    )

}

*/ 
}
                    
                    
                    
    
    

