const express = require("express");

const authorsRouter = require("./routes/authors");
const postsRouter = require("./routes/posts");

const app = express();
const PORT = 3000;

// Middleware para leer JSON
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

// Manejo de rutas inexistentes
app.use((req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada",
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
