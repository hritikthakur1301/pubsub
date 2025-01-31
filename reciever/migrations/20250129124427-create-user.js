'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('users', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
    },
    username: {
      type: Sequelize.STRING,
      require: true,
    },
    class: {
      type: Sequelize.STRING,
      require: true,
    },
    age: {
      type: Sequelize.INTEGER,
      require: true,
    },
    email: {
      type: Sequelize.STRING,
      require: true,
      unique: true,
    },
    inserted_at: {
      type: Sequelize.DATE,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('users');
}
