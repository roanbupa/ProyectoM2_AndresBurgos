const service = require("../services/authors.service");
const { isNotEmpty, isValidEmail } = require("../utils/validators");

const getAllAuthors = async (req, res) => {
  try {
    const data = await service.getAll();
    res.json(data);
  } catch (error) {
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
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo autor" });
  }
};

const createAuthor = async (req, res) => {
  try {
    const { name, email, bio } = req.body;

    if (!isNotEmpty(name) || !isNotEmpty(email)) {
      return res.status(400).json({ error: "Nombre y email obligatorios" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        error: "Email inválido",
      });
    }

    const data = await service.create(name, email, bio);
    res.status(201).json(data);
  } catch (error) {
    if (error.message === "EMAIL_EXISTS") {
      return res.status(400).json({
        error: "El email ya está registrado",
      });
    }

    res.status(500).json({ error: "Error creando autor" });
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const deleted = await service.remove(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        error: "Autor no encontrado",
      });
    }

    res.json({
      message: "Autor eliminado correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error eliminando autor" });
  }
};

const updateAuthor = async (req, res) => {
  try {
    const { name, email, bio } = req.body;

    // Validar email si viene
    if (email && !isValidEmail(email)) {
      return res.status(400).json({
        error: "Email inválido",
      });
    }

    // Validar strings vacíos
    if (name !== undefined && !isNotEmpty(name)) {
      return res.status(400).json({
        error: "Nombre inválido",
      });
    }

    const data = await service.update(req.params.id, name, email, bio);

    if (!data) {
      return res.status(404).json({
        error: "Autor no encontrado",
      });
    }

    res.json(data);
  } catch (error) {
    if (error.message === "EMAIL_EXISTS") {
      return res.status(400).json({
        error: "El email ya está registrado",
      });
    }

    res.status(500).json({ error: "Error actualizando autor" });
  }
};

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  deleteAuthor,
  updateAuthor,
};
