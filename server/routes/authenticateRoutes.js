import express from 'express';
import authenticateUser from '../controller/authenticate.js';

const router = express.Router();

export default router.post('/:id', authenticateUser);
