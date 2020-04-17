const express = require("express");
const posts = require("./data/db");

const server = express();
server.use(express.json());

server.get("/", (req, res) => res.send("API up and running!"));

server.post("/api/posts", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({
      errorMessage: "Please provide title and contents for the post.",
    });
  }

  posts
    .insert(req.body)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({
        error: "There was an error while saving the post to the database",
      });
    });
});

server.post("/api/posts/:id/comments", (req, res) => {
  console.log(req.params);
  const post = posts.findById(req.params.id);
  console.log(post);

  if (!post) {
    return res.status(404).json({
      message: "The post with the specified ID does not exist.",
    });
  }

  if (!req.body.text) {
    return res.status(400).json({
      errorMessage: "Please provide text for the comment.",
    });
  }

  posts
    .insertComment(req.body)
    .then((comment) => {
      console.log(comment);
      return res.status(201).json(comment);
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({
        error: "There was an error while saving the comment to the database",
      });
    });
});

server.get("/api/posts", (req, res) => {
  posts.find()
  
  .then((posts)=>{
    res.status(200).json(posts);

  })
  .catch((error)=>{
      console.log(error)
      return res.status(500).json({
        error: "The posts information could not be retrieved."

      })

  });

});

server.listen(8000, () => console.log("API running on port 8000"));
