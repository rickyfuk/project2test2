// Main server
// Get the dependencies
const express = require('express');

// Sets up the Express App and PORT for Frontend
const app = express();
const PORT = process.env.PORT || 8080;

// Requiring our models for syncing
const db = require('./models');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static('public'));

// Set Handlebars.
var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Set the route

const authRoute = require('../dnd-buddy-2.0/user');
app.use('/', authRoute);

// done route part 1 (might need to move to user.js)

// const htmlRoute = require('../dnd-buddy-2.0/controllers/htmlRoute');
// // const apiRoute = require('../dnd-buddy-2.0/controllers/apiRoute');

// // app.use('/api', apiRoute);
// app.use('/main', htmlRoute);

// app.get('/', function (req, res) {
// 	res.render('index');
// });

// end of route part 1

// sync the sequelize model
db.sequelize.sync({ force: true }).then(function () {
	app.listen(PORT, function () {
		console.log('App listening on PORT ' + PORT);
	});
});
