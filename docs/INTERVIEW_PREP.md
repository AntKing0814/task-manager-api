# Interview Prep for Project 1

## 30-second pitch
"I built a Task Manager REST API in Node and Express with full CRUD, input validation, and a small frontend. I wrote automated tests with Jest and Supertest, and set up GitHub Actions so the tests run on every pull request. I'm coming from a cybersecurity background, so I focused on validation, safe error handling and using CI as a gate before merging. I built it to learn software development fundamentals as I move into a developer role."

Being upfront about your background is a strength. It explains why you built it and shows self-direction.

## Likely questions and honest answers
**Walk me through the project.** Request comes in, `express.json()` parses it, the route validates, calls the store, and returns JSON with the right status code. Tests hit those routes; CI runs them.

**Why separate store, validation and routes?** So each piece has one job, tests are simple, and the in-memory store can be swapped for a database.

**What's the difference between PUT and POST?** POST creates a new resource; PUT updates an existing one. (Strictly, PUT replaces the whole resource and PATCH is partial; mine updates only the fields provided, which is PATCH-like. Say this, it shows you understand.)

**What happens if a test fails in a PR?** The GitHub check fails, and with branch protection the PR can't be merged until it's fixed.

**What would you improve?** Add a real database, authentication, deployment, more edge-case tests, and `npm audit` / Dependabot.

**What was the hardest part?** Pick something true from your own setup: getting the first CI run green, understanding async tests, or Git branching. Real struggles are more convincing than a polished answer.

**Did you use AI to help?** Be honest. Something like: "Yes, I used Claude to scaffold it and explain the pieces, then ran it, broke tests on purpose, and changed it myself so I understand how it works." Most employers now expect AI use; they care that you understand the result.

**What does "unit test" mean, and is yours one?** Unit tests check one function in isolation. Mine mostly test whole endpoints, so they're integration-style, plus a couple of unit tests for `validateTask`.

## Before any interview, be able to do these live
1. Run `npm test` and explain the output.
2. Add a field (like `priority`) and a test for it.
3. Show a failing and a passing PR check on GitHub.
4. Explain what each file does in one sentence.

## Resume wording (accurate)
**Software Developer, Personal Project: Task Manager REST API**
- Built a REST API with Node.js and Express supporting full CRUD, filtering and server-side input validation
- Wrote automated tests with Jest and Supertest and configured a GitHub Actions workflow that runs them on every pull request across Node 18 and 20
- Developed a lightweight JavaScript frontend consuming the API, with XSS-safe rendering
- Applied security fundamentals from a cybersecurity background: input validation, safe error handling, CI as a merge gate

Avoid "zero deployment regressions" (nothing is deployed) and "open source contributor" unless you've contributed to someone else's repo.
