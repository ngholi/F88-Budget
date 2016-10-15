'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    hashedId: DataTypes.UUID,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.BIGINT,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User.belongsTo(models.Department,{foreignKey:'departmentId', targetKey:'id'});
      }
    }
  });
  return User;
};