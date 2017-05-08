let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let sha1 = require('sha1');
let session = require('express-session');

let login = require('./modules/login');

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
	response.render('./admin/indexAdmin');
});

app.post('/admin/login', (request, response) => {
	let username = request.body.username;
	let password = sha1(request.body.password);
	let key = [username, password];
	let type = "admin";

	login.connection(key, db, type, (connection, username) => {
		if(connection) {
			request.session.username = username;
			response.redirect('./admin/accueil');
		} else {
			response.locals.flash = true;
			response.redirect('/admin');
		}
	});
});

//Port
app.listen(5000);