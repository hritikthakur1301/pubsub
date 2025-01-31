import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

//console.log('process.env.DATABASE_URL', process.env.DATABASE_URL);

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});
