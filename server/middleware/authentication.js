import { UnauthorizedError } from '../helpers/expressError.js';
import { validateToken } from '../helpers/jwtToken.js';

export const authenticateJWT = (req, res, next) => {
  try {
    const authToken = req.cookies.Jobly[1];
    if (authToken) {
      req.user_data = validateToken(authToken);
    }
    return next();
  } catch (err) {
    return next();
  }
};

export const ensureLoggedIn = (req, res, next) => {
  try {
    if (!req.user_data) {
      throw new UnauthorizedError();
    } else if (req.user_data.username !== req.params.id) {
      throw new UnauthorizedError();
    }
    return next();
  } catch (err) {
    return next(err);
  }
};

const ensureAdmin = (req, res, next) => {
  try {
    if (!res.locals.user || !res.locals.user.is_admin) {
      throw new UnauthorizedError();
    }
    return next();
  } catch (err) {
    return next(err);
  }
};

const ensureCorrectUserOrAdmin = (req, res, next) => {
  try {
    const user = res.locals.user;
    if (!(user && (user.is_admin || user.username === req.params.username))) {
      throw new UnauthorizedError();
    }
    return next();
  } catch (err) {
    return next(err);
  }
};
