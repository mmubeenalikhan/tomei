"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("UserAccounts", "picture", {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("UserAccounts", "picture", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
