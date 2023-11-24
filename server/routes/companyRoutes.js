import express from 'express';
import * as Company from '../controller/company.js';

const router = express.Router();

router.get('/', Company.getAll);

router.get('/:id', Company.getOne);

router.post('/', Company.createNew);

router.patch('/:id', Company.update);

router.delete('/:id', Company.deleteOne);

export default router;
