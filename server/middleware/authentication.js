import { UnauthorizedError } from '../helpers/expressError.js';
import { validateToken } from '../helpers/jwtToken.js';

/** Middleware: Authenticate user.
 *
 * If a token was provided, verify it, and, if valid, store the token payload
 * on res.locals (this will include the username and isAdmin field.)
 *
 * It's not an error if no token was provided or if the token is not valid.
 */

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

/** Middleware to use when they must be logged in.
 *
 * If not, raises Unauthorized.
 */

export const ensureLoggedIn = (req, res, next) => {
  try {
    if (!req.user_data) throw new UnauthorizedError();
    return next();
  } catch (err) {
    return next(err);
  }
};

/** Middleware to use when they be logged in as an admin user.
 *
 *  If not, raises Unauthorized.
 */

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

/** Middleware to use when they must provide a valid token & be user matching
 *  username provided as route param.
 *
 *  If not, raises Unauthorized.
 */

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
