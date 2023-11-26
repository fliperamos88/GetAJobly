import User from '../models/user.js';
import Job from '../models/job.js';
import Company from '../models/company.js';

export const getAll = async (req, res, next) => {
  try {
    const allUsers = await User.findAll({});
    res.send({ All_Users: allUsers });
  } catch (err) {
    return next(err);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
      include: {
        model: Job,
        as: 'job_applications',
        include: { model: Company, attributes: ['name'] },
      },
    });
    console.log(req.user_data);
    return res.json({ User: user });
  } catch (err) {
    return next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.update(req.body);
    return res.json({ User: user });
  } catch (err) {
    return next(err);
  }
};

export const deleteOne = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.clearCookie('token');
    return res.json({ msg: 'User deleted' });
  } catch (err) {
    return next(err);
  }
};
