exports.existLesson = function(num, db, callback) {
	let statement = "SELECT NUM FROM Lesson WHERE NUM = ?";
	let key = [num];
	let bool;

	db.sqlSelect(statement, num, (rows) => {
		if(rows.length > 0) {
			bool = true;
		} else {
			bool = false;
		}

		callback(bool);
	});
}