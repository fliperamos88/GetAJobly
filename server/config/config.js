import { Sequelize } from 'sequelize';
import 'dotenv/config';

export const sequelize = new Sequelize('react-jobly', 'f.ramos', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
  // define: {
  //   freezeTableName: true,
  // },
});

export const SECRET_KEY = process.env.SECRET_KEY || 'secret-dev';

export const BCRYPT_WORK_FACTOR = process.env.SALT || 12;
