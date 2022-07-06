
const express = require("express"); // requerimos express para poder utilizarlo
const logger = require("morgan");// importo la dependencia morgan
const{connect} = require("./app/config/database");//me traigo la función de database.js

//importo rutas
const colors = require("./app/api/routes/color.routes");
const palettes = require("./app/api/routes/palette.routes");

const HTTPSTATUSCODE = require("./app/utils/httpStatusCode");


connect(); // ejecuto la conexión

const app = express(); // arrancamos expres a través de la constante app

// Configuro las cabeceras(headers) de nuestras respuestas(res).
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

//Configuro CORS, para dar permiso a las direcciones que pueden  utilizar mi API.
const cors = require("cors");

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:4200'],//direcciones que puede usar la API.
  credentials: true,
}));

//Configuro express para poder enviar y recibir la inforación en el body de las peticiones en formato JSON.
app.use(express.json()); //transforma la información de express a formato JSON.
app.use(express.urlencoded({ extended: true }));//permite la codificación de la url.

// (una vez importado morgan) a través de la const logger pido que haga un log con las peticiones.
app.use(logger("dev")); 

// routas que voy a usar.
 app.use("/colors", colors);
 app.use("/palettes", palettes)

//controlo los errores si la ruta no coincide con las definidas.
app.use((req, res, next) => {
    let err = new Error();
    err.status = 404;
    err.message = HTTPSTATUSCODE[404];
    next(err);
  });

// función que se encarga de recibir el error anterior y devolverlo en JSON (handle errors).
app.use((err,req, res, next)=>{
    return res.status(err.status || 500).json(err.message || "Unexpected error");
  })

app.disable('x-powered-by'); // oculto que la API esta montada con node por seguridad.

// puerto donde vamos a escuchar el servidor
app.listen(3000, ()=>{
    console.log("Server listening on port 3000")
});
