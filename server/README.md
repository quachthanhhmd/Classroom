# Classroom management using react and typescript.

A project for building a classroom management is used typescript, express, swagger, mysql, sequelize, socket,...

By running a single command, you will get a production-ready Typescript app installed and fully configured on your machine. The app comes with many built-in features, such as authentication using JWT, request validation, unit and integration tests, continuous integration, docker support, API documentation, pagination, etc. For more details, check the features list below.

## Manual Installation

If you would still prefer to do the installation manually, follow these steps:

Clone the repo:

```bash
git clone https://github.com/quachthanhhmd/Classroom.git
```

Install the dependencies:

```bash
npm install
```
Install global packages to use typescript
```bash
npm install -D typescript
npm install -D ts-node
```
Moreover, you can use nodemon to automatically run our project:
```bash
npm install -D nodemon
```

Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```    

## Table of Contents

- [Features](#features)
- [Commands](#commands)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)

## Features
- **Framework**: [Express](https://expressjs.com/)
- **SQL database**: [MySQL](https://www.mysql.com)
- **ORM**: [Sequelize](https://sequelize.org/master)
- **Authentication and authorization**: using [passport](http://www.passportjs.org)
- **Validation**: request data validation using [Joi](https://github.com/hapijs/joi)
- **Password-hashing**: [Bcrypt](https://www.npmjs.com/package/bcrypt)
- **Mail**: [Nodemailer](https://nodemailer.com)
- **Logging**: using [winston](https://github.com/winstonjs/winston) and [morgan](https://github.com/expressjs/morgan)
- **Error handling**: centralized error handling mechanism
- **API documentation**: with [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) and [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express)
- **Dependency management**: with [npm](https://www.npmjs.com/)
- **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv)
- **Security**: set security HTTP headers using [helmet](https://helmetjs.github.io)
- **Santizing**: sanitize request data against xss and query injection
- **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)

## Commands

Running locally:

```bash
npm run dev
```

Running in production:

```bash
npm start
```

Building database:
  - Firstly, you need to create a schema that has a name as you declare in the .env file.
  - Secondly, run in your command:
    ```bash
    npm run db
    ```
    Or you can run:
    ```bash
    ts-node ./src/buildDB
    ```

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
TYPE=development
PORT=5000
DB_DATABASE_HOST=***
DB_USERNAME=***
DB_PASSWORD=***
DB_DATABASE_NAME=***
DB_DATABASE_PORT=***
DB_DIALECT=***
TOKEN_SERCET=***
TOKEN_EXPIRE_DAY=***
TOKEN_EXPIRE_MINUTES=***
EMAIL_USERNAME=***
EMAIL_PASSWORD=***
EMAIL_HOST=***
CLIENT_DOMAIN=***
```

## Project Structure

```
src\
 |--@types\         # Extend new params for library
 |--config\         # Environment variables and configuration related things
 |--constants\      # Constants API error and type
 |--controllers\    # Route controllers (controller layer)
 |--docs\           # Swagger files
 |--interfaces\     # Interface viewmodel
 |--middlewares\    # Custom express middlewares
 |--models\         # Mongoose models (data layer)
 |--routes\         # Routes
 |--interfaces\     # Interfaces
 |--exceptions\     # exceptions config
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and functions
 |--validations\    # Request data validation schemas
 |--app.ts          # Express app
 |--buildDB.ts      # Config to build a mysql DB using sequlize.
 |--server.ts       # App entry point
```
