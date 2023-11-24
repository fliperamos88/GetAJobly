import express from 'express';
import * as Job from '../controller/jobs.js';

const router = express.Router();

router.get('/', Job.getAll);

router.get('/:id', Job.getOne);

router.post('/', Job.createNew);

router.patch('/:id', Job.update);

router.delete('/:id', Job.deleteOne);

export default router;
