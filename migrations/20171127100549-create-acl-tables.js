'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      const aclSchema = {
          key: {
              type: Sequelize.STRING,
              primaryKey: true
          },
          value: Sequelize.STRING,
          createdAt: {
              allowNull: false,
              type: Sequelize.DATE
          },
          updatedAt: {
              allowNull: false,
              type: Sequelize.DATE
          }
      };

      return Promise.all([
          queryInterface.createTable('acl_meta', aclSchema),
          queryInterface.createTable('acl_parents', aclSchema),
          queryInterface.createTable('acl_permissions', aclSchema),
          queryInterface.createTable('acl_resources', aclSchema),
          queryInterface.createTable('acl_roles', aclSchema),
          queryInterface.createTable('acl_users', aclSchema)
      ]);
  },

  down: (queryInterface, Sequelize) => {
      return Promise.all([
          queryInterface.dropTable('acl_meta'),
          queryInterface.dropTable('acl_parents'),
          queryInterface.dropTable('acl_permissions'),
          queryInterface.dropTable('acl_resources'),
          queryInterface.dropTable('acl_roles'),
          queryInterface.dropTable('acl_users')
      ]);
  }
};
