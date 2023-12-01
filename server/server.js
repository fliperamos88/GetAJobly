import app from './app.js';
import { sequelize } from './config/config.js';

await sequelize.sync({ alter: true });

app.listen(3001, () => {
  console.log('Up an running!');
  console.log;
});
