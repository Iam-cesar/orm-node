'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Matriculas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      turma_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Turmas',
          key: 'id'
        }
      },
      estudante_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Pessoas',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Matriculas');
  }
};
