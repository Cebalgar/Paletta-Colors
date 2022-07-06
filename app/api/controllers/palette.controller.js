const Pallete = require("../models/Palette");// cargo el modelo creado
const HTTPSTATUSCODE = require("../../utils/httpStatusCode");

//Crear una nueva paleta

const newPalette = async (req, res, next) => {
    try {
     
      const newPalette = new Palette();
      newPalette.name = req.body.name;
      newPalette.description = req.body.description;
      newPalette.colors = req.body.colors;
    
      const paletteDb = await newPalette.save()
      return res.json({
        status: 201,
        message: HTTPSTATUSCODE[201],
        data: { palettes: paletteDb }
      });
    } catch (err) {
      return next(err);
    }
};

  // Método para retornar todas las paletas de la BD.
  const getAllPalettes = async (req, res, next) => {
    try {
      
        const palettes = await Palette.find().populate("colors");
        return res.json({
          status: 200,
          message: HTTPSTATUSCODE[200],
          data: { palettes: palettes },
        });
      
    } catch (err) {
      return next(err);
    }
  };

//Método para la busqueda de paletas por ID
const getPalettesById = async (req, res, next) => {
    try {
      const { paletteId } = req.params;
      const paletteDb = await Palette.findById(paletteId).populate("colors");
      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        data: { palettes: paletteDb },
      });
    } catch (err) {
      return next(err);
    }
  };

  //Método para borrar una paleta

  const deletePaletteById = async (req, res, next) => {
    try {
        const { paletteId } = req.params;
        const paletteDeleted = await Palette.findByIdAndDelete(paletteId);
        if (!paletteDeleted) {
          return res.json({
            status: 200,
            message: "There is not a palette with that Id",
            data: null
          })
        } else {
          return res.json({
            status: 200,
            message: HTTPSTATUSCODE[200],
            data: { palettes: paletteDeleted },
          });
        }
    
    } catch (err) {
      return next(err);
    }
  };

  //Método para actualizar paletas
  const updatePaletteById = async (req, res, next) => {
    try {
        const { paletteId } = req.params;
        const paletteToUpdate = new Palette();
        if (req.body.name) paletteToUpdate.name = req.body.name;
        if (req.body.description) paletteToUpdate.description = req.body.description;
        if (req.body.colors) paletteToUpdate.colors = req.body.colors;
        paletteToUpdate._id = paletteId;
  
        const paletteUpdated = await Palette.findByIdAndUpdate(paletteId, paletteToUpdate);
        return res.json({
          status: 200,
          message: HTTPSTATUSCODE[200],
          data: { palettes: paletteUpdated }
        });
  
    } catch (err) {
      return next(err);
    }
  }
  
//Exporto la funciones
module.exports = {
    newPalette,
    getAllPalettes,
    getPalettesById,
    deletePaletteById,
    updatePaletteById,
  }
  