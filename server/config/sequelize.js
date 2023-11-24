import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('react-jobly', 'f.ramos', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
  // define: {
  //   freezeTableName: true,
  // },
});

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully. YAAAAY!');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

export default sequelize;
