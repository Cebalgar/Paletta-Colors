
//importo módulo mongoose
const mongoose = require ("mongoose");
//defino los esquemas de información de mongoose
const Schema = mongoose.Schema;

//esquema con sus datos

const ColorSchema = new Schema(
    {
        hex:{ type: String, require: true},
        name: { type: String, require: true},
        rgb:{ type: String, require: true}
    },
    {timestamps: true} // para ver cuando se crea el objeto
);
//exporto el modelo para usarlo en otros ficheros (con su referencia para poder relacionarlo en la coleccion de Palette.)
const Color = mongoose.model("colors", ColorSchema);
module.exports = Color;

