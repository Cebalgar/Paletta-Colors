
//importo mongoose que tiene esquemas de información.
const mongoose = require("mongoose");
// Defino los esquemas de mongoose.
const Schema = mongoose.Schema;

// Creamos el objeto del esquema 
const PaletteSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
		//relacionamos la propiedad colors con la colección colors
    colors: [{ type: Schema.Types.ObjectId, ref: "colors", required: true }],

  },
  { timestamps: true }
);
//exporto modelo
const Palette = mongoose.model("palettes", PaletteSchema);
module.exports = Palette;
""