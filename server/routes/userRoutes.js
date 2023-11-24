import express from 'express';
import * as User from '../controller/user.js';

const router = express.Router();

router.get('/', User.getAll);

router.get('/:id', User.getOne);

router.post('/', User.createNew);

router.patch('/:id', User.update);

router.delete('/:id', User.deleteOne);

export default router;
