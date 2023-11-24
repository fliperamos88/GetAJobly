import Company from '../models/company.js';
import Job from '../models/job.js';

export const getAll = async (req, res, next) => {
  try {
    const allCompanies = await Company.findAll({});
    res.send({ Companies: allCompanies });
  } catch (err) {
    return next(err);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const company = await Company.findByPk(req.params.id, { include: Job });
    return res.json({ Company: company });
  } catch (err) {
    return next(err);
  }
};

export const createNew = async (req, res, next) => {
  try {
    const newCompany = await Company.create(req.body);
    return res.json({ Company_created: newCompany });
  } catch (err) {
    return next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const company = await Company.findByPk(req.params.id);
    await company.update(req.body);
    return res.json({ Comapany: company });
  } catch (err) {
    return next(err);
  }
};

export const deleteOne = async (req, res, next) => {
  try {
    const company = await Company.findByPk(req.params.id);
    await company.destroy();
    return res.json({ msg: 'Company deleted' });
  } catch (err) {
    return next(err);
  }
};
