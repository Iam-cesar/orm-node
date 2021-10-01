'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoas extends Model {
    static associate (models) {
      Pessoas.hasMany(models.Matriculas, {
        foreignKey: 'estudante_id'
      })
      Pessoas.hasMany(models.Turmas, {
        foreignKey: 'docente_id'
      })
    }
  };
  Pessoas.init({
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    ativo: DataTypes.BOOLEAN,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pessoas',
    paranoid: true
  });
  return Pessoas;
};
