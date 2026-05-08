# Task Manager API

A robust backend REST API for managing tasks, projects, organizations, and users. This project provides structural foundations for team collaboration and task organization.

**Note:** This is an ongoing project. Many features are currently in development or planned for future releases.

## 🚀 Current Features

- **Authentication:** Secure user registration and login using JWT (JSON Web Tokens) and refresh tokens. Password encryption is implemented for security.
- **User Management:** Create and manage user profiles.
- **Organization Management:** Group users and projects under specific organizations.
- **Project Management:** Create and manage distinct projects within organizations.
- **Task Management:** Create, update, and track tasks associated with projects and users.

## 🚧 Upcoming Features (Work In Progress)

- Advanced Role-Based Access Control (RBAC) (Admin, Manager, Member).
- Detailed task assignment, statuses, and progress tracking.
- Due dates and reminders.
- Robust input validation and error handling.
- Real-time notifications for task updates.
- API Documentation (Swagger/OpenAPI).

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Architecture:** Controller-Service-Model pattern
- **Authentication:** JWT (JSON Web Tokens)
- **Database:** (Configured via `src/config/db.js` - e.g., MongoDB/Mongoose or PostgreSQL)

## 📁 Project Structure

```text
src/
├── config/        # Database and JWT configurations
├── controllers/   # Request handlers for auth, orgs, projects, tasks, and users
├── middlewares/   # Custom middlewares (e.g., authentication)
├── models/        # Database schemas/models
├── routes/        # API route definitions
├── services/      # Business logic corresponding to controllers
└── utilities/     # Helper functions (e.g., password encryption)
```

## 💻 Getting Started

### Prerequisites

- Node.js installed on your machine.
- Database connection URI (e.g., MongoDB).

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate into the project directory:

   ```bash
   cd "Task Manager"
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables:
   Create a `.env` file in the root directory and add your configurations (e.g., `PORT`, Database URI, `JWT_SECRET`).

5. Start the development server:
   ```bash
   npm start
   # or your specific run command based on package.json, e.g., npm run dev
   ```

## 🤝 Contributing

Since this is an active project, contributions, suggestions, and feature requests are welcome! Feel free to open issues or submit pull requests.
