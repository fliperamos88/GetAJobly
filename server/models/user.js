import { DataTypes, Sequelize, Model } from 'sequelize';
import { sequelize, BCRYPT_WORK_FACTOR } from '../config/config.js';
import bcrypt from 'bcrypt';

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
      defaultValue: false,
    },
  },
  {
    timestamps: false,
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, BCRYPT_WORK_FACTOR);
        }
      },
    },
  }
);
User.prototype.authenticate = async (pwd, userpassword) => {
  return await bcrypt.compare(pwd, userpassword);
};

export default User;
