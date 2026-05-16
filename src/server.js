const express = require("express");
const pool = require("./db/config");

const authorsRouter = require("./routes/authors.routes");
const postsRouter = require("./routes/posts.routes");

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./openapi.yaml");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rutas
app.use("/authors", authorsRouter);
app.use("/posts", postsRouter);

// Ruta principal
app.get("/", (req, res) => {
  res.json({
    message: "MiniBlog API",
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada",
  });
});

// DB
pool
  .connect()
  .then(() => {
    console.log("Conectado a PostgreSQL");
  })
  .catch((err) => {
    console.error("Error de conexión:", err);
  });

// IMPORTANTE
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

module.exports = app;
