// In-memory data layer. Kept separate from the routes so it can be swapped
// for a real database (SQLite/Postgres) without touching the API layer.
function createStore() {
  let tasks = [];
  let nextId = 1;

  return {
    all: () => [...tasks],
    get: (id) => tasks.find((t) => t.id === id),
    create: ({ title, description = "" }) => {
      const task = {
        id: nextId++,
        title,
        description,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      tasks.push(task);
      return task;
    },
    update: (id, changes) => {
      const task = tasks.find((t) => t.id === id);
      if (!task) return null;
      Object.assign(task, changes);
      return task;
    },
    remove: (id) => {
      const before = tasks.length;
      tasks = tasks.filter((t) => t.id !== id);
      return tasks.length < before;
    },
    reset: () => {
      tasks = [];
      nextId = 1;
    },
  };
}

module.exports = { createStore };
