import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
dotenv.config();

export const sequelize = new Sequelize(process.env.DATABASE);

export const SECRET_KEY = process.env.SECRET_KEY;

export const BCRYPT_WORK_FACTOR = 12;
