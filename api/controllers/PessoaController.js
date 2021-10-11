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
      const resposta = await pessoasServices.pegaUmRegistro(parseInt(id))
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
      await pessoasServices(id)
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
      await pessoasServices.atualizaRegistro(novasInformacoes, id)
      const resposta = await pessoasServices.pegaUmRegistro(parseInt(id))
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

  static async pegaMatriculas (req, res, next) {
    const { estudanteId } = req.params
    try {
      const pessoa = await database.Pessoas.findOne({
        where: {
          id: parseInt(estudanteId)
        }
      })
      const resposta = await pessoa.getAulasMatriculadas()
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
      const resposta = await database.Matriculas.findAndCountAll({
        where: {
          turma_id: parseInt(turmaId),
          status: 'confirmado'
        },
        limit: 20,
        order: [['estudante_id', 'ASC']]
      })
      res.status(200).json(resposta)
      next()
    } catch (err) {
      res.status(500).json(err)
      next()
    }
  }

  static async pegaTurmasLotadas (_, res, next) {
    const lotacaoTurma = 2
    try {
      const resposta = await database.Matriculas.findAndCountAll({
        where: {
          status: 'confirmado'
        },
        attributes: ['turma_id'],
        group: ['turma_id'],
        having: sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)
      })
      res.status(200).json(resposta.count)
      next()
    } catch (err) {
      res.status(500).json(err)
      next()
    }
  }

  static async cancelaPessoa (req, res, next) {
    const { estudanteId } = req.params
    try {
      await pessoasServices.cancelaPessoasEMatriculas(parseInt(estudanteId))
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
