const express = require("express");

const router = express.Router();

// Datos en memoria
let posts = [
  {
    id: 1,
    title: "Introducción a Node.js",
    content: "Node.js es un runtime de JavaScript...",
    author_id: 1,
    published: true,
  },
  {
    id: 2,
    title: "PostgreSQL vs MySQL",
    content: "Ambas bases de datos tienen ventajas...",
    author_id: 2,
    published: true,
  },
];

// GET - Obtener todos los posts
router.get("/", (req, res) => {
  res.json(posts);
});

// GET - Obtener post por ID
router.get("/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));

  if (!post) {
    return res.status(404).json({
      error: "Post no encontrado",
    });
  }

  res.json(post);
});

// GET - Obtener posts por autor
router.get("/author/:authorId", (req, res) => {
  const authorPosts = posts.filter(
    (p) => p.author_id === parseInt(req.params.authorId),
  );

  res.json(authorPosts);
});

// POST - Crear post
router.post("/", (req, res) => {
  const { title, content, author_id, published } = req.body;

  if (!title || !content || !author_id) {
    return res.status(400).json({
      error: "title, content y author_id son obligatorios",
    });
  }

  const newPost = {
    id: posts.length + 1,
    title,
    content,
    author_id,
    published: published || false,
  };

  posts.push(newPost);

  res.status(201).json(newPost);
});

// PUT - Actualizar post
router.put("/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));

  if (!post) {
    return res.status(404).json({
      error: "Post no encontrado",
    });
  }

  const { title, content, author_id, published } = req.body;

  if (title) post.title = title;
  if (content) post.content = content;
  if (author_id) post.author_id = author_id;
  if (published !== undefined) post.published = published;

  res.json(post);
});

// DELETE - Eliminar post
router.delete("/:id", (req, res) => {
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({
      error: "Post no encontrado",
    });
  }

  posts.splice(index, 1);

  res.json({
    message: "Post eliminado correctamente",
  });
});

module.exports = router;
