const request = require("supertest");

const app = require("../server");

describe("Post API", async () => {
  //GET todos los posts
  test("GET posts devulve status 200", async () => {
    const response = await request(app).get("/posts");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  //GET post por id
  test("GET /posts/:id devulve un post", async () => {
    const response = await request(app).get("/posts/2");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("id");
  });

  //GET post inexistente
  test("GET /posts/:id devuelve 404 si no existe", async () => {
    const response = await request(app).get("/posts/99999");

    expect(response.statusCode).toBe(404);
  });

  //GET posts por autor
  test("GET /posts/author/:authorId devuelve posts del autor", async () => {
    const response = await request(app).get("/posts/author/1");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  //POST crear post
  test("POST /posts crea un post", async () => {
    const response = await request(app).post("/posts").send({
      title: "Post de prueba",
      content: "Contenido del post",
      author_id: 1,
      published: true,
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  //POST validación
  test("POST /posts deuvelve 400 sin title", async () => {
    const response = await request(app).post("/posts").send({
      content: "Contenido",
      author_id: 1,
    });

    expect(response.statusCode).toBe(400);
  });

  //PUT modificar post
  test("PUT /posts/:id modifica un post", async () => {
    const response = await request(app).put("/posts/2").send({
      title: "Título actualizado desde test",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe("Título actualizado desde test");
  });

  //DELETE inexistente
  test("DELETE /posts/:id devuelve 404 si no existe", async () => {
    const response = await request(app).delete("/posts/99999");

    expect(response.statusCode).toBe(404);
  });
});
