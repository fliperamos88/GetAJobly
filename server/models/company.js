import { DataTypes, Sequelize, Model } from 'sequelize';
import sequelize from '../config/sequelize.js';

const Company = sequelize.define(
  'companies',
  {
    handle: {
      type: DataTypes.STRING(100),
      primaryKey: true,
      validate: {
        isLowercase: true,
      },
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: {
        args: true,
        msg: 'This name is already registered',
      },
    },
    num_employees: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: true,
      },
    },
    logo_url: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: false,
  }
);

export default Company;
