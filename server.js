
//just core need to add more next day
const express = require('express');

const app = express();

app.get('/api/customers', (req, res) => {
    const customers = [
        { id: 1, firstName: 'Jon', lastName: 'Doe' },
        { id: 2, firstName: 'Porn', lastName: 'DoeAS' },
        { id: 3, firstName: 'Piyawa', lastName: 'Dosse' },
    ];
    res.status(200).json(customers);
})

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`))