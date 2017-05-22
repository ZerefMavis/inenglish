exports.addLesson = function(body, db) {
	if(body.num !== "" && body.title != "" && body.rule1 !== "") {
		if(isNaN(body.num) === false) {
			/** Ajout de la leçon **/
			let statementLesson = "INSERT INTO Lesson SET ?";
			let keyLesson = {
				NUM : body.num,
				TITLE : body.title
			};

			db.sqlInsertGetId(statementLesson, keyLesson, (id) => {
				/** Ajout des règles **/
				let statementRule = "INSERT INTO Rule SET ?";
				let keyRule;

				for(var i=0 in body) {
				  if(body[i] !==  body.num && body[i] !== body.title) {
				  	keyRule = { LABEL : body[i], IK_LESSON : id };
				  	db.sqlInsert(statementRule, keyRule);
				  }
				}
				/** Fin de l'ajout **/
			});
			/** Fin de l'ajout **/

			return true;
		}
	} 

	return false;
}