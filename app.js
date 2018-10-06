const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const expressSession = require('express-session');

const flash = require('connect-flash');
const passportSetup = require('./config/passport-setup');

//routes
const authRoutes = require('./routes/auth-routes');
const tourRoutes = require('./routes/tour-routes');
const profileRoutes = require('./routes/profile-routes')
const indexRoutes = require('./routes/index-routes')


//uuid
const uuid = require('uuid/v4')
const fileStore = require('session-file-store')(expressSession)
//mongodDB database
const mongoose = require('mongoose');

//ask me for connect to keys <rpwrepenwork>
const keys = require('./config/keys');



//const cookieSession = require('cookie-session');

const passport = require('passport');

//Database Connection
mongoose.connect(keys.mongodb.dbURI,function(err){
    if(err){
        console.log(err);
    }
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

//set static public 
app.use(express.static(path.join(__dirname, '/public')));

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

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// 1 date
const expiryDate = new Date(Date.now() + 24* 60 * 60 * 1000 );
//create cookie
app.use(expressSession({
    genid:function(req){
        console.log('Inside the session middleware');
        console.log(req.sessionID);
        return uuid();
    },
    //store: new fileStore(),
    //must use key.js in config not in github ask me if you wish
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie:{
        expires: expiryDate
    }
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use((req,res,next)=>{
    res.status(200).json({
        messages: 'server is now running'
    });
});

//set up routes
app.use('/',indexRoutes);
app.use('/auth',authRoutes);
app.use('/profile',profileRoutes);
app.use('/tour',tourRoutes);

module.exports = app;