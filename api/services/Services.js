const database = require('../models')

class Services {
  constructor(nomeModelo) {
    this.nomeModelo = nomeModelo
  }

  async pegaTodosOsRegistros (where = {}) {
    return database[this.nomeModelo]
      .findAll({
        where: {
          ...where
        }
      })
  }

  async pegaUmRegistro (id) {
    return database[this.nomeModelo]
      .findOne({
        where: {
          id: id
        }
      })
  }

  async criaRegistro (novoRegistro) {
    return database[this.nomeModelo].create(novoRegistro)
  }

  async atualizaRegistro (id, dados, transacao = {}) {
    return database[this.nomeModelo]
      .update(dados, { where: { id: id } }, transacao)
  }

  async atualizaRegistros (where, dados, transacao = {}) {
    return database[this.nomeModelo]
      .update(dados, { where: { ...where } }, transacao)
  }

  async apagaRegistro (id) {
    return database[this.nomeModelo].destroy({
      where: {
        id: id
      }
    })
  }
}

module.exports = Services
