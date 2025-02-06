import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || 'db', // Ensure it uses 'db' inside Docker
    port: process.env.DB_PORT || 5432, // Ensure port is set
    dialect: 'postgres',
    logging: false,
  }
);
