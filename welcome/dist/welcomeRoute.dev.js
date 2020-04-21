"use strict";

var express = require('express');

var posts = require('../data/db');

var router = express.Router(); //router.get("/", (req, res) => res.status(200).send("API up and running!"));

router.get("", function (req, res) {
  return res.status(200).send("API up and running!");
});
module.exports = router;