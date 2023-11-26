import { DataTypes, Sequelize, Model } from 'sequelize';
import { sequelize } from '../config/config.js';
import Job from './job.js';
import User from './user.js';

const Application = sequelize.define(
  'application',

  {
    username: {
      type: DataTypes.STRING(25),
      primaryKey: true,
      references: {
        model: User,
        key: 'username',
      },
    },
    job_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Job,
        key: 'id',
      },
    },
  },
  {
    timestamps: false,
  }
);

User.belongsToMany(Job, {
  as: 'job_applications',
  through: Application,
  uniqueKey: true,
  foreignKey: 'username',
  otherKey: 'job_id',
});
Job.belongsToMany(User, {
  as: 'job_candidates',
  through: Application,
  uniqueKey: true,
  foreignKey: 'job_id',
  otherKey: 'username',
});

export default Application;
