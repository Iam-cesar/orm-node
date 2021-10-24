const { NiveisServices } = require('../services')
const niveisServices = new NiveisServices()

class NivelController {
  static async pegaTodosOsNiveis (req, res, next) {
    try {
      const resposta = await niveisServices.pegaTodosOsRegistros()
      res.status(200).json(resposta)
      next()
    } catch (err) {
      res.status(400).send(err)
      next()
    }
  }

  static async pegaUmNivel (req, res, next) {
    const { id } = req.params
    try {
      const resposta = await niveisServices.pegaUmRegistro(id)
      res.status(200).json(resposta)
      next()
    } catch (err) {
      res.status(400).send(err)
      next()
    }
  }

  static async criaUmNivel (req, res, next) {
    const novaNivel = req.body
    try {
      const resposta = await niveisServices.criaRegistro(novaNivel)
      res.status(200).json(resposta)
      next()
    } catch (err) {
      res.status(400).send(err)
      next()
    }
  }

  static async atualizaUmNivel (req, res, next) {
    const { id } = req.params
    const novasInformacoes = req.body

    try {
      await niveisServices.atualizaRegistro(id, novasInformacoes)

      const resposta = await niveisServices.pegaUmRegistro(id)
      res.status(200).json(resposta)
      next()
    } catch (err) {
      res.status(400).send(err)
      next()
    }
  }

  static async deletaUmNivel (req, res, next) {
    const { id } = req.params
    try {
      await niveisServices.apagaRegistro(id)
      res.status(200).send({
        message: 'Item foi deletado'
      })
      next()
    } catch (err) {
      res.status(400).send(err)
      next()
    }
  }

  static async restauraNivel (req, res, next) {
    const { id } = req.params
    try {
      await niveisServices.restauraRegistro(id)

      res.status(200).json({ message: `id ${id} foi restaurado` })
      next()
    } catch (err) {
      res.status(500).json(err)
      next()
    }
  }
}

module.exports = NivelController
