"use strict";var express=require("express"),posts=require("./data/db"),server=express();server.use(express.json()),server.get("/",function(e,s){return s.send("API up and running!")}),server.post("/api/posts",function(e,s){if(!e.body.title||!e.body.contents)return s.status(400).json({errorMessage:"Please provide title and contents for the post."});posts.insert(e.body).then(function(e){s.status(201).json(e)}).catch(function(e){return console.log(e),s.status(500).json({error:"There was an error while saving the post to the database"})})}),server.post("/api/posts/:id/comments",function(e,s){console.log(e.params);var t=posts.findById(e.params.id);return console.log(t),t?e.body.text?void posts.insertComment(e.body).then(function(e){return console.log(e),s.status(201).json(e)}).catch(function(e){return console.log(e),s.status(500).json({error:"There was an error while saving the comment to the database"})}):s.status(400).json({errorMessage:"Please provide text for the comment."}):s.status(404).json({message:"The post with the specified ID does not exist."})}),server.listen(8e3,function(){return console.log("API running on port 8000")});