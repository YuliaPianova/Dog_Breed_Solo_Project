
const mongoose = require("mongoose"); 

const CommentSchema = new mongoose.Schema({

    text:{
        type: String,
        required: [true, "Text of comment is required"],
        minlength: [3, "Comment must be at least 3 characters long"]
        
    },

    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    breedsId: { //////////
        type: mongoose.Schema.Types.ObjectId,
        ref: "Breed",
    } ///////////////////

},

    {timestamps: true})



const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;