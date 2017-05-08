let express = require('express');
let app = express();

//Moteur de template
app.set('view engine', 'ejs');

//Middlewares
app.use('/assets', express.static('public'));

//Routes
app.get('/admin', (request, response) => {
	console.log("Bienvenue sur admin");
});

//Port
app.listen(5000);