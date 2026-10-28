const request = require("supertest");
const { createApp } = require("../src/app");
const { createStore } = require("../src/store");
const { validateTask } = require("../src/validate");

let app;
beforeEach(() => {
  app = createApp(createStore()); // fresh store per test = isolated tests
});

describe("GET /health", () => {
  it("returns ok", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });
});

describe("POST /api/tasks", () => {
  it("creates a task", async () => {
    const res = await request(app).post("/api/tasks").send({ title: "Write tests" });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ id: 1, title: "Write tests", completed: false });
  });

  it("rejects a missing title", async () => {
    const res = await request(app).post("/api/tasks").send({});
    expect(res.status).toBe(400);
  });

  it("rejects a title over 100 characters", async () => {
    const res = await request(app).post("/api/tasks").send({ title: "x".repeat(101) });
    expect(res.status).toBe(400);
  });

  it("rejects malformed JSON", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .set("Content-Type", "application/json")
      .send("{bad json");
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Invalid JSON");
  });
});

describe("GET /api/tasks", () => {
  it("lists tasks and filters by completed", async () => {
    await request(app).post("/api/tasks").send({ title: "A" });
    await request(app).post("/api/tasks").send({ title: "B" });
    await request(app).put("/api/tasks/2").send({ completed: true });

    const all = await request(app).get("/api/tasks");
    expect(all.body).toHaveLength(2);

    const done = await request(app).get("/api/tasks?completed=true");
    expect(done.body).toHaveLength(1);
    expect(done.body[0].title).toBe("B");
  });

  it("gets one task, and 404s for a missing one", async () => {
    await request(app).post("/api/tasks").send({ title: "A" });
    expect((await request(app).get("/api/tasks/1")).status).toBe(200);
    expect((await request(app).get("/api/tasks/99")).status).toBe(404);
  });
});

describe("PUT /api/tasks/:id", () => {
  it("updates only the provided fields", async () => {
    await request(app).post("/api/tasks").send({ title: "Old", description: "keep me" });
    const res = await request(app).put("/api/tasks/1").send({ title: "New" });
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ title: "New", description: "keep me" });
  });

  it("rejects invalid data and 404s for a missing task", async () => {
    await request(app).post("/api/tasks").send({ title: "A" });
    expect((await request(app).put("/api/tasks/1").send({ completed: "yes" })).status).toBe(400);
    expect((await request(app).put("/api/tasks/99").send({ title: "x" })).status).toBe(404);
  });
});

describe("DELETE /api/tasks/:id", () => {
  it("deletes a task, then 404s on repeat", async () => {
    await request(app).post("/api/tasks").send({ title: "A" });
    expect((await request(app).delete("/api/tasks/1")).status).toBe(204);
    expect((await request(app).delete("/api/tasks/1")).status).toBe(404);
  });
});

describe("validateTask", () => {
  it("accepts valid input and rejects non-objects", () => {
    expect(validateTask({ title: "ok" })).toBeNull();
    expect(validateTask(null)).not.toBeNull();
  });
  it("rejects bad description type", () => {
    expect(validateTask({ title: "ok", description: 5 })).not.toBeNull();
  });
});
