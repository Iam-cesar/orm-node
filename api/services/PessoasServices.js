const Services = require('./Services')
const database = require('../models')

class PessoasServices extends Services {
  constructor() {
    super('Pessoas')
    this.matriculas = new Services('Matriculas')
  }

  async pegaRegistrosAtivos (where = {}) {
    return database[this.nomeModelo]
      .findAll({
        where: {
          ...where
        },
      })
  }

  async pegaTodosOsRegistros ({ where = {}, scope }) {
    return database[this.nomeModelo]
      .scope(scope)
      .findAll({
        where: { ...where },
      })
  }

  async cancelaPessoasEMatriculas (estudanteID) {
    return database.sequelize.transaction(async transaction => {
      await super.atualizaRegistro(
        estudanteID,
        { ativo: false },
        { transaction }
      )
      await this.matriculas.atualizaRegistros(
        { estudante_id: estudanteID },
        { status: 'cancelado' },
        { transaction }
      )
    })
  }
}

module.exports = PessoasServices
