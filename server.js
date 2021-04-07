var express = require('express');
var mustache = require('mustache-express');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/css'));
app.use(express.static("ressources"));
app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', './views');

var plantes = require('./plantes_sql');
var model_user = require('./model_user');

const cookieSession = require('cookie-session');
app.use(cookieSession({
    name: 'session',
    secret: 'mot-de-passe-du-cookie',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

//============================RENDER=============================//
app.get('/', middleware, (req,res) =>{
    res.render('index');
})

app.get('/signup',(req,res) =>{
    res.render('signup');
});

app.get("/shop", is_authenticated, (req,res) =>{
    res.render("shop",{plantes_list : plantes.list()});
});

//=========================SESSION===========================//

function is_authenticated(req, res, next) {
  if (req.session.user !== undefined) {
    res.locals.name = req.session.user.name;
    res.locals.authenticated = true;
    return next();
  }
  res.locals.authenticated = false;
  res.status(401).send('Authentication required');
}


function middleware(req, res, next) {
  if (req.session.user !== undefined) {
    res.locals.name = req.session.user.name;
    res.locals.authenticated = true;
    return next();
  } else {
    res.locals.authenticated = false;
    return next();
  }
}


app.post('/signup',(req,res) =>{
    if(req.body.password != req.body.password2){
      res.locals.wrong = true;
      res.render('signup')
    }
    var hashedPassword = crypt_password(req.body.password);
    console.log(hashedPassword);
    const user = model_user.new_user(req.body.name, hashedPassword);
    console.log(user);
    req.session.user = user;
    res.locals.name = req.body.name;
    res.redirect('/')
});

function crypt_password(password) {
    var saved_hash = bcrypt.hashSync(password, 10);
    return saved_hash;
}

app.post('/login', (req, res) => {
    const user = model_user.login(req.body.name, req.body.password);
    console.log(user);
    if (user != -1 && user != -2) {
      req.session.user = user;
      res.locals.name = req.body.name;
      res.redirect('/');
    } else if (user == -1) {
      res.locals.failed_name = true;
      res.render('index');
    } else if (user == -2) {
      res.locals.failed_pass = true;
      res.render('index');
    } else {
      res.redirect('/');
    }
  });


app.get('/logout', (req, res) => {
    req.session = null;
    res.locals.name = null;
    res.redirect('/');
});

//========================================================//

app.listen(3000, () => console.log('listening on http://localhost:3000'));
