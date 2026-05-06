const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

let users = [];

app.post('/users', (req, res) => {
	const user = req.body;
	users.push(user);
	res.json({ message: "User added", users });
});

app.get('/users', (req, res) => {
	res.json(users);
});

app.listen(7000, () => {
	console.log("Backend running on port 7000");
});
