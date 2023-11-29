import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { NotFoundError } from './helpers/expressError.js';
import homeRouter from './routes/homeRoutes.js';
import userRouter from './routes/userRoutes.js';
import companyRouter from './routes/companyRoutes.js';
import jobRouter from './routes/jobRoutes.js';
import applicationRouter from './routes/applicationRoutes.js';
import authenticateRoutes from './routes/authenticateRoutes.js';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import path from 'path';

const dirname = path.dirname;
const __dirname = dirname(fileURLToPath(import.meta.url));
const buildPath = path.join(__dirname, '../client/build');
const app = express();

app.use(express.static(buildPath));
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api', homeRouter);
app.use('/api/users', userRouter);
app.use('/api/companies', companyRouter);
app.use('/api/jobs', jobRouter);
app.use('/api/applications', applicationRouter);
app.use('/api/auth', authenticateRoutes);
app.use(morgan('tiny'));

/** Handle 404 errors -- this matches everything */

app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== 'test') console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

export default app;
