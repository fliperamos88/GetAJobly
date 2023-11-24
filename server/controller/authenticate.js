import User from '../models/user.js';

const authenticateUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    const response = await user.authenticate(req.body.password, user.password);
    return res.json({ user: user, msg: response });
  } catch (err) {
    return next(err);
  }
};

export default authenticateUser;
