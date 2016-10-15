'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
   return queryInterface.createTable('Departments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },

    })
    .then(function(){
      queryInterface.createTable('Users', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        hashedId: {
          allowNull: false,
          unique: true,
          defaultValue: Sequelize.UUIDV4,
          type: Sequelize.UUID
        },
        name: {
          type: Sequelize.STRING
        },
        email: {
          allowNull: false,
          type: Sequelize.STRING,
          unique: true,
          validate:{
            isEmail: true
          }
        },
        phoneNumber: {
          type: Sequelize.BIGINT,
        },
        password: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      })
    })
    .then(function(){
      console.log('adding constraint dpm...');
      queryInterface.addColumn(
        'Users',
        'departmentId',
        {
          type: Sequelize.INTEGER,
          references: {
            model: "Departments",
            key: "id"
          }
        } 
      )
    })
    .then(function(){
      console.log('adding constraint manager...');
      queryInterface.addColumn(
        'Departments',
        'managerId',
        {
          type: Sequelize.INTEGER,
          references: {
            model: "Users",
            key: "id"
          }
        }
      )
    })
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
