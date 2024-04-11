'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'John',
      lastName: 'Doe',
      email: 'example@example.com',
      password: '123',
      gender: 0,
      phone: '123',
      address: 'TPHCM',
      avatar : 'http://example.com',
      id_role : 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
   
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
