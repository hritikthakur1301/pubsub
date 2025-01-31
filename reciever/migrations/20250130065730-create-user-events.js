'use strict';
import { DataTypes } from 'sequelize';
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('user_events', {
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
    },
    age: {
      type: Sequelize.INTEGER,
    },
    email: {
      type: Sequelize.STRING,
    },
    inserted_at: {
      type: Sequelize.DATE,
    },
    modified_at: {
      type: Sequelize.DATE,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: DataTypes.NOW,
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('User_Events');
}
