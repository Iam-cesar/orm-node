const Services = require('./Services')
const database = require('../models')

class MatriculasServices extends Services {
  constructor() {
    super('Matriculas')
    this.pessoas = new Services('Pessoas')
  }

  async encontraEContaTodas (turmaId) {
    return await database[this.nomeModelo].findAndCountAll({
      where: {
        turma_id: parseInt(turmaId),
        status: 'confirmado'
      },
      limit: 20,
      order: [['estudante_id', 'ASC']]
    })
  }

  async pegaUmaMatricula (estudanteId, matriculaId) {
    return await database[this.nomeModelo].findOne({
      where: {
        id: parseInt(matriculaId),
        estudante_id: parseInt(estudanteId)
      }
    })
  }

  async pegaMatriculaPorTurmas (turmaId) {
    return await database[this.nomeModelo].findAndCountAll({
      where: {
        turma_id: parseInt(turmaId),
        status: 'confirmado'
      },
      limit: 20,
      order: [['estudante_id', 'ASC']]
    })
  }

  async pegaTurmasLotada (lotacaoTurma) {
    return await database[this.nomeModelo].findAndCountAll({
      where: {
        status: 'confirmado'
      },
      attributes: ['turma_id'],
      group: ['turma_id'],
      having: sequelize.literal(`count(turma_id) >= ${parseInt(lotacaoTurma)}`)
    })
  }

  async restauraMatricula (estudanteId, matriculaId) {
    return await database[this.pessoas].restore({
      where: {
        id: parseInt(matriculaId),
        estudante_id: parseInt(estudanteId)
      }
    })
  }

  async atualizaMatricula (novasInformacoes, estudanteId, matriculaId) {
    await database[this.nomeModelo].update(novasInformacoes, {
      where: {
        id: parseInt(matriculaId),
        estudante_id: parseInt(estudanteId)
      }
    })

    const resposta = await database[this.nomeModelo].findOne({
      where: {
        id: parseInt(matriculaId),
        estudante_id: parseInt(estudanteId)
      }
    })

    return resposta
  }

  async deletaUmaMatricula (estudanteId, matriculaId) {
    return await database[this.pessoas].destroy({
      where: {
        id: parseInt(matriculaId),
        estudante_id: parseInt(estudanteId)
      }
    })
  }
}

module.exports = MatriculasServices
