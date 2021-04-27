"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		queryInterface.addConstraint("Photos", {
			fields: ["UserId"],
			type: "foreign key",
			name: "fkey_photos_userid",
			references: {
				//Required field
				table: "target_table_name",
				field: "target_column_name",
			},
			onDelete: "cascade",
			onUpdate: "cascade",
		});
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
	},

	down: async (queryInterface, Sequelize) => {
		queryInterface.removeConstraint("Photos", "fkey_photos_userid");
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
	},
};
