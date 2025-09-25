"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("BusinessProfiles", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "Users",
          key: "user_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      full_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phone_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      business_type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      business_category: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      business_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      business_address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      business_description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("BusinessProfiles");
  },
};
