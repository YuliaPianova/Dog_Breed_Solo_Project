const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


module.exports = {

    
    register: (req, res) =>{
        
        
        
        const user = new User(req.body)
        
        
        
        user.save()
        .then((newUser) => {
            console.log(newUser);
            console.log("Succefull registered!")
            res.json({
                successMessage: "Thank you for registering",
                user: newUser
            })
        })
        .catch((err) =>{
            console.log("register not successul!")
            res.status(400).json(err)
        })
    },

    login: (req,res) =>{
        User.findOne({email: req.body.email})
            .then((userRecord) =>{
                
                if(userRecord === null){
                    
                    res.status(400).json({message: "Invalid Login Attempt"})
                }
                else{ // email is found:

                    bcrypt.compare(req.body.password, userRecord.password)
                        .then((isPasswordValid) =>{
                            if(isPasswordValid){
                                console.log("password is valid");
                                res.cookie(
                                    "usertoken",
                                    jwt.sign(
                                        { //payload is the data we want to save/use
                                            id: userRecord._id,
                                            email: userRecord.email,
                                            username: userRecord.username
                                        },
                                        process.env.JWT_SECRET
                                    ),
                                    { // these cookies invisible to client-side JS
                                        httpOnly:true,
                                        expires: new Date(Date.now() + 9000000)
                                    }

                                ).json({
                                    message: "Sussec",
                                    userLoggedIn: userRecord.username,
                                    userId: userRecord._id
                                });
                            }
                            else{ // if password invalid
                                res.status(400).json({message: "Invalid Attempt"})
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                            res.status(400).json({ message: "Invalid Attempt" });
                        })
                }

            })
            .catch((err) => {
                console.log(err);
                res.status(400).json({ message: "Invalid Attempt" });

            })
    },
    
    
    
    
    
    
    logout: (req,res) => {
        console.log("logging out");
        res.clearCookie("usertoken");
        res.json({
            message: "You have successfully logged out!",
        });
    },

    
    getLoggedInUser:(req, res) => {
        
        //const decodedJWT = jwt.decode(req.cookies.usertoken,{
            //complete: true
        //})
        
        User.findOne({_id:req.jwtpayload.id}) // id from jwt.sign( line 48)
            .then((user) => {
                console.log(user);
                res.json(user)
            })
            .catch((err) => {
                console.log(err);
            })
    }


}