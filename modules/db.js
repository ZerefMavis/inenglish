let mysql = require('mysql');

//Configuration
let db = {
	host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'dbinenglish' 
};

let mySqlClient;

//Connexion
function openDb() {
	mySqlClient = mysql.createConnection(db);
	mySqlClient.connect((err) => {
		if(err) throw err;
	});
}

//Fermeture de la connexion
function closeDb() {
	mySqlClient.end((err) => {
		if(err) throw err;
	});
}

//Requête select avec ou sans paramètres
exports.sqlSelect = function(statement, key, callback) {
	openDb();
	mySqlClient.query(statement, key, (err, rows) => {
		if(err) {
			mySqlClient.query(statement, (err, rows) => {
				if(err) throw err;
				callback(rows);
			});
		}
		callback(rows);
	});
	closeDb();
}

//Requête insert
exports.sqlInsert = function(statement, key) {
	openDb();
	mySqlClient.query(statement, key, (err) => {
		if(err) throw err;
	})
	closeDb();
}

//Requête insert qui récupère l'id inséré
exports.sqlInsertGetId = function(statement, key, callback) {
	openDb();
	mySqlClient.query(statement, key, (err, result) => {
		if(err) throw err;
		callback(result.insertId);
	});
	closeDb();
}