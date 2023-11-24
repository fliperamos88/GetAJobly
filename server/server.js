import app from './app.js';
import sequelize from './config/sequelize.js';
import User from './models/user.js';
import Company from './models/company.js';
import Job from './models/job.js';
import Application from './models/application.js';

// await sequelize.sync();
await sequelize.sync({ alter: true });
// console.log('The table for the Company model was just (re)created!');

app.listen(3001, () => {
  console.log('Up an running!');
});
