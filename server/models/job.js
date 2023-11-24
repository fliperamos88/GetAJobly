import { DataTypes, Sequelize, Model } from 'sequelize';
import sequelize from '../config/sequelize.js';
import Company from './company.js';
import User from './user.js';

const Job = sequelize.define(
  'jobs',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    salary: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
      },
    },
    equity: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
      },
    },
  },
  {
    timestamps: false,
  }
);

Job.belongsTo(Company, { foreignKey: 'company_handle', onDelete: 'CASCADE' });
Company.hasMany(Job, { foreignKey: 'company_handle', onDelete: 'CASCADE' });

export default Job;

// CREATE TABLE jobs (
//     id SERIAL PRIMARY KEY,
//     title TEXT NOT NULL,
//     salary INTEGER CHECK (salary >= 0),
//     equity NUMERIC CHECK (equity <= 1.0),
//     company_handle VARCHAR(25) NOT NULL
//       REFERENCES companies ON DELETE CASCADE
//   );
