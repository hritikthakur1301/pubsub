import { config } from 'dotenv';
import express, { json } from 'express';
import { MESSAGE_CONSTANT } from './common/constant.js';
import { sequelize } from './config/db.js';
import userRoutes from './routes/userRoutes.js';

config();

const app = express();
app.use(json());
app.use('/api', userRoutes);

sequelize
  .sync()
  .then(() => {
    console.log(MESSAGE_CONSTANT.DB_CONNECTED);
    app.listen(process.env.PORT, () =>
      console.log(MESSAGE_CONSTANT.SERVER, process.env.PORT)
    );
  })
  .catch((err) => console.log("database connection error - ", err));
