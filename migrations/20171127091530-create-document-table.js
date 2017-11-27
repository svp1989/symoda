'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('document', {
          id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.INTEGER
          },
          description: Sequelize.TEXT,
          type: {
              allowNull: false,
              type: Sequelize.STRING
          },
          file_name: {
              allowNull: false,
              type: Sequelize.STRING
          },
          size: {
              allowNull: false,
              type: Sequelize.INTEGER
          },
          hash: Sequelize.TEXT,
          created_at: {
              allowNull: false,
              type: Sequelize.DATE
          },
          updated_at: {
              allowNull: false,
              type: Sequelize.DATE
          },
          user_id: {
              type: Sequelize.INTEGER,
              references: {
                  model: 'user',
                  key: 'id'
              }
          }
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('document');
  }
};
