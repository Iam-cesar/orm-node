const database = require('../models')
const sequelize = require('sequelize')
const Op = sequelize.Op

class TurmaController {
  static async pegaTodasAsTurmas (req, res, next) {
    const { data_inicial, data_final } = req.query
    const where = {}
    data_inicial || data_final ? where.data_inicio = {} : null
    data_inicial ? where.data_inicio[Op.gte] = data_inicial : null
    data_final ? where.data_inicio[Op.lte] = data_final : null
    try {
      const resposta = await database.Turmas.findAll({
        attributes: ['id', 'data_inicio', 'nivel_id', 'docente_id'],
        where
      })
      res.status(200).json(resposta)
      next()
    } catch (err) {
      res.status(400).send(err)
      next()
    }
  }

  static async pegaUmaTurma (req, res, next) {
    const { id } = req.params
    try {
      const resposta = await database.Turmas.findOne({
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

  static async criaUmaTurma (req, res, next) {
    const novaTurma = req.body
    try {
      const resposta = await database.Turmas.create(novaTurma)
      res.status(200).json(resposta)
      next()
    } catch (err) {
      res.status(400).send(err)
      next()
    }
  }

  static async atualizaUmaTurma (req, res, next) {
    const { id } = req.params
    const novaTurma = req.body

    try {
      await database.Turmas.update(novaTurma, {
        where: {
          id: parseInt(id)
        }
      })

      const resposta = await database.Turmas.findOne({
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

  static async deletaUmaTurma (req, res, next) {
    const { id } = req.params
    try {
      await database.Turmas.destroy({
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

  static async restauraTurma (req, res, next) {
    const { id } = req.params
    try {
      await database.Turmas.restore({
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

module.exports = TurmaController
