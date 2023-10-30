const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

const selectedItems = [];

app.post('/add-item', (req, res) => {
    const { category, item } = req.body;
    const newItem = { category, item };
    selectedItems.push(newItem);
    res.json(newItem);
});
