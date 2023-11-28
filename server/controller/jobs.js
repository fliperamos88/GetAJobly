import Job from '../models/job.js';
import Company from '../models/company.js';
import { Op } from 'sequelize';
import User from '../models/user.js';

export const getAll = async (req, res, next) => {
  try {
    let allJobs;
    if (req.query.term) {
      allJobs = await Job.findAll({
        where: {
          title: {
            [Op.iLike]: `%${req.query.term}%`,
          },
        },
        include: [
          { model: Company, attributes: ['name'] },
          { model: User, as: 'job_candidates' },
        ],
      });
    } else {
      allJobs = await Job.findAll({
        include: [
          { model: Company, attributes: ['name'] },
          {
            model: User,
            as: 'job_candidates',
            attributes: ['username'],
          },
        ],
      });
    }
    res.send({ All_Jobs: allJobs });
  } catch (err) {
    return next(err);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const job = await Job.findByPk(req.params.id, {
      include: { model: Company, attributes: ['name'] },
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
