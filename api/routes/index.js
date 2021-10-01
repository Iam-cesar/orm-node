const express = require('express')
const pessoas = require('./pessoasRoute')
const niveis = require('./niveisRoute')
const turmas = require('./turmaRoute')

module.exports = app => {
  app.use(
    express.json(),
    pessoas,
    niveis,
    turmas
  )
}
