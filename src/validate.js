// Returns an error string, or null if the input is valid.
function validateTask(body, { partial = false } = {}) {
  if (!body || typeof body !== "object") return "Request body must be JSON";

  if (!partial || body.title !== undefined) {
    if (typeof body.title !== "string" || body.title.trim() === "") {
      return "title is required and must be a non-empty string";
    }
    if (body.title.length > 100) return "title must be 100 characters or fewer";
  }
  if (body.description !== undefined && typeof body.description !== "string") {
    return "description must be a string";
  }
  if (body.completed !== undefined && typeof body.completed !== "boolean") {
    return "completed must be a boolean";
  }
  return null;
}

module.exports = { validateTask };
