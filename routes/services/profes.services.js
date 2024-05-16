const boom = require("@hapi/boom")


class ProfesServices {

  constructor(){
    this.profes = [];
    this.generar()
  }

  generar(){

    let profesores = [
      { id: 1, nombre: 'Juan Diego', materias: ['Backend con Node'], salario: '15.000' },
      { id: 2, nombre: 'Milerick Henao', materias: ['Frontend con Angular'], salario: '15.000' },
      { id: 3, nombre: 'Antonio Sterling', materias: [{'id': 1,'nombre':'Diseño'},{'id': 2,'nombre':'Programación'},{'id': 3,'nombre':'Frontend'}, {'id': 4,'nombre':'Backend'}], salario: '30.000' }
    ];
    this.profes = profesores;
  }

  async crear(data){
    const nuevoProfesor = {
      id: Math.floor(Math.random() * 1000) + 1,
      ...data
    }
    this.profes.push(nuevoProfesor)
    return nuevoProfesor
  }

  async buscar(){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.profes)
      },2000)
    })
  }

  async buscarUno(id){
    const profe = this.profes.find(profe => profe.id == id)
    if (!profe) {
      throw boom.notFound("Profesor no encontrado")
    }
    return profe
  }

  async buscarCursosProfe(id){
    const profe = this.profes.find(profe => profe.id == id)
    if (!profe){
      throw boom.notFound("Profe no encontrado");
    }
    const materias = profe.materias
    if (!materias){
      throw boom.notFound("Materias no encontradas");
    }
    return materias
  }

  async buscarCursoEspecificoProfe(id, asignatura){
    const profe = this.profes.find(profe => profe.id == id)
    if (!profe){
      throw boom.notFound("Profe no encontrado");
    }
    const materia = profe.materias.find(materia => (materia.nombre == asignatura || materia.id == asignatura))
    if (!materia){
      throw boom.notFound("Materia no encontrada");
    }
    return materia
  }

  async buscarSalarioProfe(id){
    const profe = this.profes.find(profe => profe.id == id)
    if (!profe){
      throw boom.notFound("Profe no encontrado");
    }
    const salario = profe.salario
    if (!salario){
      throw boom.notFound("Salario no encontrado");
    }
    return salario
  }

  async actualizar(id, cambios){
    const indice = this.profes.findIndex(profe => profe.id == id)
    if (indice === -1){
      throw boom.notFound("Profesor no encontrado");
    }
    const profe = this.profes[indice]
    this.profes[indice] = {
      ...profe,
      ...cambios
    }
    return this.profes[indice]
  }

  async eliminar(id){
    const indice = this.profes.findIndex(profe => profe.id == id)
    if (indice === -1){
      throw boom.notFound("Profesor no encontrado")
    }
    this.profes.splice(indice, 1);
    return {id}
  }

}

module.exports = ProfesServices
