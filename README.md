# Jobify

Jobify is a MERN-stack job portal application built with a Node.js + Express + MongoDB backend and a React.js + TypeScript + Vite frontend. It implements JWT-based authentication and provides RESTful APIs for job and user management.


## Table of contents

- [Features](#features)
- [Technology stack](#technology-stack)
- [Project layout](#project-layout)
- [Usage](#usage)


## Features

- User registration & login with JWT
- Protected API endpoints for creating, updating, deleting, and toggling job status
- Users can manage their own posted jobs
- React frontend with Redux Toolkit and async thunks
- Simple backend structure (controllers, routes, models, middleware)

## Technology stack

- `Backend`: Node.js, Express, MongoDB (Mongoose), JSON Web Tokens (JWT)
- `Frontend`: React, TypeScript, Vite, Redux Toolkit, axios
- `UI`: Tailwind CSS

## Project layout

- `backend/` — Express server, controllers, routes, Mongoose models
  - `server.js` — main server entry
  - `config/` — DB connection & seeders
  - `controllers/` — auth, job controllers (login, register, logout, jobs CRUD)
  - `routes/` — route definitions (auth, jobs)
  - `middleware/` — auth middleware for JWT verification
  - `models/` — Mongoose schemas for `User` and `Job`

- `frontend/` — React application
  - `src/` — App source
  - `src/pages/` — Pages.
  - `src/store/` — Redux Toolkit store and slices
  

## Usage

Follow these steps to run the backend and frontend locally.

1. Start MongoDB server and make sure you have `Node.js` installed.

2. Configure environment variables.
    - For Backend:
    ```cmd
    MONGO_URI=mongodb://localhost:27017/job_portal
    JWT_SECRET=your_jwt_secret_key
    PORT=5000
    FRONTEND_URL=http://localhost:8080
    ADMIN_NAME=Admin_name
    ADMIN_EMAIL=Admin_email@gmail.com
    ADMIN_PASSWORD=Admin_password
    ````

    - For Frontend:
    ```cmd
    VITE_API_BASE=http://localhost:5000/api
    ```

3. Install and run backend:

    ```cmd
    cd backend
    npm install
    npm run dev
    ```

    This typically starts the backend on the port configured in `server.js` / `process.env.PORT` (commonly `5000`).

4. Install and run frontend:

    ```cmd
    cd frontend
    npm install
    npm run dev
    ```

5. Open the frontend URL printed by Vite (e.g., http://localhost:5173) in your browser.

