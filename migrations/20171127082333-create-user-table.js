'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('user', {
          id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.INTEGER
          },
          login: {
              allowNull: false,
              type: Sequelize.STRING
          },
          email: {
              allowNull: false,
              type: Sequelize.STRING
          },
          phone: {
              allowNull: false,
              type: Sequelize.STRING
          },
          status: {
              type: Sequelize.TINYINT,
              defaultValue: 1
          },
          first_name: {
              allowNull: false,
              type: Sequelize.STRING
          },
          last_name: {
              allowNull: false,
              type: Sequelize.STRING
          },
          middle_name: {
              allowNull: false,
              type: Sequelize.STRING
          },
          birthday: Sequelize.DATE,
          hash: {
              allowNull: false,
              type: Sequelize.TEXT
          },
          salt: {
              allowNull: false,
              type: Sequelize.STRING
          },
          role: Sequelize.TEXT,
          created_at: {
              allowNull: false,
              type: Sequelize.DATE
          },
          updated_at: {
              allowNull: false,
              type: Sequelize.DATE
          }
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('user');
  }
};
