const express = require('express');
const posts = require('./data/db')

const server = express()
server.use(express.json())

server.get('/', (req, res) => res.send('API up and running!'));

server.post("/api/posts", (req, res) => {
	if (!req.body) {
		return res.status(400).json({
			message: "Missing title or contents",
		})
	}

	posts.insert(req.body)
		.then( post => {
			res.status(201).json(post)
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error adding the post",
			})
		})
})






server.listen(8000, () => console.log('API running on port 8000'));