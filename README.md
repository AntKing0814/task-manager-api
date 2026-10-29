# Task Manager API

A REST API for managing tasks (create, read, update, delete), with a small web frontend and automated testing through GitHub Actions.

**Tech:** Node.js, Express, Jest, Supertest, GitHub Actions, HTML/JavaScript

## Features
- CRUD endpoints for tasks, with filtering (`GET /api/tasks?completed=true`)
- Input validation with clear 400 errors; 404 for missing tasks
- 10+ automated tests covering success and failure cases
- CI pipeline: tests run automatically on every pull request and push to `main` (Node 18 and 20)
- Simple frontend to add, complete and delete tasks

## Run it
```bash
npm install
npm start          # http://localhost:3000
npm test           # runs the test suite with coverage
```

## API
| Method | Path | Description |
|---|---|---|
| GET | /health | Health check |
| GET | /api/tasks | List tasks (optional `?completed=true/false`) |
| GET | /api/tasks/:id | Get one task |
| POST | /api/tasks | Create (`{"title": "...", "description": "..."}`) |
| PUT | /api/tasks/:id | Update any of title, description, completed |
| DELETE | /api/tasks/:id | Delete a task |

## Project layout
```
src/app.js        routes and error handling
src/store.js      in-memory data layer (swappable for a database)
src/validate.js   input validation
src/server.js     starts the server
tests/            Jest + Supertest tests
public/           frontend
.github/workflows/ci.yml   CI pipeline
```

## Known limitations / next steps
- Data is stored in memory and resets on restart; next step is SQLite or PostgreSQL
- No authentication yet
- Not deployed; a next step is deploying to Render or similar
