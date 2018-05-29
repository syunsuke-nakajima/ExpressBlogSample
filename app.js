let express = require('express'),
app = express(),
post = require('./routes/post');
let logger = require('morgan');
let bodyParser = require('body-parser');
let connect = require('connect');
let methodOverride = require('method-override');
let cookieParser = require('cookie-parser');
let expressSession = require('express-session');
let csrf  = require('csurf');
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));

// csrf対策
app.use(cookieParser());
app.use(expressSession({secret: 'secret_key'}));
app.use(csrf());
app.use(function(req, res, next){
  res.locals.csrftoken = req.csrfToken();
  next();
});

app.use(logger('dev'));



// routing
app.get('/', post.index);
app.get('/posts/:id([0-9]+)', post.show);
app.get('/posts/new', post.new);
app.post('/posts/create', post.create);
app.get('/posts/:id/edit', post.edit);
app.put('/posts/:id', post.update);
app.delete('/posts/:id', post.destroy);

// Error
app.use(function(err, req, res, next){
  res.send(err.message);
});

app.listen(3000);
console.log('server starting at http://localhost:3000/');
