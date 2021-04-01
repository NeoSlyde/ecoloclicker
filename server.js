var express = require('express');
var mustache = require('mustache-express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("ressources"));
app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', './views');


app.get('/',(req,res) =>{
    res.render('home');
})

app.get('/signup',(req,res) =>{
    res.render('signup');
});

app.post('/signup',(req,res) =>{
    console.log(req.body.name);
    res.redirect('/');
});

app.listen(3000, () => console.log('listening on http://localhost:3000'));
