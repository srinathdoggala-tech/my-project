const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// app.use('/cards', (req, res, next) => {
//     if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
//         if (!req.is('application/json')) {
//             return res.status(415).json({ error: 'Content-Type application/json is required' });
//         }
//     }
//     next();
// });

const handleGet = (req, res) => {
    res.send({
        url: req.url,
        method: req.method
    })
}
app.get('/', handleGet);

app.post('/submit', (req, res) => {
    res.send('Data submitted!');
});

const handleUpdate = (req, res) => {
    res.send('Data updated');
}

app.patch('/update', handleUpdate);

const handleDelete = (req, res) => {
    res.send('Data Deleted');
}

app.delete('/delete', handleDelete);

const cards = [
    { id: 1, suit: 'Hearts', value: 'Ace' },
    { id: 2, suit: 'Spades', value: 'King' },
    { id: 3, suit: 'Diamonds', value: 'Queen' }
];
let nextId = 4;

app.get('/cards', (req, res) => {
    res.json(cards);
});

app.get('/cards/:id', (req, res) => {
    const id = Number(req.params.id);
    const card = cards.find(c => c.id === id);
    if (!card) return res.status(404).json({ error: 'Card not found' });
    res.json(card);
});

app.post('/cards', (req, res) => {
    const { suit, value } = req.body || {};
    if (!suit || !value) return res.status(400).json({ error: 'suit and value are required' });
    const card = { id: nextId, suit, value };
    nextId++;
    cards.push(card);
    res.status(201).json(card);
});

app.delete('/cards/:id', (req, res) => {
    const id = Number(req.params.id);
    const idx = cards.findIndex(c => c.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Card not found' });
    const [card] = cards.splice(idx, 1);
    res.json({ message: `Card with ID ${id} removed`, card });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});