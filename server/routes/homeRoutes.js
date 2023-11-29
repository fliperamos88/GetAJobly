import express from 'express';

const router = express.Router();

export default router.get('/', (req, res, next) => {
  console.log(req.cookies);

  console.log(req.cookies.testCookie);

  res.send('This is the home router');
});
