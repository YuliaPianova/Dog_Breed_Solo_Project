const CommentController = require("../controllers/comment.controller");
const {authenticate} = require("../config/jwt.config")


module.exports = (app) => {

    app.get("/api/comments", CommentController.findAllComments);
    app.post("/api/comments", CommentController.createNewComment); 
    app.get("/api/comments/:id", CommentController.findOneComment);
    app.get("/api/commentsbybreed/:breed", authenticate, CommentController.findAllCommentsByBreed);
    app.get("/api/commentsbyuser/:username", authenticate, CommentController.findAllCommentsByUser);
    app.delete("/api/comments/:id", CommentController.deleteOneComment);


}