'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoas extends Model {
    static associate (models) {
      Pessoas.hasMany(models.Matriculas, {
        foreignKey: 'estudante_id',
        scope: {
          status: 'confirmado'
        },
        as: 'aulasMatriculadas'
      })
      Pessoas.hasMany(models.Turmas, {
        foreignKey: 'docente_id'
      })
    }
  };
  Pessoas.init({
    nome: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'dado do tipo e-mail invalido',
          allowNull: false
        }
      }
    },
    ativo: DataTypes.BOOLEAN,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pessoas',
    paranoid: true,
    defaultScope: {
      where: {
        ativo: true
      }
    },
    scopes: {
      todos: {
        where: {}
      }
    }
  });
  return Pessoas;
};
