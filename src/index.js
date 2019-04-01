const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');

//Initializations
const app = express();
require('./database');

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(express.urlencoded({ extended: false })); // to recieve email and data
app.use(methodOverride('_method')); //this is to hidden input use too
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));
//gloval variables

// routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));
//static files
app.use(express.static(path.join(__dirname, 'public')));
//Server is listenning
app.listen(app.get('port'), ()=>{
    console.log('server on port:', app.get('port'));
})