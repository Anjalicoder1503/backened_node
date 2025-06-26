const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json());

let fruits = [];

app.get('/getSQRT', (req, res) => {
    const num = req.query.number;
    if (!num) return res.status(400).send('Number is required');
    res.send({ sqrt: Math.sqrt(num) });
});

app.get('/time', (req, res) => {
    res.send({ time: new Date().toLocaleTimeString() });
});

app.post('/addFruitsName', (req, res) => {
    const fruitName = req.body.fruitName;
    if (!fruitName) return res.status(400).send('Fruit name is required');
    fruits.push(fruitName);
    res.send(fruits);
});

app.get('/add', (req, res) => {
    const num1 = parseInt(req.query.num1);
    const num2 = parseInt(req.query.num2);
    if (isNaN(num1) || isNaN(num2)) return res.status(400).send('Both numbers are required');
    res.send({ sum: num1 + num2 });
});

app.post('/addnotes', (req, res) => {
    const note = req.body.note;
    if (!note) return res.status(400).send('Note is required');
    fs.appendFile('notes.txt', note + '\n', (err) => {
        if (err) return res.status(500).send('Failed to add note');
        res.send({ message: 'Note added successfully' });
    });
});

const port = 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));