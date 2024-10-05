<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# REST API

This project is a NestJS-based backend application using PostgreSQL as the database. It is containerized using Docker Compose, allowing for an easy local setup and development environment. Swagger is integrated for API documentation, making it easy to test and explore the endpoints.

## Prerequisites

Make sure you have the following installed:

- **Docker**: [Download & Install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: Included with most Docker installations.

## Setting Up the Application Locally

Follow these steps to run the app locally:

### 1. Clone the Repository

```bash
git clone <https://github.com/mujeebahmad03/rest-api.git>
cd <rest-api>
```

### 2. Create a `.env` File

Create a `.env` file in the root directory of the project. Use the following template and update the values as needed:

```ini
# .env file
POSTGRES_DB=
POSTGRES_USER=
POSTGRES_PASSWORD=
DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5434/${POSTGRES_DB}?schema=public
```

3. **Run docker and prisma servers. Check package.json scripts:**
    ```bash
    docker-compose up --build
    ```

4. **Run the server:**
    ```bash
    # development
    $ npm run start

    # watch mode
    $ npm run start:dev
    ```

### 4. Access the Application and API Documentation

- **Backend API**: The API should be running at [http://localhost:3000](http://localhost:3000).
- **Swagger Documentation**: Access the Swagger UI at [http://localhost:3000/swagger](http://localhost:3000/swagger).

### 5. Running Prisma Migrations (Optional)

If you make changes to your Prisma schema (`prisma/schema.prisma`), you can run the following command to push the changes to the database:

```bash
npx prisma db push
```

## Common Commands

### Stop the Application

To stop all the running container, press `CTRL + C` in the terminal where `docker-compose up` is running, or use:

```bash
docker-compose down
```

### Rebuild the Application

If you make changes to the code or dependencies, you may need to rebuild the containers:

```bash
docker-compose up --build
```

## Troubleshooting

### 1. **Database Connection Error**

If you see an error related to the database connection (`P1001: Can't reach database server at db:5432`), it could be because the PostgreSQL service hasn't fully started. Try the following:

1. Stop the db container:

    ```bash
    docker-compose down
    ```

2. Start db container again:

    ```bash
    docker-compose up --build
    ```

3. Alternatively, wait a few seconds and try the `docker-compose up` command again.

### 2. **Swagger Not Loading**

If you encounter issues accessing Swagger at `http://localhost:3000/swagger`:

- Ensure the application is running without errors.
- Check the NestJS configuration to confirm that Swagger is enabled and set up correctly.
