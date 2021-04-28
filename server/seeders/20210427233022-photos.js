"use strict";
let photos = require("../database/photos.json");

module.exports = {
	up: async (queryInterface, Sequelize) => {
		photos = photos.map((photo) => {
			photo.createdAt = new Date();
			photo.updatedAt = new Date();
			return photo;
		});
		queryInterface.bulkInsert("Photos", photos);
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
	},

	down: async (queryInterface, Sequelize) => {
		queryInterface.bulkDelete("Photos", null, {});
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
