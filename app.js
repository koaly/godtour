const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');


//require passport
const passport = require('passport');
const passportSetup = require('./api/config/passport-setup');
// use morgan to tracking request
app.use(morgan('dev'));


//connect to database
mongoose.connect("mongodb://" + process.env.MONGO_MLAB_USER + ":"
    + process.env.MONGO_MLAB_PW +
    "@ds121373.mlab.com:21373/tourworld", { useNewUrlParser: true },
    (err) => {
        if (err) {
            return console.log(err);
        }
        console.log("Connected to MongoDB");
    }
)

mongoose.Promise = global.Promise;


//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//header
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

app.use(passport.initialize());
app.use(passport.session());
//import routes
const tourRoutes = require('./api/routes/tour-route');
const userRoutes = require('./api/routes/user-route');


// express use routes to create path
app.use("/tours", tourRoutes);
app.use("/users", userRoutes);



//if not find path abover handling with 404
app.use((req, res, next) => {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
})


app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    })
})

//export to server.js
module.exports = app;