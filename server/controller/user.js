import User from '../models/user.js';
import Application from '../models/application.js';
import Job from '../models/job.js';

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
      include: {
        model: Job,
        as: 'job_applications',
        attributes: { exclude: ['equity', 'salary', 'application'] },
      },
    });
    return res.json({ User: user });
  } catch (err) {
    return next(err);
  }
};

export const createNew = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    return res.json({ User_Created: newUser });
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
    return res.json({ msg: 'User deleted' });
  } catch (err) {
    return next(err);
  }
};
