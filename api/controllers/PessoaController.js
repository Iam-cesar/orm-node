const database = require('../models')

class PessoaController {
  static async pegaTodasAsPessoas (req, res, next) {
    try {
      const resposta = await database.Pessoas.findAll()
      res.status(200).json(resposta)
      next()
    } catch (err) {
      res.status(500).json(err)
      next()
    }
  }

  static async pegaUmaPessoa (req, res, next) {
    const { id } = req.params
    try {
      const resposta = await database.Pessoas.findOne({
        where: {
          id: parseInt(id)
        }
      })
      res.status(200).json(resposta)
      next()
    } catch (err) {
      res.status(500).json(err)
      next()
    }
  }

  static async criaPessoa (req, res, next) {
    const novaPessoa = req.body
    try {
      const resposta = await database.Pessoas.create(novaPessoa)
      res.status(200).json(resposta)
      next()
    } catch (err) {
      res.status(500).json(err)
      next()
    }
  }

  static async deletaUmaPessoa (req, res, next) {
    const { id } = req.params
    try {
      await database.Pessoas.destroy({
        where: {
          id: parseInt(id)
        }
      })
      res.status(200).json({
        message: `Id ${id} foi deletado`
      })
      next()
    } catch (err) {
      res.status(500).json(err)
      next()
    }
  }

  static async restauraPessoa (req, res, next) {
    const { id } = req.params
    try {
      await database.Pessoas.restore({
        where: {
          id: parseInt(id)
        }
      })

      res.status(200).json({ message: `id ${id} foi restaurado` })
    } catch (err) {
      res.status(500).json(err)
    }
  }

  static async atualizaUmaPessoa (req, res, next) {
    const { id } = req.params
    const novasInformacoes = req.body
    try {
      await database.Pessoas.update(novasInformacoes, {
        where: {
          id: parseInt(id)
        }
      })
      const resposta = await database.Pessoas.findOne({
        where: {
          id: parseInt(id)
        }
      })
      res.status(201).json(resposta)
      next()
    } catch (err) {
      res.status(500).json(err)
      next()
    }
  }

  static async pegaUmaMatricula (req, res, next) {
    const { estudanteId, matriculaId } = req.params
    try {
      const resposta = await database.Matriculas.findOne({
        where: {
          id: parseInt(matriculaId),
          estudante_id: parseInt(estudanteId)
        }
      })
      res.status(200).json(resposta)
      next()
    } catch (err) {
      res.status(500).json(err)
      next()
    }
  }

  static async criaMatricula (req, res, next) {
    const { estudanteId } = req.params
    const novaMatricula = { ...req.body, estudante_id: parseInt(estudanteId) }

    try {
      const resposta = await database.Matriculas.create(novaMatricula)
      res.status(200).json(resposta)
      next()
    } catch (err) {
      res.status(500).json(err)
      next()
    }
  }

  static async deletaUmaMatricula (req, res, next) {
    const { estudanteId, matriculaId } = req.params
    try {
      await database.Pessoas.destroy({
        where: {
          id: parseInt(matriculaId),
          estudante_id: parseInt(estudanteId)
        }
      })
      res.status(200).json({
        message: `Id ${matriculaId} foi deletado`
      })
      next()
    } catch (err) {
      res.status(500).json(err)
      next()
    }
  }

  static async restauraUmaMatricula (req, res, next) {
    const { estudanteId, matriculaId } = req.params
    try {
      await database.Pessoas.restore({
        where: {
          id: parseInt(matriculaId),
          estudante_id: parseInt(estudanteId)
        }
      })
      res.status(200).json({
        message: `Id ${matriculaId} foi restaurado`
      })
      next()
    } catch (err) {
      res.status(500).json(err)
      next()
    }
  }

  static async atualizaMatricula (req, res, next) {
    const { estudanteId, matriculaId } = req.params
    const novasInformacoes = req.body
    try {
      await database.Matriculas.update(novasInformacoes, {
        where: {
          id: parseInt(matriculaId),
          estudante_id: parseInt(estudanteId)
        }
      })
      const resposta = await database.Matriculas.findOne({
        where: {
          id: parseInt(matriculaId),
          estudante_id: parseInt(estudanteId)
        }
      })
      res.status(201).json(resposta)
      next()
    } catch (err) {
      res.status(500).json(err)
      next()
    }
  }
}

module.exports = PessoaController
