const express = require("express");
const router = express.Router();
const pool = require("../db/config");

// GET - Listado de posts
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM posts ORDER BY id");
    res.json(result.rows);
  } catch (error) {
    console.error("Error obteniendo posts:", error);
    res.status(500).json({
      error: "Error obteniendo posts",
    });
  }
});

// GET - Buscar posts por author (IMPORTANTE: va antes de /:id)
router.get("/author/:authorId", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT posts.*, authors.name AS author_name
       FROM posts
       JOIN authors ON posts.author_id = authors.id
       WHERE author_id = $1
       ORDER BY posts.id`,
      [req.params.authorId],
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error obteniendo posts del autor:", error);

    res.status(500).json({
      error: "Error obteniendo posts del autor",
    });
  }
});

// GET - Buscar post por ID
router.get("/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM posts WHERE id = $1", [
      req.params.id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Post no encontrado",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error obteniendo post:", error);
    res.status(500).json({
      error: "Error obteniendo post",
    });
  }
});

// POST - Agregar post
router.post("/", async (req, res) => {
  const { title, content, author_id, published } = req.body;

  if (!title || !content || !author_id) {
    return res.status(400).json({
      error: "title, content y author_id son obligatorios",
    });
  }

  try {
    const result = await pool.query(
      `INSERT INTO posts (title, content, author_id, published)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [title, content, author_id, published || false],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creando post:", error);

    res.status(500).json({
      error: "Error creando post",
    });
  }
});

// PUT - Modificar post
router.put("/:id", async (req, res) => {
  const { title, content, author_id, published } = req.body;

  try {
    const result = await pool.query(
      `UPDATE posts
       SET
         title = COALESCE($1, title),
         content = COALESCE($2, content),
         author_id = COALESCE($3, author_id),
         published = COALESCE($4, published)
       WHERE id = $5
       RETURNING *`,
      [title, content, author_id, published, req.params.id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Post no encontrado",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error modificando post:", error);

    res.status(500).json({
      error: "Error modificando post",
    });
  }
});

// DELETE - Eliminar post
router.delete("/:id", async (req, res) => {
  try {
    const result = await pool.query("DELETE FROM posts WHERE id = $1", [
      req.params.id,
    ]);

    if (result.rowCount === 0) {
      return res.status(404).json({
        error: "Post no encontrado",
      });
    }

    res.json({
      message: "Post eliminado correctamente",
    });
  } catch (error) {
    console.error("Error eliminando post:", error);

    res.status(500).json({
      error: "Error eliminando post",
    });
  }
});

module.exports = router;
