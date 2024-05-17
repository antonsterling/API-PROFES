const express = require("express");
const ProfesServices = require("./services/profes.services");
const {createProfeSchema, updateProfeSchema, getProfeSchema} = require('./../schemas/product.schema')
const validatorHandler = require('./../middleware/validator.handle')


const router = express.Router()
const service = new ProfesServices() /* Creamos una instancia del servicio para manejar la logica */


/* Los Query Params nos sirve para hacer filtros, esto se debe hacer antes de la solicitud sin query params */
/* Obtiene la lista de todos los profesores */
router.get('/', async (req, res, next) => {
    const profes = await service.buscar()
    if (profes){
      res.status(200).json(profes)
    } else {
      res.status(400).json({mesage: "No se encontraron profesores."})
    }
})


/* Obtiene los datos un profesor */
router.get('/:id',
  validatorHandler(getProfeSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const profesor = await service.buscarUno(id)
      res.status(200).json(profesor);
    } catch (error){
      next(error)
    }
  }
)

/* Obtiene las materias dadas por un profesor */
router.get('/:id/curso',
  validatorHandler(getProfeSchema, 'params'),
  async(req, res, next) => {
    try{
      const { id } = req.params;
      const materias = await service.buscarCursosProfe(id)
      res.status(200).json(materias);
    } catch (error){
      next(error)
    }
  }
)

/* Obtiene una materia especifica dada por un profesor */
router.get('/:id/curso/:asignatura', async(req, res, next) => {
  try{
    const { id , asignatura } = req.params;
    const materia = await service.buscarCursoEspecificoProfe(id, asignatura)
    res.status(200).json({'materia': materia});
  } catch (error){
    next(error)
  }
})

/* Obtiene el salario de un profesor */
router.get('/:id/salario',
  validatorHandler(getProfeSchema, 'params'),
  async(req, res, next) => {
    try{
      const { id } = req.params;
      const salario = await service.buscarSalarioProfe(id)
      res.status(200).json({'salario': salario});
    }  catch (error){
      next(error)
    }
  }
)


/* ------------------ METODO POST ----------------- */

/* Creando un profesor */
router.post('/',
  validatorHandler(createProfeSchema, 'body'),
  async(req, res) => {
    const body = req.body; /* De esta forma obtenemos la infomarcion pasada por el usuario o cliente. */
    const nuevoProfesor = await service.crear(body)
    res.status(201).json({
        message: 'Creado',
        data: nuevoProfesor
    })
  }
)

/* ----------- METODO PACTH ------------- */

/* Actualizando un profesor */
router.patch('/:id',
  validatorHandler(getProfeSchema, 'params'),
  validatorHandler(updateProfeSchema, 'body'),
  async(req, res, next) => {
    try{
      const { id } = req.params;
      const body = req.body;
      const profeActualizado = await service.actualizar(id, body)
      res.json({
        message: 'Actualizado',
        data: profeActualizado,
      })
    }catch(error){
      next(error)
    }
})


/* ------------------ METODO DELETE ----------------- */
/* Actualizando un profesor */
router.delete('/:id',
  validatorHandler(getProfeSchema, 'params'),
  async(req, res, next) => {
    try{
      const { id } = req.params;
      const profeEliminado = await service.eliminar(id)
      res.json({
          message: 'Eliminado',
          profeEliminado,
        })
    }  catch (error){
      next(error)
    }
})


module.exports = router;
