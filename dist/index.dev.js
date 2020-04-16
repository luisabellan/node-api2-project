"use strict";

var express = require('express');

var posts = require('./data/db');

var server = express();
server.use(express.json());
server.get('/', function (req, res) {
  return res.send('API up and running!');
});
server.post("/api/posts", function (req, res) {
  if (!req.body) {
    return res.status(400).json({
      message: "Missing title or contents"
    });
  }

  posts.insert(req.body).then(function (post) {
    res.status(201).json(post);
  })["catch"](function (error) {
    console.log(error);
    res.status(500).json({
      message: "Error adding the post"
    });
  });
});
server.listen(8000, function () {
  return console.log('API running on port 8000');
});