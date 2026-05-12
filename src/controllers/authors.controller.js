const service = require("../services/authors.service");

const getAllAuthors = async (req, res) => {
  try {
    const data = await service.getAll();
    res.json(data);
  } catch {
    res.status(500).json({ error: "Error obteniendo autores" });
  }
};

const getAuthorById = async (req, res) => {
  try {
    const data = await service.getAuthorById(req.params.id);

    if (!data) {
      return res.status(404).json({ error: "Autor no encontrado" });
    }

    res.json(data);
  } catch {
    res.status(500).json({ error: "Error obteniendo autor" });
  }
};

const createAuthor = async (req, res) => {
  try {
    const { name, email, bio } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Nombre y email obligatorios" });
    }

    const data = await service.create(name, email, bio);
    res.status(201).json(data);
  } catch {
    res.status(500).json({ error: "Error creando autor" });
  }
};

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
};
