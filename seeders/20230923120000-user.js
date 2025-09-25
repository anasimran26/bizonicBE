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
          isVerified: true,
          verificationToken: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    await queryInterface.bulkInsert(
      "BusinessProfiles",
      [
        {
          user_id: "USR-00000000",
          full_name: "Dev User",
          email: "user@gmail.com",
          phone_number: null,
          business_type: null,
          business_category: null,
          business_name: null,
          business_address: null,
          business_description: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      "BusinessProfiles",
      { email: "user@gmail.com" },
      {}
    );
    await queryInterface.bulkDelete("Users", { email: "user@gmail.com" }, {});
  },
};
