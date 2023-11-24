import Application from '../models/application.js';
import User from '../models/user.js';

export const getAll = async (req, res, next) => {
  try {
    const allApplications = await Application.findAll();
    res.send({ Applications: allApplications });
  } catch (err) {
    return next(err);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const application = await Application.findByPk(req.params.id);
    return res.json({ Appplication: application });
  } catch (err) {
    return next(err);
  }
};

export const createNew = async (req, res, next) => {
  try {
    const newApplication = await Application.create(req.body);
    return res.json({ Application_submitted: newApplication });
  } catch (err) {
    return next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const application = await Application.findByPk(req.params.id);
    await application.update(req.body);
    return res.json({ Application: application });
  } catch (err) {
    return next(err);
  }
};

export const deleteOne = async (req, res, next) => {
  try {
    const application = await Application.findByPk(req.params.id);
    await application.destroy();
    return res.json({ msg: 'Application withdraw' });
  } catch (err) {
    return next(err);
  }
};
