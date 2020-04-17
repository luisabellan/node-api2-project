"use strict";var express=require("express"),posts=require("./data/db"),server=express();server.use(express.json()),server.get("/",function(t,e){return e.send("API up and running!")}),server.post("/api/posts",function(t,e){if(!t.body.title||!t.body.contents)return e.status(400).json({errorMessage:"Please provide title and contents for the post."});posts.insert(t.body).then(function(t){e.status(201).json(t)}).catch(function(t){return console.log(t),e.status(500).json({error:"There was an error while saving the post to the database"})})}),server.post("/api/posts/:id/comments",function(t,e){console.log(t.params.id);var s=t.params.id;if(t.body.post_id=s,!t.body.text)return e.status(400).json({errorMessage:"Please provide text for the comment."});if(0===posts.findPostComments(t.body.post_id).length)return e.status(404).json({message:"The post with the specified ID does not exist."});try{posts.insertComment(t.body).then(function(t){return e.status(201).json(t)}).catch(function(t){e.status(404).json({message:"The post with the specified ID does not exist."})})}catch(t){return console.log(t),e.status(500).json({error:"There was an error while saving the comment to the database"})}}),server.get("/api/posts",function(t,e){posts.find().then(function(t){e.status(200).json(t)}).catch(function(t){return console.log(t),e.status(500).json({error:"The posts information could not be retrieved."})})}),server.get("/api/posts/:id",function(t,e){posts.findById(t.params.id).then(function(t){return 0===t.length?e.status(404).json({message:"The post with the specified ID does not exist."}):e.status(200).json(t)}).catch(function(t){return console.log(t),e.status(500).json({error:"The post information could not be retrieved."})})}),server.get("/api/posts/:id/comments",function(t,e){posts.findCommentById(t.params.id).then(function(t){return 0===t.length?e.status(404).json({message:"The post with the specified ID does not exist."}):e.status(200).json(t)}).catch(function(t){return console.log(t),e.status(500).json({error:"The comments information could not be retrieved."})})}),server.delete("/api/posts/:id",function(t,e){posts.findById(t.params.id).then(function(t){if(0===t.length)return e.status(404).json({message:"The post with the specified ID does not exist."})}),posts.remove(t.params.id).then(function(t){e.status(204).json()}).catch(function(t){e.status(500).json({error:"The post could not be removed"})})}),server.listen(8e3,function(){return console.log("API running on port 8000")});