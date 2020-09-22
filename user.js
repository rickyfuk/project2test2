// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config();
//   };

//   const express = require('express');
//   const app = express();
//   const bcrypt = require('bcrypt');
//   const passport = require('passport');
//   const flash = require('express-flash');
//   const session = require('express-session');

//   const initializePassport = require('./passport-config');
//   initializePassport(
//     passport,
//     email => users.find(user => user.email === email),
//     id => users.find(user => user.id === id)
//   );

//   const users = []

//   app.set('view-engine', 'ejs');
//   app.use(express.urlencoded({ extended: false }));
//   app.use(flash());
//   app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false
//   }));
//   app.use(passport.initialize());
//   app.use(passport.session());

//   app.get('/', checkAuthenticated, (req, res) => {
//     res.render('index.ejs', { name: req.user.name } )
//   });

//   app.get('/login', checkNotAuthenticated, (req, res) => {
//     res.render('login.ejs');
//   });

//   app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: true
//   }));

//   app.get('/register', checkNotAuthenticated, (req, res) => {
//     res.render('register.ejs')
//   });

//   app.post('/register', async (req, res) => {
//     try {
//       const hashedPassword = await bcrypt.hash(req.body.password, 10);
//       users.push({
//         id: Date.now().toString(),
//         name: req.body.name,
//         email: req.body.email,
//         password: hashedPassword
//       });
//       res.redirect('/login');
//     } catch {
//       res.redirect('/register');
//     };
//     console.log(users)
//   });

//   app.delete('/logout', (req, res) => {
//     req.logOut();
//     res.redirect('/login');
//   });

// *** try route instead of app
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');

const initializePassport = require('../dnd-buddy-2.0/config/passport');
initializePassport(
	passport,
	(email) => users.find((user) => user.email === email),
	(id) => users.find((user) => user.id === id)
);

const users = [];

router.set('view-engine', 'ejs');
router.use(express.urlencoded({ extended: false }));
router.use(flash());
router.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
	})
);
router.use(passport.initialize());
router.use(passport.session());

router.get('/', checkAuthenticated, (req, res) => {
	res.render('index.ejs', { name: req.user.name });
});

router.get('/login', checkNotAuthenticated, (req, res) => {
	res.render('login.ejs');
});

router.post(
	'/login',
	checkNotAuthenticated,
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true,
	})
);

router.get('/register', checkNotAuthenticated, (req, res) => {
	res.render('register.ejs');
});

router.post('/register', async (req, res) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		users.push({
			id: Date.now().toString(),
			name: req.body.name,
			email: req.body.email,
			password: hashedPassword,
		});
		res.redirect('/login');
	} catch {
		res.redirect('/register');
	}
	console.log(users);
});

router.delete('/logout', (req, res) => {
	req.logOut();
	res.redirect('/login');
});

//***  try route instead of app

function checkAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return res.redirect('/');
	}
	next();
}

module.exports = router;
// app.listen(3000);
