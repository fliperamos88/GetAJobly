import Job from '../models/job.js';
import Company from '../models/company.js';

export const getAll = async (req, res, next) => {
  try {
    const allJobs = await Job.findAll();
    res.send({ All_Jobs: allJobs });
  } catch (err) {
    return next(err);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const job = await Job.findByPk(req.params.id, {
      include: Company,
    });
    return res.json({ Job: job });
  } catch (err) {
    return next(err);
  }
};

export const createNew = async (req, res, next) => {
  try {
    const newJob = await Job.create(req.body);
    return res.json({ Job_Created: newJob });
  } catch (err) {
    return next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const job = await Job.findByPk(req.params.id);
    await user.update(req.body);
    return res.json({ Job: job });
  } catch (err) {
    return next(err);
  }
};

export const deleteOne = async (req, res, next) => {
  try {
    const job = await Job.findByPk(req.params.id);
    await job.destroy();
    return res.json({ msg: 'Job deleted' });
  } catch (err) {
    return next(err);
  }
};
