const express = require('express')
const pessoas = require('./pessoasRoute')
const niveis = require('./niveisRoute')
const turmas = require('./turmaRoute')
const matriculas = require('./matriculasRoute')

module.exports = app => {
  app.use(
    express.json(),
    pessoas,
    niveis,
    turmas,
    matriculas
  )
}
