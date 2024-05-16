const express = require("express")
const profesRouter = require("./profes.routes")
//const estudiantesRouter = require("./estudiantes.routes")

function routerApi(app){
  const router = express.Router()
  app.use("/v1", router)
  router.use('/profes', profesRouter)
  //router.use('/estudiantes', estudiantesRouter)
}

module.exports = routerApi;
