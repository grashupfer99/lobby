"use strict";
module.exports = (sequelize, DataTypes) => {
  var Skill = sequelize.define("Skill", {
    name: {
      type: DataTypes.STRING,
      primaryKey: true
    }
  });

  return Skill;
};
