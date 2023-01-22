"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class questions extends Model {
    static countquestions(electionID) {
      return this.count({
        where: {
          electionID,
        },
      });
    }

    static addquestion({ questionname, description, electionID }) {
      return this.create({
        questionname,
        description,
        electionID,
      });
    }
    static retrievequestion(id) {
      return this.findOne({
        where: {
          id,
        },
        order: [["id", "ASC"]],
      });
    }
    static removequestion(id) {
      return this.destroy({
        where: {
          id,
        },
      });
    }

    static findquestion(electionID, questionname) {
      return this.findOne({
        where: {
          questionname: questionname,
          electionID: electionID,
        },
      });
    }

    static modifyquestion(questionname, desctiption, questionID) {
      return this.update(
        {
          questionname: questionname,
          description: desctiption,
        },
        {
          where: {
            id: questionID,
          },
        }
      );
    }
    static retrievequestions(electionID) {
      return this.findAll({
        where: {
          electionID,
        },
        order: [["id", "ASC"]],
      });
    }
    static associate(models) {
      questions.hasMany(models.answers, {
        foreignKey: "questionID",
      });

      questions.belongsTo(models.Election, {
        foreignKey: "electionID",
      });

      questions.hasMany(models.options, {
        foreignKey: "questionID",
      });
    }
  }

  questions.init(
    {
      questionname: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "questions",
    }
  );
  return questions;
};