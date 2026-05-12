const express = require("express");
const router = express.Router();
const controller = require("../controllers/posts.controller");

router.get("/", controller.getAllPosts);
router.get("/author/:authorId", controller.getPostsByAuthor);
router.get("/:id", controller.getPostById);
router.post("/", controller.createPost);
router.put("/:id", controller.updatePost);
router.delete("/:id", controller.deletePost);

module.exports = router;
