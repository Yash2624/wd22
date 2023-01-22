"use strict";
const { Model, Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class options extends Model {
    static retrieveoptions(questionID) {
      return this.findAll({
        where: {
          questionID,
        },
        order: [["id", "ASC"]],
      });
    }
    static retriveoption(id) {
      return this.findOne({
        where: {
          id,
        },
      });
    }
    static modifyoption(optionname, id) {
      return this.update(
        {
          optionname: optionname,
        },
        {
          where: {
            id: id,
          },
        }
      );
    }
    static removeoptions(id) {
      return this.destroy({
        where: {
          id,
        },
      });
    }
    static addoption({ optionname, questionID }) {
      return this.create({
        optionname,
        questionID,
      });
    }

    static findoption({ optionname }) {
      return this.findOne({
        optionname,
      });
    }

    static associate(models) {
      options.belongsTo(models.questions, {
        foreignKey: "questionID",
      });

      options.hasMany(models.answers, {
        foreignKey: "chossedoption",
      });
    }
  }
  options.init(
    {
      optionname: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "options",
    }
  );
  return options;
};