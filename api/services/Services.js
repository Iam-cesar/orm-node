const database = require('../models')

class Services {
  constructor(nomeModelo) {
    this.nomeModelo = nomeModelo
  }

  async pegaTodosOsRegistros (where = {}) {
    return await database[this.nomeModelo]
      .findAll({
        where: {
          ...where
        }
      })
  }

  async pegaUmRegistro (id) {
    return await database[this.nomeModelo]
      .findOne({
        where: {
          id: parseInt(id)
        }
      })
  }

  async criaRegistro (novoRegistro) {
    return await database[this.nomeModelo].create(novoRegistro)
  }

  async atualizaRegistro (id, dados, transacao = {}) {
    return await database[this.nomeModelo]
      .update(dados, { where: { id: parseInt(id) } }, transacao)
  }

  async atualizaRegistros (where, dados, transacao = {}) {
    return await database[this.nomeModelo]
      .update(dados, { where: { ...where } }, transacao)
  }

  async apagaRegistro (id) {
    return await database[this.nomeModelo].destroy({
      where: {
        id: parseInt(id)
      }
    })
  }
}

module.exports = Services
