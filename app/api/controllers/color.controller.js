
const Color = require ("../models/Color");
const HTTPSTATUSCODE = require("../../utils/httpStatusCode")


//Metodos para retornar los colores registrados en BD.

const getAllColors = async(req, res, next) =>{
    try{
        const colors = await Color.find();
        return res.json({
            status: 200,
            message: HTTPSTATUSCODE[200],
            data: {colors: colors}
        });
    }catch(err){
    return next(err);
    }
};

//Metodo para la busqueda de colores por ID

const getColorById = async(req, res, next) => {
    try{
        const {colorId} = req.params; //destructuring de la petición de los params.
        const colorById = await Color.findById(colorId);
        return res.json({
            status: 200,
            message: HTTPSTATUSCODE[200],
            data: { colors: colorById }
          });

    }catch(err){
        return next(err);
    }
};
//Metodo para crear colores

const createColor = async(req, res, next) => {
    try {
        const newColor = new Color();
        newColor.name = req.body.name;
        newColor.hex = req.body.hex;
        newColor.rgb = req.body.rgb;

        const colorDB = await newColor.save();
        return res.json({
            status: 201,
            menssage: HTTPSTATUSCODE[201],
            data: {colors: colorDB}
        })
    } catch (error) {
        return next(error);  
    }
};
//Método para actualizar colores

const updateColorById = async (req, res, next) => {
    try {
        const { colorId } = req.params;
        const colorToUpdate = new Color();
        if (req.body.name) colorToUpdate.name = req.body.name;
        if (req.body.hex) colorToUpdate.hex = req.body.hex;
        if (req.body.rgb) colorToUpdate.rgb = req.body.rgb;
       
        colorToUpdate._id = colorId;
        const colorUpdated = await Color.findByIdAndUpdate(colorId, colorToUpdate);
        return res.json({
          status: 200,
          message: HTTPSTATUSCODE[200],
          data: { colors: colorUpdated }
        });
  
    } catch (err) {
      return next(err);
    }
  }

//Metodo para borrar colores

const deleteColor = async(req, res, next) => {
    try {
        const {colorId} = req.params; 
        const colorDeleted = await Color.findByIdAndDelete(colorId);
        if (!colorDeleted){
            return res.json({
                status: 200,
                message: "There is not a color with that Id",
                data:null
            });
        }else{
            return res.json({
                status: 200,
                menssage: HTTPSTATUSCODE[201],
                data: {colors: colorDeleted}
            });
        }

         
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    getAllColors,
    getColorById,
    createColor,
    updateColorById,
    deleteColor
}
    
    
