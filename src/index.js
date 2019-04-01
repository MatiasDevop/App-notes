const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('views engine', '.hbs');

//Middlewares
app.use(express.urlencoded({ extended: false })); // to recieve email and data
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));
//gloval variables

// routes

//static files

//Server is listenning
app.listen(app.get('port'), ()=>{
    console.log('server on port:', app.get('port'));
})