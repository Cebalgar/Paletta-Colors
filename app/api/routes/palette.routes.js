//importo Router de express
const express = require("express");
const router = express.Router();

//importo las funciones del controlador
const {
    newPalette,
    getAllPalettes,
    getPalettesById,
    deletePaletteById,
    updatePaletteById,
 
} = require("../controllers/palette.controller");

//método y función del controlador con su ruta.
router.post("/create", newPalette);
router.get("/", getAllPalettes);
router.get("/:paletteId", getPalettesById);
router.delete("/:paletteId", deletePaletteById)
router.put("/:paletteId",updatePaletteById)



module.exports = router;

