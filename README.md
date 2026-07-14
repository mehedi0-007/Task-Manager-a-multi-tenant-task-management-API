# Task Manager API

A multi-tenant REST API built with NestJS, TypeScript, PostgreSQL, Prisma ORM, and JWT authentication.

## What Was Updated

- Added a Docker-based setup for both the API and PostgreSQL.
- Added a multi-stage `Dockerfile` so the app can be built and run without a local Node.js install.
- Updated Prisma to generate the client into `src/generated/prisma` so the app can use the generated code in Docker and locally.
- Added Docker-safe environment defaults for local development.

## Requirements

- Node.js
- PostgreSQL

## Setup

```bash
npm install
npm run prisma:migrate -- --name init
npm run start:dev
```

## Docker Guidelines

Use Docker when you want the same setup on any machine.

### What Docker Runs

- The `app` container builds the NestJS API.
- The `postgres` container runs PostgreSQL.
- Prisma migrations are applied automatically when the app container starts.
- You do not need a local `node_modules` folder on the host machine for Docker-based runs.

### Start the Project

```bash
docker compose -f docker.compose.yaml up --build
```

### Stop the Project

```bash
docker compose -f docker.compose.yaml down
```

### Port Mapping

- API: `http://localhost:3000`
- PostgreSQL from the host machine: `localhost:5434`

### Docker Notes

- The app container connects to PostgreSQL using the internal Docker service name `postgres`.
- The host machine uses the mapped PostgreSQL port `5434` in `.env`.
- Data is stored in a Docker volume, so your database is kept even after the containers stop.

## Local Development

Edit `.env` for local development. Its default values are:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5434/task_manager?schema=public"
JWT_ACCESS_SECRETE="dev-access-secret"
JWT_REFRESH_SECRETE="dev-refresh-secret"
JWT_ACCESS_EXPIRES="15m"
JWT_REFRESH_EXPIRES="7d"
PORT=3000
```

If you are running PostgreSQL outside Docker, change the username, password, host, port, or database name to match your installation. The database itself must exist before running the migration.

## Commands

```bash
npm run build             # Generate Prisma Client and compile NestJS
npm run start:dev         # Development server with watch mode
npm run lint              # Type-aware ESLint checks
npm test                  # Unit tests
npm run prisma:generate   # Regenerate the typed Prisma Client
npm run prisma:migrate    # Create/apply a development migration
npm run prisma:deploy     # Apply existing migrations in production
npm run prisma:studio     # Open Prisma's database browser
```

## Data model

The Prisma schema is at `prisma/schema.prisma`. It uses PostgreSQL UUID primary keys and relational foreign keys.

- Organizations have one owner, users, root administrators, projects, and tasks.
- Project membership is stored in `ProjectMember` with an `admin` or `employee` role.
- Task assignment is stored in `TaskAssignment`.
- Refresh tokens belong to users and expire at a stored timestamp.
- Deleting an organization cascades to its projects, tasks, memberships, and assignments while preserving users with a null organization.
- Deleting a project cascades to its tasks, memberships, and assignments.
- Organization owners must transfer ownership before their user account can be deleted.

## API

| Method           | Endpoint               | Purpose                            |
| ---------------- | ---------------------- | ---------------------------------- |
| POST             | `/users`               | Register a user                    |
| GET/PATCH/DELETE | `/users/:id`           | Read, update, or delete a user     |
| POST             | `/auth/login`          | Get access and refresh tokens      |
| POST             | `/auth/refresh`        | Rotate a refresh token             |
| POST             | `/auth/logout`         | Revoke a refresh token             |
| POST             | `/org/createOrg`       | Create an organization             |
| GET              | `/org/getOrg/:id`      | Read an organization               |
| PUT              | `/org/updateOrg/:id`   | Update an organization             |
| DELETE           | `/org/deleteOrg/:id`   | Delete an organization             |
| POST/GET         | `/project`             | Create or list projects            |
| GET/PATCH/DELETE | `/project/:id`         | Read, update, or delete a project  |
| POST             | `/project/:id/assign`  | Assign a project admin or employee |
| GET              | `/project/:id/members` | List project memberships           |
| GET              | `/project/:id/tasks`   | List project tasks                 |
| POST/GET         | `/task`                | Create or list tasks               |
| GET/PATCH/DELETE | `/task/:id`            | Read, update, or delete a task     |
| POST             | `/task/:id/assign`     | Assign a project member to a task  |
| GET              | `/task/:id/employees`  | Read a task with its assignees     |

All route IDs are UUIDs. Collection endpoints support equality filters for their exposed fields, such as `GET /task?project=<uuid>`.

Access tokens use `Authorization: Bearer <token>`. `JwtAuthGuard` and the `CurrentUser` decorator are available under `src/common` for protecting controllers or individual handlers.
