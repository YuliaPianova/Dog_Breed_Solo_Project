const BreedController = require("../controllers/breed.controller");
const {authenticate} = require("../config/jwt.config")


module.exports = (app) => {

    app.get("/api/breeds", BreedController.findAllBreeds);
    app.post("/api/breeds", BreedController.createNewBreed);
    app.get("/api/breeds/:id", BreedController.findOneBreed);
    app.get("/api/breedsbyuser/:username", authenticate, BreedController.findAllBreedsByUser);
    app.delete("/api/breeds/:id", BreedController.deleteOneBreed);
    app.put("/api/breeds/:id", BreedController.updateBreed);
}