# Jobly - Job Application App 

- Jobly - Job Application App
  - [Description](#description)
  - [Tech Stack](#tech-stack)
  - [Installation](#installation)
 

## Description

Jobly is a web application simulating a real-world job application process. It provides users with a platform to create profiles, search for open positions, upload resumes, and submit applications. Users will appreciate its utilization of [Bcrypt](https://www.npmjs.com/package/bcrypt) for secure password hashing and [JSON Web Tokens](https://jwt.io) for user authentication.
  
## Tech Stack

This application was developed with the support of the following tools:

- Programming languages: [JavaScript](https://www.javascript.com)
- Libraries/Frameworks: [Express](https://expressjs.com), [React](https://react.dev)
- Database storage and management: [PostgreSQL](https://www.postgresql.org)


## Installation

To install all the packages on both the frontend and backend side, run the following command from the server directory:

```shell
$ npm run client
```

To connect to the database, you must create a [Sequelize](https://sequelize.org/docs/v6/getting-started/) instance. This can be done by either passing the connection parameters separately to the Sequelize constructor or by passing a single connection URI to the constructor located in server/config/config.js

Sequelize will automatically create the tables, but there will be no data in it. Considering that you have PostgreSQL installed on your computer, to populate the database, run the following command from the server/database directory:

```shell
$ psql < db_seed.sql
```

After package installation, from the derver directory, run:

```shell
$ npm start
```




