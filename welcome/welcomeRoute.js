const express = require('express');
const posts = require('../data/db');
const router = express.Router();

//router.get("/", (req, res) => res.status(200).send("API up and running!"));

router.get("", (req, res) => res.status(200).send("API up and running!"));



module.exports = router;
