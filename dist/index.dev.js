"use strict";

var express = require("express");

var cors = require("cors");

var router = express.Router();

var postsRoutes = require('./posts/postsRoutes');

var posts = require("./data/db");

var server = express();
server.use(express.json());
server.use(cors());
server.use('/api/posts', postsRoutes);
server.listen(8000, function () {
  return console.log("API running on port 8000");
});