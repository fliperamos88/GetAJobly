import User from '../models/user.js';
import { createToken } from '../helpers/jwtToken.js';
import { UnauthorizedError } from '../helpers/expressError.js';

export const login = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.body.username);
    const response = await user.authenticate(req.body.password, user.password);
    if (response) {
      const token = createToken(user);
      res.cookie('Jobly', [user.username, token]);
      res.json({ user: user, token: token });
    } else {
      throw new UnauthorizedError('Wrong username/password');
    }
    return next();
  } catch (err) {
    return next(err);
  }
};

export const register = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    return res.json({
      User_Created: newUser,
    });
  } catch (err) {
    return next(err);
  }
};
