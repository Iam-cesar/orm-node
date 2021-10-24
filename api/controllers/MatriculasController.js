const { MatriculasServices } = require('../services')
const matriculasServices = new MatriculasServices()

class MatriculasController {

  static async criaMatricula (req, res, next) {
    const { estudanteId } = req.params
    const novaMatricula = { ...req.body, estudante_id: parseInt(estudanteId) }

    try {
      const resposta = await matriculasServices.criaRegistro(novaMatricula)
      res.status(200).json(resposta)
      next()
    } catch (err) {
      res.status(500).json(err)
      next()
    }
  }

  static async pegaUmaMatricula (req, res, next) {
    const { estudanteId, matriculaId } = req.params
    try {
      const resposta = await matriculasServices.pegaUmaMatricula(estudanteId, matriculaId)
      res.status(200).json(resposta)
      next()
    } catch (err) {
      res.status(500).json(err)
      next()
    }
  }

  static async pegaMatriculasPorTurmas (req, res, next) {
    const { turmaId } = req.params
    try {
      const resposta = await matriculasServices.pegaMatriculaPorTurmas(turmaId)
      res.status(200).json(resposta)
      next()
    } catch (err) {
      res.status(500).json(err)
      next()
    }
  }

  static async pegaTurmasLotadas (_, res, next) {
    const lotacaoTurma = 5
    try {
      const resposta = await matriculasServices.pegaTurmasLotada(lotacaoTurma)
      res.status(200).json(resposta)
      next()
    } catch (err) {
      res.status(200).json({
        message: "Não existem turmas lotadas"
      })
    }
  }

  static async restauraUmaMatricula (req, res, next) {
    const { estudanteId, matriculaId } = req.params
    try {
      await matriculasServices.restauraMatricula(estudanteId, matriculaId)
      res.status(200).json({
        message: `Id ${matriculaId} foi restaurado`
      })
      next()
    } catch (err) {
      res.status(500).json(err)
      next()
    }
  }

  static async deletaUmaMatricula (req, res, next) {
    const { estudanteId, matriculaId } = req.params
    try {
      await matriculasServices.deletaUmaMatricula(estudanteId, matriculaId)
      res.status(200).json({
        message: `Id ${matriculaId} foi deletado`
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
      const resposta = await matriculasServices.atualizaMatricula(novasInformacoes, estudanteId, matriculaId)
      res.status(201).json(resposta)
      next()
    } catch (err) {
      res.status(500).json(err)
      next()
    }
  }
}

module.exports = MatriculasController
