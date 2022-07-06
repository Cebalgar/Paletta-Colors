const dotenv = require('dotenv'); // acceder a variables de entorno(que esta en .env)
dotenv.config();

const mongoose = require("mongoose"); // requiero mongoose para comunicar on la BD.

const mongoDb = process.env.MONGO_DB; //recupero en esta variable, mi variable de entorno MONGO_DB.

//conecto la base de datos con el servidor
const connect= async() => {
    try{
        const db = await mongoose.connect(mongoDb, { // me conecto a través de mongoose con la base de datos que tengo en .env y le defino los métodos de parseo y topología.
            useNewUrlParser: true, 
            useUnifiedTopology:true, 
        });

        const {name, host} = db.connection; // saco a la conexion con mi bd el nombre y el host
        console.log(`Connected with db: ${name}, in host: ${host}`)

        }catch(error){
        console.log("Error to connect with BD", error);
    }
};

//exporto la funcion connect para poder ejecutarla en el index.js
module.exports = {connect};


