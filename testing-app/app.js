const express = require('express');
const app = express();

const morgan = require('morgan');
//use morgan to tracking request
app.use(morgan('dev'));
app.set('json spaces', 40);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});
app.use('/', require('./routes'));

app.listen(5000, () => console.log("runing at 5000"));