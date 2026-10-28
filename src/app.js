const express = require("express");
const path = require("path");
const { createStore } = require("./store");
const { validateTask } = require("./validate");

function createApp(store = createStore()) {
  const app = express();
  app.use(express.json());
  app.use(express.static(path.join(__dirname, "..", "public")));

  app.get("/health", (req, res) => res.json({ status: "ok" }));

  // READ all (optional ?completed=true|false filter)
  app.get("/api/tasks", (req, res) => {
    let tasks = store.all();
    if (req.query.completed !== undefined) {
      const want = req.query.completed === "true";
      tasks = tasks.filter((t) => t.completed === want);
    }
    res.json(tasks);
  });

  // READ one
  app.get("/api/tasks/:id", (req, res) => {
    const task = store.get(Number(req.params.id));
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  });

  // CREATE
  app.post("/api/tasks", (req, res) => {
    const error = validateTask(req.body);
    if (error) return res.status(400).json({ error });
    res.status(201).json(store.create(req.body));
  });

  // UPDATE (partial)
  app.put("/api/tasks/:id", (req, res) => {
    const error = validateTask(req.body, { partial: true });
    if (error) return res.status(400).json({ error });
    const { title, description, completed } = req.body;
    const changes = Object.fromEntries(
      Object.entries({ title, description, completed }).filter(([, v]) => v !== undefined)
    );
    const task = store.update(Number(req.params.id), changes);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  });

  // DELETE
  app.delete("/api/tasks/:id", (req, res) => {
    if (!store.remove(Number(req.params.id))) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(204).end();
  });

  // Malformed JSON and other unexpected errors
  app.use((err, req, res, next) => {
    if (err.type === "entity.parse.failed") {
      return res.status(400).json({ error: "Invalid JSON" });
    }
    res.status(500).json({ error: "Internal server error" });
  });

  return app;
}

module.exports = { createApp };
