"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class BusinessProfile extends Model {
    static associate(models) {
      BusinessProfile.belongsTo(models.User, {
        foreignKey: "user_id",
        targetKey: "user_id",
      });
    }
  }

  BusinessProfile.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      user_id: { type: DataTypes.STRING, allowNull: false },
      full_name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      business_type: DataTypes.STRING,
      business_category: DataTypes.STRING,
      business_name: DataTypes.STRING,
      business_address: DataTypes.STRING,
      business_description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "BusinessProfile",
    }
  );

  return BusinessProfile;
};
