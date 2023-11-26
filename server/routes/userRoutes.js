import express from 'express';
import * as User from '../controller/user.js';
import {
  authenticateJWT,
  ensureLoggedIn,
} from '../middleware/authentication.js';

const router = express.Router();

router.get('/', User.getAll);

router.get('/:id', authenticateJWT, ensureLoggedIn, User.getOne);

router.patch('/:id', authenticateJWT, ensureLoggedIn, User.update);

router.delete('/:id', authenticateJWT, ensureLoggedIn, User.deleteOne);

export default router;
