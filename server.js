var express = require('express');
var mustache = require('mustache-express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/css'));
app.use(express.static("ressources"));
app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', './views');

var plantes = require('./plantes_sql');


app.get('/',(req,res) =>{
    res.render('home');
})

app.get('/signup',(req,res) =>{
    res.render('signup');
});

app.post('/signup',(req,res) =>{

    if(req.body.name != "" && req.body.password != "" && req.body.passwordvalidation == req.body.password){
        res.redirect('/');
    }
    else{
        res.redirect('/signup');
    }
});

app.get("/shop", (req,res) =>{
    res.render("shop",{plantes_list : plantes.list()});
});

app.get("/test", (req,res) =>{
    res.render("test");
});

app.listen(3000, () => console.log('listening on http://localhost:3000'));
