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
      const resposta = await database.Niveis.findOne({
        where: {
          id: parseInt(id)
        }
      })
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
      const resposta = await database.Niveis.create(novaNivel)
      res.status(200).json(resposta)
      next()
    } catch (err) {
      res.status(400).send(err)
      next()
    }
  }

  static async atualizaUmNivel (req, res, next) {
    const { id } = req.params
    const novaNivel = req.body

    try {
      await database.Niveis.update(novaNivel, {
        where: {
          id: parseInt(id)
        }
      })

      const resposta = await database.Niveis.findOne({
        where: {
          id: parseInt(id)
        }
      })
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
      await database.Niveis.destroy({
        where: {
          id: parseInt(id)
        }
      })
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
      await database.Niveis.restore({
        where: {
          id: parseInt(id)
        }
      })

      res.status(200).json({ message: `id ${id} foi restaurado` })
      next()
    } catch (err) {
      res.status(500).json(err)
      next()
    }
  }
}

module.exports = NivelController
