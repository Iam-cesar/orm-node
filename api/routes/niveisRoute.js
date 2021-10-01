const { Router } = require('express')
const NivelController = require('../controllers/NivelController')

const routes = Router()

routes
  .get('/niveis', NivelController.pegaTodosOsNiveis)
  .get('/niveis/:id', NivelController.pegaUmNivel)
  .post('/niveis', NivelController.criaUmNivel)
  .post('/niveis/:id/restaura', NivelController.restauraNivel)
  .put('/niveis/:id', NivelController.atualizaUmNivel)
  .delete('/niveis/:id', NivelController.deletaUmNivel)

module.exports = routes
