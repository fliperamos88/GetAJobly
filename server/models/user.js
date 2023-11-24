import { DataTypes, Sequelize, Model } from 'sequelize';
import sequelize from '../config/sequelize.js';
import Job from './job.js';

const User = sequelize.define(
  'user',
  {
    username: {
      type: DataTypes.STRING(25),
      primaryKey: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: true,
        isEmail: true,
      },
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    timestamps: false,
  }
);

// CREATE TABLE users (
// //     username VARCHAR(25) PRIMARY KEY,
// //     password TEXT NOT NULL,
// //     first_name TEXT NOT NULL,
// //     last_name TEXT NOT NULL,
// //     email TEXT NOT NULL
// //       CHECK (position('@' IN email) > 1),
// //     is_admin BOOLEAN NOT NULL DEFAULT FALSE
// //     createdAt DATE,
// //     updatedAt DATE,

// //   );
export default User;
