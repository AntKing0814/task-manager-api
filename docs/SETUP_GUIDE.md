# Setup Guide (about 20 minutes)

## 1. Install the tools
- Node.js 20 or newer: https://nodejs.org (pick the LTS version)
- Git: https://git-scm.com
- Check in a terminal: `node --version`, `npm --version`, `git --version`

## 2. Run it locally
1. Unzip this folder and open a terminal inside it.
2. `npm install` (downloads Express, Jest, Supertest into `node_modules/`)
3. `npm test` -> you should see all tests pass with a coverage table.
4. `npm start`, then open http://localhost:3000 and add a few tasks.

If a test fails, don't panic: read the message, it names the test and what it expected. Paste it to Claude and ask.

## 3. Put it on GitHub
1. On github.com click New repository, name it `task-manager-api`, leave it empty (no README), create it.
2. In your project folder:
```bash
git init
git add .
git commit -m "Initial commit: Task Manager API with tests and CI"
git branch -M main
git remote add origin https://github.com/AntKing0814/task-manager-api.git
git push -u origin main
```

## 4. Make the CI real (this is what the resume line is about)
1. Create a branch: `git checkout -b add-priority-field`
2. Make a small change (for example, add a `priority` field in `store.js`) and add a test for it.
3. Commit, then `git push -u origin add-priority-field`.
4. On GitHub, open a Pull Request into `main`.
5. Watch the **Checks** section: GitHub Actions runs your tests. Green check = passed.
6. Deliberately break a test in another branch, open a PR, and watch it fail. Screenshot both. This is your best interview demo.
7. Merge the passing PR.

Optional: Settings -> Branches -> add a rule requiring the CI check to pass before merging. That is what "prevents bad code reaching main" actually means.

## 5. Add to your resume
Link the repo: github.com/AntKing0814/task-manager-api
