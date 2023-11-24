import { SECRET_KEY } from '../config/config.js';
import jwt from 'jsonwebtoken';
const { sign, verify } = jwt;

/** return signed JWT from user data. */

export const createToken = (user) => {
  console.assert(
    user.is_admin !== undefined,
    'createToken passed user without isAdmin property'
  );

  let payload = {
    username: user.username,
    is_admin: user.is_admin,
  };

  return sign(payload, SECRET_KEY);
};

export const validateToken = (token) => {
  return verify(token, SECRET_KEY);
};
