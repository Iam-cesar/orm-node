const { PessoasServices } = require('../services')
const pessoasServices = new PessoasServices()
class PessoaController {
  static async pegaPessoasAtivas (_, res, next) {
    try {
      const resposta = await pessoasServices.pegaRegistrosAtivos()
      res.status(200).json(resposta)
      next()
    } catch (err) {
      res.status(500).json(err)
      next()
    }
  }

  static async pegaTodasAsPessoas (_, res, next) {
    const scope = 'todos'
    try {
      const resposta = await pessoasServices.pegaTodosOsRegistros(scope)
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
      const resposta = await pessoasServices.pegaUmRegistro(id)
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
      const resposta = await pessoasServices.criaRegistro(novaPessoa)
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
      await pessoasServices.apagaRegistro(id)
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
      await pessoasServices.restauraRegistro(id)

      res.status(200).json({ message: `id ${id} foi restaurado` })
      next()
    } catch (err) {
      res.status(500).json(err)
      next()
    }
  }

  static async atualizaUmaPessoa (req, res, next) {
    const { id } = req.params
    const novasInformacoes = req.body
    try {
      await pessoasServices.atualizaRegistro(id, novasInformacoes)
      const resposta = await pessoasServices.pegaUmRegistro(id)
      res.status(201).json(resposta)
      next()
    } catch (err) {
      res.status(500).json(err)
      next()
    }
  }

  static async pegaMatriculas (req, res, next) {
    const { estudanteId } = req.params
    try {
      const resposta = await pessoasServices.pegaMatriculas(estudanteId)
      res.status(200).json(resposta)
      next()
    } catch (err) {
      res.status(500).json(err)
      next()
    }
  }

  static async cancelaPessoa (req, res, next) {
    const { estudanteId } = req.params
    try {
      await pessoasServices.cancelaPessoasEMatriculas(estudanteId)
      res.status(200).json({
        message: `matriculas referente ao estudante ${estudanteId} canceladas`
      })
      next()
    } catch (err) {
      res.status(500).json(err)
      next()
    }
  }
}

module.exports = PessoaController
