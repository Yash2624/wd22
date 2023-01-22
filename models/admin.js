"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    static updatepassword(password, email) {
      return this.update(
        {
          password: password,
        },
        {
          where: {
            email: email,
          },
        }
      );
    }
    static findadmin(email) {
      return this.findOne({
        where: {
          email,
        },
      });
    }
    static associate(models) {
      Admin.hasMany(models.Election, {
        foreignKey: "adminID",
      });
    }
  }
  Admin.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      case: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Admin",
    }
  );
  return Admin;
};