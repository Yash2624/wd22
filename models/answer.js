"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class answers extends Model {
    static addResponse({ voterid, ElectionID, questionID, chossedoption }) {
      return this.create({
        ElectionID,
        questionID,
        voterid,
        chossedoption,
      });
    }

    static retriveanswers(ElectionID) {
      return this.findAll({
        where: {
          ElectionID,
        },
      });
    }

    static retrivecountoptions(chossedoption, ElectionID, questionID) {
      return this.count({
        where: {
          chossedoption,
          ElectionID,
          questionID,
        },
      });
    }
    static associate(models) {
      answers.belongsTo(models.Election, {
        foreignKey: "ElectionID",
      });

      answers.belongsTo(models.questions, {
        foreignKey: "questionID",
      });

      answers.belongsTo(models.Voters, {
        foreignKey: "voterid",
        onDelete: "CASCADE",
      });
      answers.belongsTo(models.options, {
        foreignKey: "chossedoption",
        onDelete: "CASCADE",
      });
    }
  }
  answers.init(
    {},
    {
      sequelize,
      modelName: "answers",
    }
  );
  return answers;
};