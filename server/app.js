import express, { json } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { NotFoundError } from './helpers/expressError.js';
import homeRouter from './routes/homeRoutes.js';
import userRouter from './routes/userRoutes.js';
import companyRouter from './routes/companyRoutes.js';
import jobRouter from './routes/jobRoutes.js';
import applicationRouter from './routes/applicationRoutes.js';
import authenticateRoutes from './routes/authenticateRoutes.js';
// import { authenticateJWT } from './middleware/auth';
// import authRoutes from './routes/auth';
// import companiesRoutes from './routes/companies';
// import usersRoutes from './routes/users';
// import jobsRoutes from './routes/jobs';

// import morgan from 'morgan';

const app = express();

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
// app.use(json());
// app.use(morgan('tiny'));
// app.use(authenticateJWT);

// app.use('/auth', authRoutes);
// app.use('/companies', companiesRoutes);
// app.use('/users', usersRoutes);
// app.use('/jobs', jobsRoutes);

/** Handle 404 errors -- this matches everything */
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
