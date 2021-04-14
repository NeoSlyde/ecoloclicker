var fs = require('fs');
var Sqlite = require('better-sqlite3');

var db = new Sqlite('db.sqlite');




exports.list = function(){
    var plantes_list = db.prepare('SELECT * FROM plantes ORDER BY id').all();
    return plantes_list;
}

exports.read = function(id){
    var read = db.prepare('SELECT * from plantes where id = ?');
    var idPlantes = read.get(id);

    if(idPlantes == undefined) return null;
    return idPlantes;
}

exports.getStock = function(id){
    var getStock = db.prepare("SELECT stock from plantes where id = ?");
    var stock = getStock.get(id);
    return stock;
}

exports.addStock = function(id,stockToAdd){
    var getStock = db.prepare("SELECT stock from plantes where id = ?");
    var stock = getStock.get(id);
    console.log(stock);
    db.prepare("UPDATE plantes SET stock = (?+?) where id = ?").run(stock.stock,stockToAdd,id);

    var getNewStock = db.prepare("SELECT stock from plantes where id = ?");
    var newStock = getNewStock.get(id);
    return newStock;
}

exports.removeStock = function(id,stockToRemove){
    var getStock = db.prepare("SELECT stock from plantes where id = ?");
    var stock = getStock.get(id);
    db.prepare("UPDATE plantes SET stock = (?-?) where id = ?").run(stock.stock,stockToRemove,id);

    var getNewStock = db.prepare("SELECT stock from plantes where id = ?");
    var newStock = getNewStock.get(id);
    return newStock;
}

/*
exports.create = function(description, image, name) {
    var insert = db.prepare('INSERT INTO plantes(description, image, name) VALUES (?, ?, ?)');
    var idPlantes = insert.run(description, image, name);

    return idPlantes.lastInsertRowid;
}

exports.update = function(description, image, name){

    var update = db.prepare('UPDATE plantes SET description = @description, image = @image, name = @name WHERE id = @id')
    var info = update.run({
        
        
    });

    if(info.changes == 1) return true;
    return false;
}

exports.delete = function(id) {
    var deletePlante = db.prepare('DELETE FROM Plantes WHERE id = ?');
    var info = deletePlante.run(id);

    return info.changes == 1 ? true : false;
}

exports.save = function(filename) {
    var plantes_list = db.prepare('SELECT * FROM Plantes ORDER BY id').all();
    var plantes = {};
    for(var plante of plantes_list) {
        plantes[plante.id] = plante;
    }
    fs.writeFileSync(filename, JSON.stringify(plantes));
};
*/
