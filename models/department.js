'use strict';
module.exports = function(sequelize, DataTypes) {
  var Department = sequelize.define('Department', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Department.belongsTo(models.User,{as: 'manager',foreignKey:'managerId', targetKey:'id'});
        Department.belongsTo(models.Department,{as: 'parentDepartment',foreignKey:'parentDepartmentId', targetKey: 'id'});
      }
    }
  });
  return Department;
};