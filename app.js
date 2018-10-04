const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const flash = require('connect-flash');

//import auth-routes.js
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const profileRoutes = require('./routes/profile-routes')
const tourRoutes = require('./routes/tour-routes');

const mongoose = require('mongoose');

//ask me for connect to keys <rpwrepenwork>
const keys = require('./config/keys');

const cookieSession = require('cookie-session');
const passport = require('passport');
//Database Connection

mongoose.connect(keys.mongodb.dbURI,() =>{
    console.log('Connected to MongoDB');
});


//Get detail of Server
const properties = require('./properties.json');
//Initialize Appication
const app = express();

//Set Port
const port = properties.server.port;

//Initialize Views
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

// Express Session Middleware
// app.use(session({
//     secret:'keyboard cat',
//     resave: true,
//     saveUninitialized: true
// }));

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function(req, res, next){
    res.locals.messages = require('express-messages')(req, res);
    next();
});

// Express Validator Middleware
app.use(expressValidator({
    errorFormatter: function(param, msg, value){
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;
        
        while(namespace.length){
            formParam += '[' + namespace.shift() + ']';
        }
        return{
            param   :   formParam,
            msg     :   msg,
            value   :   value
        };
    }
}));

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Home page
app.get('/',function(req,req){
    req.render('index',{
        title: properties.server.name,
        user: req.user
    })    
});

//create cookie
app.use(cookieSession({
    //time out of cookie
    maxAge:12*60*60*1000,
    
    //must use key.js in config not in github ask me if you wish
    keys:[keys.session.cookieKey]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());


//Route Files

//set up routes
app.use('/auth',authRoutes);
app.use('/profile',profileRoutes);
app.use('/tour',tourRoutes);


//let tours = require('./routes/tours');
//let users = require('./routes/users');
//app.use('/tours', tours);
//app.use('/users', users);

//Start server open at specify port
const server = app.listen(port,function(){
    console.log(`Express running -> Port ${server.address().port}`);
});
