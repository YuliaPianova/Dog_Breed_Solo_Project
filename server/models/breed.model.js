
const mongoose = require("mongoose"); 

const BreedSchema = new mongoose.Schema({

    breed:{
        type: String,
        required: [true, "Breed is required"],
        minlength: [3, "Breed must be at least 3 characters long"]
        
    },

    characteristics:{
        type: String,
        required: [true, "Characteristics are required" ],
        minlength: [3, "Characteristics must be at least 3 characters long"]

        
    },

    picture: { 
        type: String

    },

    easyTrain:{
        type: Boolean
    },

    dogFriendly:{
        type: Boolean
    },

    kidFriendly:{
        type: Boolean
    },

    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    

},

    {timestamps: true})



const Breed = mongoose.model("Breed", BreedSchema);

module.exports = Breed;