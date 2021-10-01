const { Router } = require('express')
const PessoaController = require('../controllers/PessoaController')

const router = Router()

router
  .get('/pessoas', PessoaController.pegaTodasAsPessoas)
  .get('/pessoas/:id', PessoaController.pegaUmaPessoa)
  .post('/pessoas', PessoaController.criaPessoa)
  .post('/pessoas/:estudanteId/matriculas/:matriculaId/restaura', PessoaController.restauraUmaMatricula)
  .put('/pessoas/:id', PessoaController.atualizaUmaPessoa)
  .delete('/pessoas/:id', PessoaController.deletaUmaPessoa)
  .post('/pessoas/:id/restaura', PessoaController.restauraPessoa)

  .get('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.pegaUmaMatricula)
  .post('/pessoas/:estudanteId/matriculas', PessoaController.criaMatricula)
  .put('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.atualizaMatricula)
  .delete('/pessoas/:estudanteID/matriculas/:matriculaId', PessoaController.deletaUmaMatricula)

module.exports = router
