"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("user123", 10);

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          user_id: "USR-00000000",
          full_name: "Dev User",
          email: "user@gmail.com",
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", { email: "dev@example.com" }, {});
  },
};
