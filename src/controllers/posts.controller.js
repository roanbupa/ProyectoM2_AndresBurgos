const service = require("../services/posts.service");

// GET all
const getAllPosts = async (req, res) => {
  try {
    const data = await service.getAll();
    res.json(data);
  } catch {
    res.status(500).json({ error: "Error obteniendo posts" });
  }
};

// GET by ID
const getPostById = async (req, res) => {
  try {
    const data = await service.getById(req.params.id);

    if (!data) {
      return res.status(404).json({ error: "Post no encontrado" });
    }

    res.json(data);
  } catch {
    res.status(500).json({ error: "Error obteniendo post" });
  }
};

// GET by author
const getPostsByAuthor = async (req, res) => {
  try {
    const data = await service.getByAuthor(req.params.authorId);
    res.json(data);
  } catch {
    res.status(500).json({ error: "Error obteniendo posts del autor" });
  }
};

// CREATE
const createPost = async (req, res) => {
  try {
    const { title, content, author_id, published } = req.body;

    if (!title || !content || !author_id) {
      return res.status(400).json({
        error: "title, content y author_id son obligatorios",
      });
    }

    const data = await service.create(title, content, author_id, published);

    res.status(201).json(data);
  } catch {
    res.status(500).json({ error: "Error creando post" });
  }
};

// UPDATE
const updatePost = async (req, res) => {
  try {
    const { title, content, author_id, published } = req.body;

    const data = await service.update(
      req.params.id,
      title,
      content,
      author_id,
      published,
    );

    if (!data) {
      return res.status(404).json({ error: "Post no encontrado" });
    }

    res.json(data);
  } catch {
    res.status(500).json({ error: "Error actualizando post" });
  }
};

// DELETE
const deletePost = async (req, res) => {
  try {
    const deleted = await service.remove(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Post no encontrado" });
    }

    res.json({ message: "Post eliminado correctamente" });
  } catch {
    res.status(500).json({ error: "Error eliminando post" });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  getPostsByAuthor,
  createPost,
  updatePost,
  deletePost,
};
