# Task Manager API

A multi-tenant task management API built with NestJS, TypeScript, PostgreSQL, Prisma ORM, and JWT authentication.

## Overview

This project provides a backend API for managing users, organizations, projects, and tasks in a multi-tenant setup.

It includes:

- JWT-based authentication with access and refresh tokens
- Multi-tenant organization and project management
- Task assignment and membership management
- PostgreSQL persistence through Prisma
- Docker support for running the full stack on any machine

## Tech Stack

- NestJS
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT authentication
- Docker and Docker Compose

## Project Structure

- `src/auth` - login, refresh, logout, and JWT strategy
- `src/users` - user CRUD endpoints
- `src/organizations` - organization management
- `src/projects` - project CRUD, membership, and project tasks
- `src/tasks` - task CRUD and assignee management
- `src/prisma` - Prisma service and module wiring
- `src/common` - shared guards, decorators, DTOs, and types
- `prisma/schema.prisma` - database schema
- `docker.compose.yaml` - Docker Compose setup for the API and PostgreSQL
- `Dockerfile` - container build for the API

## Features

- User registration and profile management
- Login with access and refresh token generation
- Refresh token rotation and logout
- Organization creation and management
- Project creation, updates, and member assignment
- Task creation, updates, and employee assignment
- UUID-based resource identifiers
- PostgreSQL relational data model with Prisma migrations

## Prerequisites

- Node.js 22 or newer for local development
- Docker and Docker Compose for container-based runs
- PostgreSQL if you want to run the API without Docker

## Environment Variables

Create or update `.env` in the project root.

For Docker-based local runs, the current values are:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5434/task_manager?schema=public"
JWT_ACCESS_SECRETE="dev-access-secret"
JWT_REFRESH_SECRETE="dev-refresh-secret"
JWT_ACCESS_EXPIRES="15m"
JWT_REFRESH_EXPIRES="7d"
PORT=3000
```

For non-Docker local runs, change `DATABASE_URL` to match your own PostgreSQL installation.

## Local Development

Install dependencies:

```bash
npm install
```

Generate the Prisma client and apply migrations:

```bash
npm run prisma:migrate -- --name init
```

Start the API in watch mode:

```bash
npm run start:dev
```

### Local Development Notes

- You need a running PostgreSQL database before starting the app.
- The app expects `DATABASE_URL` plus JWT secrets to be present in `.env`.
- Prisma client generation is handled automatically during install and build.

## Docker Guide

Use Docker if you want the project to run the same way on any machine.

### What Docker Starts

- `app` container: builds and runs the NestJS API
- `postgres` container: runs PostgreSQL with a persistent volume

### Docker Requirements

- Docker installed on the target machine
- Docker Compose available
- The project repository cloned locally

### Run Docker

Build and start everything:

```bash
docker compose -f docker.compose.yaml up --build
```

Stop the containers:

```bash
docker compose -f docker.compose.yaml down
```

### Docker Behavior

- The app container installs dependencies inside the image.
- You do not need `node_modules` on the host machine when using Docker.
- Prisma migrations run automatically before the production server starts.
- PostgreSQL data is stored in a Docker volume, so it survives container restarts.

### Port Mapping

- API: `http://localhost:3000`
- PostgreSQL from the host machine: `localhost:5434`

### Docker Notes

- Inside Docker, the API connects to PostgreSQL using the service name `postgres`.
- On the host machine, the database is exposed on port `5434`.
- If you want to reset the database, remove the Docker volume in addition to stopping the containers.

## Available Scripts

```bash
npm run build             # Generate Prisma Client and compile NestJS
npm run start              # Start the app in normal mode
npm run start:dev          # Start the app with watch mode
npm run start:prod         # Run the compiled app from dist
npm run lint               # Run ESLint checks
npm test                   # Run unit tests
npm run test:watch         # Run tests in watch mode
npm run test:cov          # Run tests with coverage
npm run prisma:generate    # Generate Prisma Client
npm run prisma:migrate     # Create and apply a development migration
npm run prisma:deploy      # Apply existing migrations in production
npm run prisma:studio      # Open Prisma Studio
```

## Database Model

The Prisma schema uses PostgreSQL UUID identifiers and relational links between entities.

- Users belong to an organization optionally.
- Organizations have one owner, users, root admins, projects, and tasks.
- Projects belong to organizations and can have multiple members and tasks.
- Tasks belong to both a project and an organization.
- Refresh tokens are stored in the database with an expiry timestamp.

## API Endpoints

### Auth

| Method | Endpoint        | Description                                   |
| ------ | --------------- | --------------------------------------------- |
| POST   | `/auth/login`   | Login and receive access and refresh tokens   |
| POST   | `/auth/refresh` | Refresh an access token using a refresh token |
| POST   | `/auth/logout`  | Revoke a refresh token                        |

### Users

| Method | Endpoint     | Description        |
| ------ | ------------ | ------------------ |
| POST   | `/users`     | Create a user      |
| GET    | `/users`     | List users         |
| GET    | `/users/:id` | Get a user by UUID |
| PATCH  | `/users/:id` | Update a user      |
| DELETE | `/users/:id` | Delete a user      |

### Organizations

| Method | Endpoint             | Description                                   |
| ------ | -------------------- | --------------------------------------------- |
| POST   | `/org/createOrg`     | Create an organization                        |
| GET    | `/org/getOrg/:id`    | Get an organization by UUID                   |
| PUT    | `/org/updateOrg/:id` | Update an organization using the legacy route |
| PATCH  | `/org/:id`           | Update an organization                        |
| DELETE | `/org/deleteOrg/:id` | Delete an organization using the legacy route |

### Projects

| Method | Endpoint               | Description                  |
| ------ | ---------------------- | ---------------------------- |
| POST   | `/project`             | Create a project             |
| GET    | `/project`             | List projects                |
| GET    | `/project/:id`         | Get a project by UUID        |
| PATCH  | `/project/:id`         | Update a project             |
| DELETE | `/project/:id`         | Delete a project             |
| POST   | `/project/:id/assign`  | Assign a project member role |
| GET    | `/project/:id/members` | List project members         |
| GET    | `/project/:id/tasks`   | List tasks for a project     |

### Tasks

| Method | Endpoint              | Description                       |
| ------ | --------------------- | --------------------------------- |
| POST   | `/task`               | Create a task                     |
| GET    | `/task`               | List tasks                        |
| GET    | `/task/:id`           | Get a task by UUID                |
| PATCH  | `/task/:id`           | Update a task                     |
| DELETE | `/task/:id`           | Delete a task                     |
| POST   | `/task/:id/assign`    | Assign an employee to a task      |
| GET    | `/task/:id/employees` | List employees assigned to a task |

### API Notes

- All resource IDs are UUIDs.
- Collection endpoints support simple filters through query parameters exposed by the controllers.
- Access protected endpoints with `Authorization: Bearer <token>`.
- Shared authentication helpers live in `src/common`.

## Docker and Local Workflow

If you are using Docker, start with:

```bash
docker compose -f docker.compose.yaml up --build
```

If you are developing locally without Docker, make sure PostgreSQL is running and update `.env` accordingly before running migrations.

## Troubleshooting

- If Docker build fails on dependency installation, rebuild with `docker compose -f docker.compose.yaml build --no-cache`.
- If the API cannot connect to PostgreSQL, verify `DATABASE_URL` and the running database container.
- If Prisma changes are not reflected, run `npm run prisma:generate` or rebuild the Docker image.

## License

ISC
