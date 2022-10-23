const Sequelize = require("sequelize");
const sequelize = require("./config");

const adminAuth = sequelize.define(
  "tbl_admin_account",
  {
    idx: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    id: {
      type: Sequelize.STRING(20)
    },
    password: {
      type: Sequelize.STRING(100)
    },
    name: {
      type: Sequelize.STRING(20)
    },
    isAdmin: {
      type: Sequelize.STRING(1)
    },
    createdAt: {
      type: Sequelize.DATE
    },
  }
);

module.exports = adminAuth;
