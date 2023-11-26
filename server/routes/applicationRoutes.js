import express from 'express';
import * as Application from '../controller/application.js';

const router = express.Router();

router.get('/', Application.getAll);

router.get('/:id', Application.getOne);

router.post('/', Application.createNew);

router.patch('/:id', Application.update);

router.delete('/', Application.deleteOne);

export default router;
