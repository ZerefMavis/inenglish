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
