'use strict';

//Modules
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let sha1 = require('sha1');
let session = require('express-session');

//Modules personnelles 
let db = require('./modules/db');
let login = require('./modules/login');
let lesson = require('./modules/lesson');

//Moteur de template
app.set('view engine', 'ejs');

//Middlewares
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
	secret: 'yh1997sao2703',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: false }
}));

//Routes
app.get('/admin', (request, response) => {
	login.isLogged(session, request, db, 1, (log) => {
		if(log) {
			response.redirect('/admin/accueil');
		} else {
			response.render('./admin/indexAdmin');
		}
	})
});

app.post('/admin', (request, response) => {
	login.isLogged(session, request, db, 1, (log) => {
		if(!log) {
			let username = request.body.username;
			let password = sha1(request.body.password);
			let key = [username, password];
			let type = "admin";

			login.connection(key, db, type, (connection, username) => {
				if(connection) {
					request.session.username = username;
					response.redirect('/admin/accueil');
				} else {
					response.render('./admin/indexAdmin', { error: true });
				}
			});
		} else {
			response.redirect('/admin/accueil');
		}
	});
});

app.get('/admin/accueil', (request, response) => {
	login.isLogged(session, request, db, 1, (log) => {
		if(log) {
			response.render('./admin/accueilAdmin');
		} else {
			response.redirect('/admin');
		}
	});
});

app.get('/logoutAdmin', (request, response) => {
	login.isLogged(session, request, db, 1, (log) => {
		if(log) {
			login.disconnect(request, session);
		}
		response.redirect('/admin');
	});
});

app.get('/admin/lesson', (request, response) => {
	login.isLogged(session, request, db, 1, (log) => {
		if(log) {
			response.render('./admin/lessonAdmin');
		} else {
			response.redirect('/admin');
		}
	});
});

app.post('/admin/lesson', (request, response) => {
	login.isLogged(session, request, db, 1, (log) => {
		if(log) {
			lesson.addLesson(request.body, db); 
			response.redirect('/admin/accueil');
		} else {
			response.redirect('/admin');
		}
	});
});

//Port
app.listen(5000);