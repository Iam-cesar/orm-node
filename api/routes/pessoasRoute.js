const { Router } = require('express')
const PessoaController = require('../controllers/PessoaController')

const router = Router()

router
  .get('/pessoas', PessoaController.pegaTodasAsPessoas)
  .get('/pessoas/ativas', PessoaController.pegaPessoasAtivas)
  .get('/pessoas/:id', PessoaController.pegaUmaPessoa)
  .get('/pessoas/:estudanteId/matriculas', PessoaController.pegaMatriculas)
  .post('/pessoas', PessoaController.criaPessoa)
  .post('/pessoas/:estudanteId/cancela', PessoaController.cancelaPessoa)
  .post('/pessoas/:id/restaura', PessoaController.restauraPessoa)
  .put('/pessoas/:id', PessoaController.atualizaUmaPessoa)
  .delete('/pessoas/:id', PessoaController.deletaUmaPessoa)

module.exports = router
