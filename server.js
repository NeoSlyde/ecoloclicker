var express = require('express');
var mustache = require('mustache-express');

var app = express();

app.use(express.static("ressources"));
app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', './views');


app.get('/',(req,res) =>{
    res.render('home');
})

app.listen(3000, () => console.log('listening on http://localhost:3000'));
