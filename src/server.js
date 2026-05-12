const express = require("express");
const pool = require("./db/config");

const authorsRouter = require("./routes/authors.routes");
const postsRouter = require("./routes/posts.routes");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

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

// Conexión a DB
pool
  .connect()
  .then(() => {
    console.log("Conectado a PostgreSQL");
  })
  .catch((err) => {
    console.error("Error de conexión:", err);
  });

// Server
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
