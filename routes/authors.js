const express = require("express");

const router = express.Router();

// Datos en memoria
let authors = [
  {
    id: 1,
    name: "Ana García",
    email: "ana@example.com",
    bio: "Desarrolladora full-stack apasionada por Node.js",
  },
  {
    id: 2,
    name: "Carlos Ruiz",
    email: "carlos@example.com",
    bio: "Escritor técnico especializado en bases de datos",
  },
];

// GET - Obtener todos los autores
router.get("/", (req, res) => {
  res.json(authors);
});

// GET - Obtener autor por ID
router.get("/:id", (req, res) => {
  const author = authors.find((a) => a.id === parseInt(req.params.id));

  if (!author) {
    return res.status(404).json({
      error: "Autor no encontrado",
    });
  }

  res.json(author);
});

// POST - Crear autor
router.post("/", (req, res) => {
  const { name, email, bio } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      error: "Nombre y email son obligatorios",
    });
  }

  const newAuthor = {
    id: authors.length + 1,
    name,
    email,
    bio: bio || "",
  };

  authors.push(newAuthor);

  res.status(201).json(newAuthor);
});

// PUT - Actualizar autor
router.put("/:id", (req, res) => {
  const author = authors.find((a) => a.id === parseInt(req.params.id));

  if (!author) {
    return res.status(404).json({
      error: "Autor no encontrado",
    });
  }

  const { name, email, bio } = req.body;

  if (name) author.name = name;
  if (email) author.email = email;
  if (bio !== undefined) author.bio = bio;

  res.json(author);
});

// DELETE - Eliminar autor
router.delete("/:id", (req, res) => {
  const index = authors.findIndex((a) => a.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({
      error: "Autor no encontrado",
    });
  }

  authors.splice(index, 1);

  res.json({
    message: "Autor eliminado correctamente",
  });
});

module.exports = router;
