/* Creando un servidor con express */
const express = require("express"); //Importamos o requerimos express

const app = express(); // Creamos una aplicacion de express
const port = 3000; //Puerto donde queremos que corra

// De esta forma creamos rutas, para poder verla en el navegador
// req -> request
// res -> response
app.get('/', (req, res) => {
  res.send("Hola mi server en express");
})

app.get('/nueva-ruta', (req, res) => {
  res.send("Hola soy una nueva ruta");
})

app.get('/products', (req, res) => {
  res.json({
    nombre: "producto 1",
    precio: 20000
  });
})

// Aqui hacemos que la aplicacion escuche en un puerto especifico
app.listen(port, () => {
  console.log(`Puerto: http://localhost:${port}`);
})


