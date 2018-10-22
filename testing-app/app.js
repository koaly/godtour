const express = require('express');
const app = express();

const morgan = require('morgan');
//use morgan to tracking request
app.use(morgan('dev'));


app.use('/', require('./routes'));

app.listen(5000);