import dotenv from 'dotenv'

dotenv.config();

export default{
  development: {
    dialect: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USERNAME || 'tutorial',
    password: process.env.DB_PASSWORD || 'Test@123',
    database: process.env.DB_DATABASE || 'golang',
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
    logging: process.env.DB_LOGGING === 'true',
  },
};