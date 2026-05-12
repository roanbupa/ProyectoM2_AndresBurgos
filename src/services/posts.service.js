const pool = require("../db/config");

// GET all
const getAll = async () => {
  const result = await pool.query("SELECT * FROM posts ORDER BY id");
  return result.rows;
};

// GET by author
const getByAuthor = async (authorId) => {
  const result = await pool.query(
    `SELECT posts.*, authors.name AS author_name
     FROM posts
     JOIN authors ON posts.author_id = authors.id
     WHERE author_id = $1
     ORDER BY posts.id`,
    [authorId],
  );
  return result.rows;
};

// GET by ID
const getById = async (id) => {
  const result = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
  return result.rows[0];
};

// CREATE
const create = async (title, content, author_id, published) => {
  const authorsExists = await checkAuthorsExists(author_id);

  if (!authorsExists) {
    throw new Error("AUTHOR_NOT_FOUND");
  }

  const result = await pool.query(
    `INSERT INTO posts (title, content, author_id, published)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [title, content, author_id, published || false],
  );

  return result.rows[0];
};

// UPDATE
const update = async (id, title, content, author_id, published) => {
  // Validar si el autor viene
  if (author_id) {
    const authorExists = await checkAuthorsExists(author_id);

    if (!authorExists) {
      throw new Error("AUTHOR_NOT_FOUND");
    }
  }

  const result = await pool.query(
    `UPDATE posts
     SET
       title = COALESCE($1, title),
       content = COALESCE($2, content),
       author_id = COALESCE($3, author_id),
       published = COALESCE($4, published)
     WHERE id = $5
     RETURNING *`,
    [title, content, author_id, published, id],
  );
  return result.rows[0];
};

// DELETE
const remove = async (id) => {
  const result = await pool.query("DELETE FROM posts WHERE id = $1", [id]);
  return result.rowCount;
};

const checkAuthorsExists = async (authorId) => {
  const result = await pool.query("SELECT id FROM authors WHERE id = $1", [
    authorId,
  ]);

  return result.rows.length > 0;
};

module.exports = {
  getAll,
  getByAuthor,
  getById,
  create,
  update,
  remove,
};
