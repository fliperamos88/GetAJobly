import Company from '../models/company.js';
import Job from '../models/job.js';
import { Op } from 'sequelize';

export const getAll = async (req, res, next) => {
  try {
    let allCompanies;
    if (req.query.term) {
      allCompanies = await Company.findAll({
        where: {
          name: {
            [Op.iLike]: `%${req.query.term}%`,
          },
        },
        include: {
          model: Job,
          include: {
            model: Company,
            attributes: ['name'],
          },
        },
      });
    } else {
      allCompanies = await Company.findAll({
        include: {
          model: Job,
          include: {
            model: Company,
            attributes: ['name'],
          },
        },
      });
    }

    res.json({ Companies: allCompanies });
  } catch (err) {
    return next(err);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const company = await Company.findByPk(req.params.id, {
      include: {
        model: Job,
        include: {
          model: Company,
          attributes: ['name'],
        },
      },
    });
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
