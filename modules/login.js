exports.connection = function(key, db, type, callback) {
	let statement = "SELECT USERNAME, LVL FROM user WHERE USERNAME = ? AND PASS = ?";
	let connection = false;
	let username = undefined;

	db.sqlSelect(statement, key, (rows) => {
		if(rows.length !== 0) {
			if((rows[0].LVL === 1 && type === "admin") || (rows[0].LVL === 0 && type === "user")) {
				connection = true;
				username = rows[0].USERNAME;
			} 
		}
		callback(connection, username); 
	});
}

exports.isLogged = function(session, request, db, lvlType, callback) {
	let username = request.session.username;
	let log = false;

	if(username !== undefined) {
		let statement = "SELECT LVL FROM user WHERE USERNAME = ?";
		db.sqlSelect(statement, username, (rows) => {
			if(rows.length !== 0) {
				if(rows[0].LVL === lvlType) {
					log = true;
				}
			} 
			callback(log);
		});
	} else {
		callback(log);
	}
}

exports.disconnect = function(request, session) {
	request.session.destroy((err) => {
 		if(err) throw err;
	});
}