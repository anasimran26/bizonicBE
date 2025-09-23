"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      Customer.belongsTo(models.User, {
        foreignKey: "user_id",
        targetKey: "user_id",
      });
    }
  }

  Customer.init(
    {
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      customer_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      contact_number: {
        type: DataTypes.STRING,
      },
      email_address: {
        type: DataTypes.STRING,
        validate: { isEmail: true },
      },
      customer_address: {
        type: DataTypes.STRING,
      },
      opening_balance: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      to_pay: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      to_receive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Customer",
    }
  );

  return Customer;
};
