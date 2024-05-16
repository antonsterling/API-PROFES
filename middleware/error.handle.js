const { func } = require("joi");

function logErrors (err, req, res, next){
  console.error(err);
  next(err);
}

function errorHandler(err, req, res, next){
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  })
}

function boomErrorHandler(err, req, res, next){
  console.log("Prueba")
  if (err.isBoom){
    const { output } = err;
    console.log("Prueba1")
    res.status(output.statusCode).json(output.payload)
    console.log("Prueba2")
  }else{
    next(err);
  }
}


module.exports = { logErrors, errorHandler, boomErrorHandler }
