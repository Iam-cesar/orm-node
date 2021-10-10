const { Router } = require('express')
const PessoaController = require('../controllers/PessoaController')

const router = Router()

router
  .get('/pessoas', PessoaController.pegaPessoasAtivas)
  .get('/pessoas/todos', PessoaController.pegaTodasAsPessoas)
  .get('/pessoas/:id', PessoaController.pegaUmaPessoa)
  .get('/pessoas/:estudanteId/matriculas', PessoaController.pegaMatriculas)
  .get('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.pegaUmaMatricula)
  .get('/pessoas/matriculas/:turmaId/confirmadas', PessoaController.pegaMatriculasPorTurmas)
  .get('/pessoas/matriculas/lotada', PessoaController.pegaTurmasLotadas)
  .post('/pessoas', PessoaController.criaPessoa)
  .post('/pessoas/:estudanteId/matriculas/:matriculaId/restaura', PessoaController.restauraUmaMatricula)
  .post('/pessoas/:estudanteId/matriculas', PessoaController.criaMatricula)
  .post('/pessoas/:id/restaura', PessoaController.restauraPessoa)
  .put('/pessoas/:id', PessoaController.atualizaUmaPessoa)
  .put('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.atualizaMatricula)
  .delete('/pessoas/:id', PessoaController.deletaUmaPessoa)
  .delete('/pessoas/:estudanteID/matriculas/:matriculaId', PessoaController.deletaUmaMatricula)

module.exports = router
