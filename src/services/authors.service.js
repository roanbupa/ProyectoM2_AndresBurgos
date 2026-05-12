const pool = require("../db/config");

const getAll = async () => {
  const result = await pool.query("SELECT * FROM authors ORDER BY id");
  return result.rows;
};

const getAuthorById = async (id) => {
  const result = await pool.query("SELECT * FROM authors WHERE id = $1", [id]);
  return result.rows[0];
};

const create = async (name, email, bio) => {
  const result = await pool.query(
    `INSERT INTO authors (name, email, bio)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [name, email, bio],
  );
  return result.rows[0];
};

module.exports = {
  getAll,
  getAuthorById,
  create,
};
