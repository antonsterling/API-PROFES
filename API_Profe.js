/* Creando un servidor con express */
const express = require("express"); //Importamos o requerimos express
const routerAPI = require("./routes")
const { logErrors, errorHandler, boomErrorHandler } = require("./middleware/error.handle")
const cors = require("cors")

const app = express(); // Creamos una aplicacion de express
const port = 3000; //Puerto donde queremos que corra

app.use(express.json()) // Es un middleware que nos permitira obtener los datos mandados por post en el body
const origenesPermitidos = ['http://localhost:8080', 'http://localhost:5500', 'http://127.0.0.1:5500']

const opciones = {
  origin: (origin, callback) => {
    if (origenesPermitidos.includes(origin)){
      callback(null, true)
    }else{
      callback(new Error("No perimitido"))
    }
  }
}
app.use(cors(opciones))
// app.use(cors()) //De esta manera habilitamos a cualquier dominio para acceder a nuestra informacion, esto se hace con APIS Publicas


routerAPI(app)

// De esta forma creamos rutas, para poder verla en el navegador
app.get('/', (req, res) => {
  res.send("Hola mi server en express");
})

//Son los middlewares que creamos
app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)


// Aqui hacemos que la aplicacion escuche en un puerto especifico
app.listen(port, () => {
  console.log(`Puerto: http://localhost:${port}`);
})


