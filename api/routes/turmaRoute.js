const { Router } = require('express')
const TurmaController = require('../controllers/TurmaController')

const routes = Router()

routes
  .get('/turmas', TurmaController.pegaTodasAsTurmas)
  .get('/turmas/:id', TurmaController.pegaUmaTurma)
  .post('/turmas', TurmaController.criaUmaTurma)
  .post('/turmas/:id/restaura', TurmaController.restauraTurma)
  .put('/turmas/:id', TurmaController.atualizaUmaTurma)
  .delete('/turmas/:id', TurmaController.deletaUmaTurma)

module.exports = routes
