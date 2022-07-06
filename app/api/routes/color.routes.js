const express = require("express"); // importo la libreria express
const router = express.Router(); // me traigo el Router de express para manejar las rutas y lo guardo en la variable router.


const {
    getAllColors, 
    getColorById,
    createColor,
    updateColorById,
    deleteColor
} = require("../controllers/color.controller"); // importo las funciones del controlador.

//método y función del controlador con su ruta.
router.get("/", getAllColors);
router.get("/:colorId", getColorById);
router.post("/create", createColor);
router.put("/:colorId", updateColorById)
router.delete("/:colorId", deleteColor)

module.exports = router;