var fs = require('fs');
var Sqlite = require('better-sqlite3');

var db = new Sqlite('db.sqlite');


var load = function(filename) {
    var plantes = JSON.parse(fs.readFileSync(filename));

    db.prepare('DROP TABLE IF EXISTS plantes').run();
    db.prepare('DROP TABLE IF EXISTS user').run();

    db.prepare('CREATE TABLE Plantes(id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT, image TEXT, name TEXT, stock INT)').run();
    db.prepare('CREATE TABLE user (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, password TEXT)').run();

    db.prepare("INSERT INTO user (name, password) VALUES ('admin', 'password')").run();
    var insert = db.prepare("INSERT INTO Plantes VALUES (@id, @description, @image, @name, 0)");

    var transaction = db.transaction((plantes) =>{
        for(var id = 0;id < plantes.length; id++) {
            var plante = plantes[id];
            plante.id = id;
            insert.run(plante);
        }
    });
    transaction(plantes);
}

load("./ressources/plantes.json");