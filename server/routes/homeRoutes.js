import express from 'express';

const router = express.Router();

export default router.get('/', (req, res, next) => {
  res.send('This is the home router');
});
