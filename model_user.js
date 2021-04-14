const Sqlite = require('better-sqlite3');
var bcrypt = require('bcrypt');

let db = new Sqlite('db.sqlite');


exports.login = function(name, password){
    var found = db.prepare('SELECT * FROM users WHERE name = ?').get(name);
    if(found !== undefined) {
        console.log(password, found.password);
      if(bcrypt.compareSync(password, found.password)){
        return found;
      }
      else{
        return -2;
      }
    }
    else{
      return -1;
    }
  };

exports.new_user = function(name, password){
	var found = db.prepare('SELECT * FROM users WHERE name = ?').get(name);
	if(found !== undefined){
		return -1;
	}
    db.prepare("INSERT INTO users (name, password, score) VALUES (?, ?,0)").run(name, password);
    return db.prepare('SELECT * FROM users WHERE name = ?').get(name);
}

exports.get_user = function(name){
  return db.prepare('SELECT * FROM users WHERE name = ?').get(name);
}