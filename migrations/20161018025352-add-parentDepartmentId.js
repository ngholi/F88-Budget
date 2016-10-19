'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Departments',
      'parentDepartmentId',
      {
        type: Sequelize.INTEGER,
        references: {
          model : 'Departments',
          key: 'id',
          onDelete : 'SET NULL'
        }
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'Departments',
      'parentDepartmentId'
    )
  }
};
