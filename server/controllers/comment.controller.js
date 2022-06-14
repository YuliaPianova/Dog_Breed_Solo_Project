const Comment = require("../models/comment.model.js");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");
const Breed = require("../models/breed.model.js");

module.exports = {

    
    


createNewComment: (req, res) => {
        const newCommentObject = new Comment(req.body);
        const decodedJWT = jwt.decode(req.cookies.usertoken, {
            complete: true
        })
        newCommentObject.breedsId = decodedJWT.payload.id;  /////////brredID
        //newCommentObject.breedsId = req.breed._id

        newCommentObject.save()
            .then((newComment) => {
                console.log(newComment);
                res.json(newComment)
            })
            .catch((err) => {
                console.log("Something went wrong with creating new Comment", err);
                res.status(400).json(err);
            });
    }, 

    findOneComment: (req, res) => {
        Comment.findOne({ _id: req.params.id })

            .then((OneComment) => {

                res.json(OneComment);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    findAllComments: (req, res) => {
        Comment.find()
            .populate("breedsId", "breed")  
            .then((allComments) => {
                console.log(allComments);
                res.json(allComments)
            })

            .catch((err) => {
                console.log(" Something wrong with findAllComments", err);
                res.json({ message: "Something wrong with findAllComments", error: err })

            })

    },

    ////////

    findAllCommentsByBreed: (req, res) => {
        if (req.jwtpayload.breed !== req.params.breed) {
            console.log("wrong breed");

            Breed.findOne({ breed: req.params.breed })
                .then((noCommentForBreed) => {
                    Comment.find({ breedsId: noCommentForBreed._id })
                        .populate("breedsId", "breed")
                        .then((allCommentsForBreed) => {
                            console.log(allCommentsForBreed);
                            res.json(allCommentsForBreed);
                        })
                })
                .catch((err) => {
                    console.log(err);
                    res.status(400).json(err);
                })

        }
        else {
            console.log("correct breed")
            //console.log("req.jwtpayload.id:", req.jwtpayload.id);//////
            
            //Comment.find({ breedsId: req.jwtpayload.id })
            Comment.find({ breedsId: req.breed._id })
            
                .populate("breedsId", "breed")
                .then((allCommentsForBreed) => {
                    console.log(allCommentsForBreed);
                    res.json(allCommentsForBreed);
                })
                .catch((err) => {
                    console.log(err);
                    res.status(400).json(err);
                })
        }

    },


    ///////









    findAllCommentsByUser: (req, res) => {
        if (req.jwtpayload.username !== req.params.username) {
            console.log("wrong user");

            User.findOne({ username: req.params.username })
                .then((userNotLoggedIn) => {
                    Comment.find({ createdBy: userNotLoggedIn._id })
                        .populate("createdBy", "username")
                        .then((allCommentsFromUser) => {
                            console.log(allCommentsFromUser);
                            res.json(allCommentsFromUser);
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
            Comment.find({ createdBy: req.jwtpayload.id })
                .populate("createdBy", "username")
                .then((allCommentsFromLoggedUser) => {
                    console.log(allCommentsFromLoggedUser);
                    res.json(allCommentsFromLoggedUser);
                })
                .catch((err) => {
                    console.log(err);
                    res.status(400).json(err);
                })
        }

    },

    deleteOneComment: (req, res) => {
        Comment.deleteOne({ _id: req.params.id })
            
            .then((deletedComment) => {res.json(deletedComment);
            })
            .catch((err) => {console.log(err);
                res.status(400).json(err);
    })
}, 

}
                    
                    
                    
    
    

