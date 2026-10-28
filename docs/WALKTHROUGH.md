# Code Walkthrough (plain English)

## The big picture
A browser (or any client) sends HTTP requests to the server. The server validates the request, reads or changes the list of tasks, and sends back JSON. Tests automatically send fake requests and check the answers. GitHub Actions runs those tests whenever someone opens a pull request.

## Key terms
- **REST API**: a server that exposes resources (tasks) at URLs and uses HTTP methods: GET reads, POST creates, PUT updates, DELETE removes.
- **CRUD**: Create, Read, Update, Delete.
- **Express**: a Node.js library that makes it easy to define routes.
- **Middleware**: code that runs on each request before your route (`express.json()` turns the request body into an object).
- **Status codes**: 200 OK, 201 Created, 204 No Content, 400 Bad Request (client sent bad data), 404 Not Found, 500 server error.
- **Unit/integration test**: code that checks other code. Mine send real HTTP-style requests to the app (Supertest), so they are closer to integration tests.
- **CI (Continuous Integration)**: automatically building and testing on every change.
- **Pull request (PR)**: a request to merge a branch into `main`, where reviews and checks happen.

## File by file
**src/store.js**: holds the tasks in an array and has functions to add, find, update and delete. It's separate from the routes on purpose, so a real database could replace it without touching the API.

**src/validate.js**: checks incoming data (title is a non-empty string up to 100 chars, `completed` is a boolean). Returns an error message or null. Rejecting bad input early is basic security hygiene.

**src/app.js**: defines the routes. `createApp(store)` builds the app and takes the store as a parameter (called dependency injection), which lets tests use a fresh store each time. The last block handles errors like malformed JSON.

**src/server.js**: just starts the server on port 3000. It's separate from `app.js` so tests can import the app without opening a port.

**tests/tasks.test.js**: each `it(...)` is one test. `beforeEach` creates a clean app so tests don't affect each other. Tests cover happy paths (create, list, filter, update, delete) and failures (missing title, too-long title, bad JSON, 404s).

**public/index.html**: the frontend. It uses `fetch` to call the API. It sets text with `textContent` rather than `innerHTML`, which prevents cross-site scripting (XSS) if someone enters `<script>` as a task title.

**.github/workflows/ci.yml**: tells GitHub: on every PR to `main` (and on pushes to `main`), check out the code, install Node 18 and 20, run `npm ci`, then `npm test`. If any test fails, the check fails.

## Your cybersecurity angle (use this!)
- Input validation on the server (never trust the client)
- XSS prevention in the frontend
- Safe error messages that don't leak internals (the 500 handler)
- CI as a security control: nothing merges unless checks pass
- Honest next steps: authentication, rate limiting, dependency scanning (`npm audit`, Dependabot)
