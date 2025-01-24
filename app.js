if(process.env.NODE_ENV !== "production"){
	require("dotenv").config();
}

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const ExpressError = require('./utils/ExpressError');

const session  = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require("passport");
const LocalStrategy = require('passport-local');
const User = require('./models/user');

const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const CSPConfig = require('./utils/helmetConfig');

const calendarRoutes = require('./routes/calendars');
const recipeRoutes = require('./routes/recipes');
const userRoutes = require('./routes/users');
const adminRoutes = require('./routes/admins');

const dbURL = process.env.DB_URL || "mongodb://127.0.0.1:27017/akbrauer";
mongoose.connect(dbURL);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("Database connected");
});

const app = express();

//Config
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(mongoSanitize());
app.use(helmet());
app.use(helmet.contentSecurityPolicy(CSPConfig));

const secret = process.env.SECRET || 'defaultbackupbadsecret';

const store = MongoStore.create({
	mongoUrl: dbURL,
	touchAfter: 24 * 60 * 60,
	crypto: {
		secret
	}
});

store.on("error", function(e){
	console.log("SESSION STORE ERROR", e)
});

const sessionConfig = {
	store,
	name: 'session',
	secret,
	resave: false,
	saveUninitialized: true,
	cookie: {
		httpOnly: true,
		// secure: true,
		expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
		maxAge: 1000 * 60 * 60 * 24 * 7,
	}
}
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	res.locals.success = req.flash("success");
	res.locals.error = req.flash('error');
	next();
});

//Routes

app.use('/', userRoutes);
app.use('/admin', adminRoutes);
app.use('/calendar', calendarRoutes);
app.use('/recipes', recipeRoutes);

app.get("/", (req, res) => {
	res.render("home");
});

app.all('*', (req, res, next) => {
	next(new ExpressError('Page Not Found', 404));
})

app.use((err, req, res, next) => {
	const { statusCode = 500 } = err;
	if(!err.message) err.message = "Something went wrong";
	res.status(statusCode).render('error', { err });
})

app.listen(3000, () => {
	
	console.log("App listening on port 3000");
});
