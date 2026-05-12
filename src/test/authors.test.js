const request = require("supertest");

const app = require("../server");

describe("Authors API", () => {
  // GET todos los autores
  test("GET /authors devuelve status 200", async () => {
    const response = await request(app).get("/authors");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // GET author by id
  test("GET /authors/:id devuelve un autor", async () => {
    const response = await request(app).get("/authors/1");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id");
  });

  // GET inexistente
  test("GET /authors/:id devuelve 404 si no existe", async () => {
    const response = await request(app).get("/authors/99999");

    expect(response.statusCode).toBe(404);
  });

  // POST crear autor
  test("POST /authors crea un autor", async () => {
    const response = await request(app)
      .post("/authors")
      .send({
        name: "Autor Test",
        email: `test${Date.now()}@mail.com`,
        bio: "Bio de prueba",
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  // POST validaciones
  test("POST /authors devuelve 400 sin email", async () => {
    const response = await request(app).post("/authors").send({
      name: "Autor sin email",
    });

    expect(response.statusCode).toBe(400);
  });

  // PUT modificar
  test("PUT /authors/:id modifica un autor", async () => {
    const response = await request(app).put("/authors/1").send({
      bio: "Bio actualizada desde test",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.bio).toBe("Bio actualizada desde test");
  });

  // DELETE inexistente
  test("DELETE /authors/:id devuelve 404 si no existe", async () => {
    const response = await request(app).delete("/authors/99999");

    expect(response.statusCode).toBe(404);
  });
});
