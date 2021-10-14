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
        parseInt(estudanteID),
        { ativo: false },
        { transaction }
      )
      await this.matriculas.atualizaRegistros(
        { estudante_id: parseInt(estudanteID) },
        { status: 'cancelado' },
        { transaction }
      )
    })
  }

  async restauraPessoa (id) {
    return await database[this.nomeModelo].restore({
      where: {
        id: parseInt(id)
      }
    })
  }


  async pegaMatriculas (estudanteId) {
    const pessoa = await database[this.nomeModelo].findOne({
      where: {
        id: parseInt(estudanteId)
      }
    })
    const resposta = await pessoa.getAulasMatriculadas()

    return resposta
  }
}

module.exports = PessoasServices
