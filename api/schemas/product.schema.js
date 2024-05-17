const Joi = require('joi');

const id = Joi.number().integer().positive()
const nombre = Joi.string().min(3).max(30)
const salario = Joi.number().integer().positive()
const materias = Joi.array()

const createProfeSchema = Joi.object({
  nombre: nombre.required(),
  materias: materias.required(),
  salario: salario.required(),
})

const updateProfeSchema = Joi.object({
  nombre: nombre,
  materias: materias,
  salario: salario
})

const getProfeSchema = Joi.object({
  id: id.required()
})

module.exports = { createProfeSchema, updateProfeSchema, getProfeSchema }
