const { Router } = require('express')
const MatriculasController = require('../controllers/MatriculasController')

const routes = Router()

routes
  .get('/pessoas/:estudanteId/matriculas/:matriculaId', MatriculasController.pegaUmaMatricula)
  .get('/pessoas/matriculas/:turmaId/confirmadas', MatriculasController.pegaMatriculasPorTurmas)
  .get('/pessoas/matriculas/lotada', MatriculasController.pegaTurmasLotadas)
  .post('/pessoas/:estudanteId/matriculas/:matriculaId/restaura', MatriculasController.restauraUmaMatricula)
  .post('/pessoas/:estudanteId/matriculas', MatriculasController.criaMatricula)
  .put('/pessoas/:estudanteId/matriculas/:matriculaId', MatriculasController.atualizaMatricula)
  .delete('/pessoas/:estudanteID/matriculas/:matriculaId', MatriculasController.deletaUmaMatricula)

module.exports = routes
